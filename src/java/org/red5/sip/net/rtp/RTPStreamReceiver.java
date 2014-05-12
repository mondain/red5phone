package org.red5.sip.net.rtp;

import static org.red5.sip.util.BytesBuffer.READY;

import java.io.IOException;
import java.net.DatagramSocket;

import local.net.RtpPacket;
import local.net.RtpSocket;

import org.red5.codecs.SIPCodec;
import org.red5.sip.app.IMediaReceiver;
import org.red5.sip.util.BytesBuffer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RTPStreamReceiver extends Thread {

	protected static Logger log = LoggerFactory.getLogger(RTPStreamReceiver.class);
	public static int RTP_HEADER_SIZE = 12;
	public static final int SO_TIMEOUT = 200; // Maximum blocking time, spent
												// waiting for reading new bytes
												// [milliseconds]
	private SIPCodec sipCodec = null; // Sip codec to be used on audio session
	private IMediaReceiver rtmpUser = null;
	private RtpSocket rtp_socket = null;
	private boolean socketIsLocal = false; // Whether the socket has been
											// created here
	private boolean running = false;
	private long timeStamp = 0;
	private int frameCounter = 0;
	private final Object sync = new Object();

	/**
	 * Constructs a RtpStreamReceiver.
	 * 
	 * @param sipCodec
	 *            codec to be used on audio session
	 * @param rtmpUser
	 *            the stream sink
	 * @param local_port
	 *            the local receiver port
	 */

	public RTPStreamReceiver(SIPCodec sipCodec, IMediaReceiver rtmpUser, int local_port) {
		try {
			DatagramSocket socket = new DatagramSocket(local_port);

			socketIsLocal = true;

			init(sipCodec, rtmpUser, socket);
		} catch (Exception e) {
			log.error("Exception", e);
		}
	}

	/**
	 * Constructs a RtpStreamReceiver.
	 * 
	 * @param sipCodec
	 *            codec to be used on audio session
	 * @param rtmpUser
	 *            the stream sink
	 * @param socket
	 *            the local receiver DatagramSocket
	 */

	public RTPStreamReceiver(SIPCodec sipCodec, IMediaReceiver rtmpUser, DatagramSocket socket) {
		init(sipCodec, rtmpUser, socket);
	}

	/** Inits the RtpStreamReceiver */

	private void init(SIPCodec sipCodec, IMediaReceiver rtmpUser, DatagramSocket socket) {
		this.sipCodec = sipCodec;
		this.rtmpUser = rtmpUser;

		if (socket != null) {
			rtp_socket = new RtpSocket(socket);
		}
	}

	/** Whether is running */

	public boolean isRunning() {
		return running;
	}

	/** Stops running */

	public void halt() {
		running = false;
	}

	/** Runs it in a new Thread. */

	public void run() {
		if (rtp_socket == null) {
			log.debug("run:: RTP socket is null.");
			return;
		}

		running = true;

		final int BUFFER_LENGTH = 100;
		final BytesBuffer buffer = new BytesBuffer(sipCodec.getIncomingEncodedFrameSize(), BUFFER_LENGTH);

		Thread sendThread = new Thread(new Runnable() {
			public void run() {
				boolean ready = false;
                float bufferUsage = 0;
				byte[] codedBuffer = null;
				while (running) {
					synchronized (sync) {
                        bufferUsage = buffer.bufferUsage();
						if (!ready) {
							if (bufferUsage > READY) {
								ready = true;
							}
						} else {
							if (bufferUsage == 0) {
                                /* Sending while buffer not empty */
								ready = false;
							}
						}
						if (ready) {
							codedBuffer = new byte[sipCodec.getIncomingEncodedFrameSize()];
							buffer.take(codedBuffer, 0);
						}
					}
					if (ready) {
						timeStamp += sipCodec.getIncomingPacketization();
						try {
							rtmpUser.pushAudio(codedBuffer, timeStamp, 130);
							try {

								long pause = sipCodec.getOutgoingPacketization();
								if (bufferUsage > .5f) {
									pause -= 5;
								}
								if (bufferUsage > READY) {
									pause -= 1;
								}
								log.trace("Sleep pause: " + pause);
								Thread.sleep(pause, 800000);
							} catch (InterruptedException e) {
								log.debug("InterruptedException: ", e);
							}
						} catch (IOException e) {
							log.error("rtmpUser.pushAudio", e);
						}
					}
					Thread.yield();
				}
			}
		}, "RTPStreamReceiver sendThread");

		sendThread.start();

		try {

			rtp_socket.getDatagramSocket().setSoTimeout(SO_TIMEOUT);
			RtpPacket rtpPacket = new RtpPacket(new byte[sipCodec.getIncomingEncodedFrameSize() + RTP_HEADER_SIZE], 0);
			while (running) {

				try {
					rtp_socket.receive(rtpPacket);
					frameCounter++;

					if (running) {

						byte[] packetBuffer = rtpPacket.getPacket();
						int offset = rtpPacket.getHeaderLength();
						int payloadType = rtpPacket.getPayloadType();

						if (payloadType < 20) {
							synchronized (sync) {
								buffer.push(packetBuffer, offset, sipCodec.getIncomingEncodedFrameSize());
							}
						}
					}
				} catch (java.io.InterruptedIOException e) {
				}
			}
		} catch (Exception e) {

			running = false;
			log.error("Exception", e);
		}

		// Close RtpSocket and local DatagramSocket.
		DatagramSocket socket = rtp_socket.getDatagramSocket();
		rtp_socket.close();

		if (socketIsLocal && socket != null) {
			socket.close();
		}

		// Free all.
		rtp_socket = null;

		log.debug("run:: Terminated.");
		log.debug("run:: Frames = {}.", frameCounter);
	}
}
