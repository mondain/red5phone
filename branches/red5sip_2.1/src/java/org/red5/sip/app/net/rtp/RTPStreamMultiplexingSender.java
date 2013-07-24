package org.red5.sip.app.net.rtp;

import static org.red5.sip.app.BytesBuffer.READY;

import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.Iterator;

import local.net.RtpPacket;
import local.net.RtpSocket;

import org.apache.mina.util.ConcurrentHashSet;
import org.red5.codecs.SIPCodec;
import org.red5.codecs.asao.ByteStream;
import org.red5.codecs.asao.Decoder;
import org.red5.logging.Red5LoggerFactory;
import org.red5.sip.app.BufferUtils;
import org.red5.sip.app.IMediaReceiver;
import org.red5.sip.app.IMediaSender;
import org.red5.sip.app.IMediaStream;
import org.red5.sip.app.ResampleUtils;
import org.slf4j.Logger;

import com.laszlosystems.libresample4j.Resampler;

public class RTPStreamMultiplexingSender implements IMediaSender, Runnable {
	protected static Logger log = Red5LoggerFactory.getLogger(RTPStreamMultiplexingSender.class, "sip");

	public static int RTP_HEADER_SIZE = 12;

	public static enum SAMPLE_RATE {
		SAMPLING_8000(8000, 8), SAMPLING_16000(16000, 16), SAMPLING_32000(32000, 32), SAMPLING_48000(48000, 48), SAMPLING_11025(
				11025, 11), SAMPLING_22050(22050, 22), SAMPLING_44100(44100, 44);

		public int rate;
		public int shortName;

		SAMPLE_RATE(int rate, int shortName) {
			this.rate = rate;
			this.shortName = shortName;
		}

		public static SAMPLE_RATE findByShortName(int shortName) {
			for (SAMPLE_RATE s : SAMPLE_RATE.values()) {
				if (s.shortName == shortName) {
					return s;
				}
			}
			throw new IllegalArgumentException("Invalid sample rate");
		}
	}

	public static SAMPLE_RATE sampling = SAMPLE_RATE.SAMPLING_22050;

	protected static final int NELLYMOSER_DECODED_PACKET_SIZE = 256;// *
																	// sampling.blocks;
	protected static final int NELLYMOSER_ENCODED_PACKET_SIZE = 64;// *
																	// sampling.blocks;

	private RtpSocket rtpSocket = null;

	/**
	 * Sip codec to be used on audio session
	 */
	protected SIPCodec sipCodec = null;

	private boolean socketIsLocal = false;

	private Decoder decoder;

	private byte[] packetBuffer;

	private RtpPacket rtpPacket;

	private int seqn = 0;

	private long time = 0;

	// Temporary buffer with received PCM audio from FlashPlayer.
	private float[] tempBuffer;
	private float[] multiplexedBuffer;

	private Resampler resampler;
	private double factor = 1;

	private Thread sendThread = new Thread(this, "RTPStreamMultiplexingSender sendThread");

	private ConcurrentHashSet<RTPStreamForMultiplex> streamSet = new ConcurrentHashSet<RTPStreamForMultiplex>();

	// Floats remaining on temporary buffer.
	private int tempBufferRemaining = 0;

	// Encoding buffer used to encode to final codec format;
	private float[] encodingBuffer;

	// Offset of encoding buffer.
	private int encodingOffset = 0;

	// Indicates whether the current asao buffer was processed.
	private boolean asao_buffer_processed = false;

	// Indicates whether the handling buffers have already
	// been initialized.
	private boolean hasInitilializedBuffers = false;

	/**
	 * Constructs a RtpStreamSender.
	 * 
	 * @param mediaReceiver
	 *            the RTMP stream source
	 * @param do_sync
	 *            whether time synchronization must be performed by the RtpStreamSender, or it is performed by the
	 *            InputStream (e.g. the system audio input)
	 * @param sipCodec
	 *            codec to be used on audio session
	 * @param dest_addr
	 *            the destination address
	 * @param dest_port
	 *            the destination port
	 */

	public RTPStreamMultiplexingSender(IMediaReceiver mediaReceiver, SIPCodec sipCodec,
			String dest_addr, int dest_port) {

		init(mediaReceiver, sipCodec, null, dest_addr, dest_port);
	}

	/**
	 * Constructs a RtpStreamSender.
	 * 
	 * @param mediaReceiver
	 *            the RTMP stream source
	 * @param do_sync
	 *            whether time synchronization must be performed by the RtpStreamSender, or it is performed by the
	 *            InputStream (e.g. the system audio input)
	 * @param sipCodec
	 *            codec to be used on audio session
	 * @param src_socket
	 *            the socket used to send the RTP packet
	 * @param dest_addr
	 *            the destination address
	 * @param dest_port
	 *            the thestination port
	 */
	public RTPStreamMultiplexingSender(IMediaReceiver mediaReceiver, SIPCodec sipCodec,
			DatagramSocket src_socket, String dest_addr, int dest_port) {

		init(mediaReceiver, sipCodec, src_socket, dest_addr, dest_port);
	}

	/**
	 * Inits the RtpStreamSender
	 */
	private void init(IMediaReceiver mediaReceiver, SIPCodec sipCodec, DatagramSocket src_socket,
			String dest_addr, int dest_port) {

		mediaReceiver.setAudioSender(this);
		this.sipCodec = sipCodec;

		try {
			if (src_socket == null) {

				src_socket = new DatagramSocket();
				socketIsLocal = true;
			}

			rtpSocket = new RtpSocket(src_socket, InetAddress.getByName(dest_addr), dest_port);
		} catch (Exception e) {
			log.error("Exception", e);
		}
	}

	public void start() {
		packetBuffer = new byte[sipCodec.getOutgoingEncodedFrameSize() + RTP_HEADER_SIZE];
		rtpPacket = new RtpPacket(packetBuffer, 0);
		rtpPacket.setPayloadType(sipCodec.getCodecId());

		seqn = 0;
		time = 0;

		println("start()", "using blocks of " + (packetBuffer.length - RTP_HEADER_SIZE) + " bytes.");

		decoder = new Decoder();

		sendThread.start();
	}

	public IMediaStream createStream(int streamId) {
		RTPStreamForMultiplex stream = new RTPStreamForMultiplex(streamId) {

			@Override
			public void stop() {
				super.stop();
				streamSet.remove(this);
			}
			
		};
		streamSet.add(stream);
		return stream;
	}

	public void deleteStream(int streamId) {
		for (Iterator<RTPStreamForMultiplex> iterator = streamSet.iterator(); iterator.hasNext();) {
			RTPStreamForMultiplex stream = iterator.next();
			if (stream != null && stream.getStreamId() == streamId) {
				iterator.remove();
			}
		}
	}

	private void doRtpDelay(float bufferUsage, long processingTime) {
		try {
			long pause = sipCodec.getOutgoingPacketization();
			if (bufferUsage > .5f) {
				pause -= 5;
			}
			if (bufferUsage > READY) {
				pause -= 1;
			}
			if (processingTime > pause) {
				log.warn("Too high audio data processing time. Something is going wrong...");
			}
			pause -= processingTime;
			if (pause < 0) pause = 0;
			log.trace("Sleep pause: " + pause + " decrementTime: " + processingTime);
			Thread.sleep(pause, 800000);
		} catch (Exception e) {
			log.debug("[doRtpDelay]", e);
		}
	}

	public void run() {
		if (!hasInitilializedBuffers) {
			multiplexedBuffer = new float[NELLYMOSER_DECODED_PACKET_SIZE];
			encodingBuffer = new float[sipCodec.getOutgoingDecodedFrameSize()];

			if (sipCodec.getSampleRate() == sampling.rate) {
				tempBuffer = new float[NELLYMOSER_DECODED_PACKET_SIZE];
				resampler = null;
			} else {
				factor = sipCodec.getSampleRate() / (double) sampling.rate;
				resampler = new Resampler(true, factor, factor);
				tempBuffer = new float[(int) (NELLYMOSER_DECODED_PACKET_SIZE * factor)];
			}
			hasInitilializedBuffers = true;
		}

		float[] decodedBuffer = new float[NELLYMOSER_DECODED_PACKET_SIZE];
		byte[] asaoBuffer = new byte[NELLYMOSER_ENCODED_PACKET_SIZE];

		int disableStream = 0;

		while (rtpSocket != null) {
			long startIterationTime = System.currentTimeMillis();
			float bufferUsage = 0;
			int multiplexingCount = 0;
			try {
				for (Iterator<RTPStreamForMultiplex> i = streamSet.iterator(); i.hasNext();) {
					int len = -1;
					RTPStreamForMultiplex stream = i.next();
					if (stream.ready() && disableStream != stream.getStreamId()) {
						len = stream.read(asaoBuffer, 0);
						bufferUsage = Math.max(bufferUsage, stream.bufferUsage());
						log.trace(String.format("Stream id %d, buffer %f", stream.getStreamId(),
								stream.bufferUsage()));
					} else {
						continue;
					}
					if (len != -1) {
						ByteStream audioStream = new ByteStream(asaoBuffer, 1, NELLYMOSER_ENCODED_PACKET_SIZE);
						stream.decoderMap = decoder.decode(stream.decoderMap, audioStream.bytes, 0, decodedBuffer, 0);
						if (multiplexingCount > 0) {
							ResampleUtils.multiplex(multiplexedBuffer, decodedBuffer);
						} else {
							System.arraycopy(decodedBuffer, 0, multiplexedBuffer, 0, decodedBuffer.length);
						}
						multiplexingCount++;
					}
					Thread.yield();
				}
			} catch (Exception e) {
				log.error("Exception", e);
			}
			if (multiplexingCount > 0) {
				log.trace("Send: multiplexed: " + multiplexingCount + ", total streams: " + streamSet.size());
				ResampleUtils.normalize(multiplexedBuffer, multiplexedBuffer.length);
				try {
					asao_buffer_processed = false;
					do {
						int encodedBytes = fillRtpPacketBuffer();
						if (encodedBytes == 0) {
							break;
						}
						if (encodingOffset == sipCodec.getOutgoingDecodedFrameSize()) {
							rtpSocketSend(rtpPacket);
							doRtpDelay(bufferUsage, System.currentTimeMillis() - startIterationTime);
							startIterationTime = System.currentTimeMillis();
							encodingOffset = 0;
						}
					} while (!asao_buffer_processed);
				} catch (Exception e) {
					log.error("Error preparing RTP packet", e);
				}
			}
		}
	}

	/**
	 * Fill the buffer of RtpPacket with necessary data.
	 */
	private int fillRtpPacketBuffer() {

		int copyingSize = 0;
		int finalCopySize = 0;
		byte[] codedBuffer = new byte[sipCodec.getOutgoingEncodedFrameSize()];

		try {

			if ((tempBufferRemaining + encodingOffset) >= sipCodec.getOutgoingDecodedFrameSize()) {

				copyingSize = encodingBuffer.length - encodingOffset;

				BufferUtils.floatBufferIndexedCopy(encodingBuffer, encodingOffset, tempBuffer, tempBuffer.length
						- tempBufferRemaining, copyingSize);

				encodingOffset = sipCodec.getOutgoingDecodedFrameSize();
				tempBufferRemaining -= copyingSize;
				finalCopySize = sipCodec.getOutgoingDecodedFrameSize();
			} else {
				if (tempBufferRemaining > 0) {
					BufferUtils.floatBufferIndexedCopy(encodingBuffer, encodingOffset, tempBuffer, tempBuffer.length
							- tempBufferRemaining, tempBufferRemaining);

					encodingOffset += tempBufferRemaining;
					finalCopySize += tempBufferRemaining;
					tempBufferRemaining = 0;

				}

				// Process next buffer
				asao_buffer_processed = true;
				if (resampler == null) {
					System.arraycopy(multiplexedBuffer, 0, tempBuffer, 0, tempBuffer.length);
				} else {
					resampler.process(factor, multiplexedBuffer, 0, multiplexedBuffer.length, true, tempBuffer, 0,
							tempBuffer.length);
				}

				// normalise volume
				tempBufferRemaining = tempBuffer.length;

				if (tempBuffer.length <= 0) {

					println("fillRtpPacketBuffer", "Asao decoder Error.");
				}

				// Try to complete the encodingBuffer with necessary data.
				if ((encodingOffset + tempBufferRemaining) > sipCodec.getOutgoingDecodedFrameSize()) {
					copyingSize = encodingBuffer.length - encodingOffset;
				} else {
					copyingSize = tempBufferRemaining;
				}

				BufferUtils.floatBufferIndexedCopy(encodingBuffer, encodingOffset, tempBuffer, 0, copyingSize);

				encodingOffset += copyingSize;
				tempBufferRemaining -= copyingSize;
				finalCopySize += copyingSize;
			}

			if (encodingOffset == encodingBuffer.length) {
				int encodedBytes = sipCodec.pcmToCodec(encodingBuffer, codedBuffer);

				if (encodedBytes == sipCodec.getOutgoingEncodedFrameSize()) {

					BufferUtils
							.byteBufferIndexedCopy(packetBuffer, RTP_HEADER_SIZE, codedBuffer, 0, codedBuffer.length);
				}
			}

		} catch (Exception e) {
			log.error("Exception", e);
		}

		return finalCopySize;
	}

	public void halt() {

		DatagramSocket socket = rtpSocket.getDatagramSocket();

		rtpSocket.close();

		if (socketIsLocal && socket != null) {
			socket.close();
		}

		rtpSocket = null;
		sendThread = null;

		println("halt", "Terminated");
	}

	private void rtpSocketSend(RtpPacket rtpPacket) {
		try {
			rtpPacket.setTimestamp(time);
			rtpPacket.setSequenceNumber(seqn++);
			rtpPacket.setPayloadLength(sipCodec.getOutgoingEncodedFrameSize());
			rtpPacket.setPayloadType(sipCodec.getCodecId());
			rtpSocket.send(rtpPacket);
			time += sipCodec.getOutgoingPacketization();
		} catch (Exception e) {
			log.error("Error sending RTP packet", e);
		}
	}

	private static void println(String method, String message) {
		log.debug("RTPStreamSender - " + method + " -> " + message);
	}
}
