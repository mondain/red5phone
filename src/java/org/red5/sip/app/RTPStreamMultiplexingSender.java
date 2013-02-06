package org.red5.sip.app;

import local.net.RtpPacket;
import local.net.RtpSocket;
import org.apache.mina.util.ConcurrentHashSet;
import org.red5.codecs.SIPCodec;
import org.red5.codecs.asao.ByteStream;
import org.red5.codecs.asao.Decoder;
import org.red5.codecs.asao.DecoderMap;
import org.red5.logging.Red5LoggerFactory;
import org.slf4j.Logger;

import java.lang.ref.WeakReference;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.*;

public class RTPStreamMultiplexingSender implements IMediaSender, Runnable {
    protected static Logger log = Red5LoggerFactory.getLogger(RTPStreamMultiplexingSender.class, "sip");

    public static int RTP_HEADER_SIZE = 12;

    protected static final int NELLYMOSER_DECODED_PACKET_SIZE = 256;

    protected static final int NELLYMOSER_ENCODED_PACKET_SIZE = 64;

    RtpSocket rtpSocket = null;

    /**
     * Sip codec to be used on audio session
     */
    protected SIPCodec sipCodec = null;

    boolean socketIsLocal = false;

    boolean doSync = true;

    private Decoder decoder;

    private DecoderMap decoderMap;

    private byte[] packetBuffer;

    private RtpPacket rtpPacket;

    private int seqn = 0;

    private long time = 0;
    private long syncSource = 0;

    // Temporary buffer with received PCM audio from FlashPlayer.
    float[] tempBuffer;

    float[] decodedBuffer1;
    float[] decodedBuffer2;

    volatile int multiplexingCount = 0;

    private Thread sendThread = new Thread(this);

    ConcurrentHashSet<WeakReference<RTPStreamForMultiplex>> streamSet = new ConcurrentHashSet<WeakReference<RTPStreamForMultiplex>>();
    //Set<RTPStreamForMultiplex> streamSet = Collections.synchronizedSet(new WeakHashSet<RTPStreamForMultiplex>());

    private static int SEND_BUFFER_MAX = 100;
    private byte[][] sendBuffer = new byte[SEND_BUFFER_MAX][];
    private int[] sendBufferLength = new int[SEND_BUFFER_MAX];
    private int sendBufferPos = 0;

    // Floats remaining on temporary buffer.
    int tempBufferRemaining = 0;

    // Encoding buffer used to encode to final codec format;
    float[] encodingBuffer;

    // Offset of encoding buffer.
    int encodingOffset = 0;

    // Indicates whether the current asao buffer was processed.
    boolean asao_buffer_processed = false;

    // Indicates whether the handling buffers have already
    // been initialized.
    boolean hasInitilializedBuffers = false;

    /**
     * Constructs a RtpStreamSender.
     *
     * @param mediaReceiver the RTMP stream source
     * @param do_sync       whether time synchronization must be performed by the
     *                      RtpStreamSender, or it is performed by the InputStream (e.g.
     *                      the system audio input)
     * @param sipCodec      codec to be used on audio session
     * @param dest_addr     the destination address
     * @param dest_port     the destination port
     */

    public RTPStreamMultiplexingSender(
            IMediaReceiver mediaReceiver,
            boolean do_sync,
            SIPCodec sipCodec,
            String dest_addr,
            int dest_port) {

        init(mediaReceiver, do_sync, sipCodec, null, dest_addr, dest_port);
    }


    /**
     * Constructs a RtpStreamSender.
     *
     * @param IMediaReceiver
     *            the RTMP stream source
     * @param do_sync
     *            whether time synchronization must be performed by the
     *            RtpStreamSender, or it is performed by the InputStream (e.g.
     *            the system audio input)
     * @param sipCodec
     *            codec to be used on audio session
     * @param src_port
     *            the source port
     * @param dest_addr
     *            the destination address
     * @param dest_port
     *            the destination port
     */
    // public RtpStreamSender(IMediaReceiver mediaReceiver, boolean do_sync, int
    // payloadType, long frame_rate, int frame_size, int src_port, String
    // dest_addr, int dest_port)
    // {
    // init( mediaReceiver, do_sync, payloadType, frame_rate, frame_size, null, src_port, dest_addr, dest_port);
    // }

    /**
     * Constructs a RtpStreamSender.
     *
     * @param mediaReceiver the RTMP stream source
     * @param do_sync       whether time synchronization must be performed by the
     *                      RtpStreamSender, or it is performed by the InputStream (e.g.
     *                      the system audio input)
     * @param sipCodec      codec to be used on audio session
     * @param src_socket    the socket used to send the RTP packet
     * @param dest_addr     the destination address
     * @param dest_port     the thestination port
     */
    public RTPStreamMultiplexingSender(
            IMediaReceiver mediaReceiver,
            boolean do_sync,
            SIPCodec sipCodec,
            DatagramSocket src_socket,
            String dest_addr,
            int dest_port) {

        init(mediaReceiver, do_sync, sipCodec, src_socket, dest_addr, dest_port);
    }


    /**
     * Inits the RtpStreamSender
     */
    private void init(
            IMediaReceiver mediaReceiver,
            boolean do_sync,
            SIPCodec sipCodec,
            DatagramSocket src_socket,
            String dest_addr,
            int dest_port) {

        mediaReceiver.setSender(this);
        this.sipCodec = sipCodec;
        this.doSync = do_sync;
        this.sendBufferPos = 0;

        for(int i=0; i<SEND_BUFFER_MAX; i++) {
            sendBuffer[i] = new byte[sipCodec.getOutgoingEncodedFrameSize() + RTP_HEADER_SIZE];
        }

        try {
            if (src_socket == null) {

                src_socket = new DatagramSocket();
                socketIsLocal = true;
            }

            rtpSocket = new RtpSocket(src_socket, InetAddress.getByName(dest_addr), dest_port);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void start() {
        packetBuffer = new byte[sipCodec.getOutgoingEncodedFrameSize() + RTP_HEADER_SIZE];
        rtpPacket = new RtpPacket(packetBuffer, 0);
        rtpPacket.setPayloadType(sipCodec.getCodecId());

        seqn = 0;
        time = 0;
        syncSource = 0;

        println("start()", "using blocks of " + (packetBuffer.length - RTP_HEADER_SIZE) + " bytes.");

        decoder = new Decoder();
        decoderMap = null;

        sendThread.start();
    }

    private void fillDecodedBuffer(byte[] asaoBuffer, float[] tempBuffer) {
        ByteStream audioStream = new ByteStream(asaoBuffer, 1, NELLYMOSER_ENCODED_PACKET_SIZE);
        decoderMap = decoder.decode(decoderMap, audioStream.bytes, 1, tempBuffer, 0);
        //ResampleUtils.normalize(tempBuffer, tempBuffer.length);
    }

    public synchronized IMediaStream createStream(int streamId) {
        RTPStreamForMultiplex stream = new RTPStreamForMultiplex(streamId, syncSource, this);
        streamSet.add(new WeakReference<RTPStreamForMultiplex>(stream));
        return stream;
    }

    public void deleteStream(int streamId) {
        for (Iterator<WeakReference<RTPStreamForMultiplex>> iterator = streamSet.iterator(); iterator.hasNext(); ) {
            WeakReference<RTPStreamForMultiplex> ref = iterator.next();
            if (ref.get() != null && ref.get().getStreamId() == streamId ) {
                iterator.remove();
            }
        }
    }

    private void doRtpDelay() {
        try {
            Thread.sleep( sipCodec.getOutgoingPacketization() - 2);
        }
        catch ( Exception e ) {
        }
    }

    public void run() {
        if (!hasInitilializedBuffers) {
            tempBuffer = new float[NELLYMOSER_DECODED_PACKET_SIZE];
            decodedBuffer1 = new float[NELLYMOSER_DECODED_PACKET_SIZE];
            decodedBuffer2 = new float[NELLYMOSER_DECODED_PACKET_SIZE];
            encodingBuffer = new float[sipCodec.getOutgoingDecodedFrameSize()];
            multiplexingCount = 0;
            hasInitilializedBuffers = true;
        }
        byte[] asaoBuffer = new byte[65];
        while(rtpSocket != null) {
            multiplexingCount = 0;
            for(Iterator<WeakReference<RTPStreamForMultiplex>> i = streamSet.iterator(); i.hasNext();) {
                int len = -1;
                WeakReference<RTPStreamForMultiplex> ref = i.next();
                RTPStreamForMultiplex stream = ref.get();
                if(stream != null) {
                    synchronized (stream) {
                        System.out.println(String.format("Stream id %d, avail %d", stream.getStreamId(), stream.available()));
                        if(stream != null && stream.ready()) {
                            len = stream.read(asaoBuffer, 0);
                        } else {
                            break;
                        }
                    }
                } else {
                    i.remove();
                    break;
                }
                if(len != -1) {
                    fillDecodedBuffer(asaoBuffer, decodedBuffer1);
                    if (multiplexingCount > 0) {
                        ResampleUtils.multiplex(decodedBuffer2, decodedBuffer1);
                    } else {
                        BufferUtils.floatBufferIndexedCopy(decodedBuffer2, 0, decodedBuffer1, 0, decodedBuffer1.length);
                    }
                    multiplexingCount++;
                    //System.out.println("Multiplex stream: " + streamId);
                }
                Thread.yield();
            }
            if(multiplexingCount > 0) {
                //System.out.println("Send: multiplexed: " + multiplexingCount + ", total streams: " + streamSet.size());
                ResampleUtils.normalize(decodedBuffer2, decodedBuffer2.length);
                try {
                    asao_buffer_processed = false;
                    do {
                        int encodedBytes = fillRtpPacketBuffer();
                        if (encodedBytes == 0) {
                            break;
                        }
                        if (encodingOffset == sipCodec.getOutgoingDecodedFrameSize()) {
                            rtpSocketSend(rtpPacket);
                            doRtpDelay();
                            encodingOffset = 0;
                        }
                    }
                    while (!asao_buffer_processed);
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

                BufferUtils.floatBufferIndexedCopy(
                        encodingBuffer,
                        encodingOffset,
                        tempBuffer,
                        tempBuffer.length - tempBufferRemaining,
                        copyingSize);

                encodingOffset = sipCodec.getOutgoingDecodedFrameSize();
                tempBufferRemaining -= copyingSize;
                finalCopySize = sipCodec.getOutgoingDecodedFrameSize();
            } else {
                if (tempBufferRemaining > 0) {
                    BufferUtils.floatBufferIndexedCopy(
                            encodingBuffer,
                            encodingOffset,
                            tempBuffer,
                            tempBuffer.length - tempBufferRemaining,
                            tempBufferRemaining);

                    encodingOffset += tempBufferRemaining;
                    finalCopySize += tempBufferRemaining;
                    tempBufferRemaining = 0;

                }

                // Decode new asao packet.

                asao_buffer_processed = true;
                BufferUtils.floatBufferIndexedCopy(tempBuffer, 0, decodedBuffer2, 0, decodedBuffer2.length);
//                tempBuffer = ResampleUtils.normalize(tempBuffer, 256); 	// normalise volume

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

                BufferUtils.floatBufferIndexedCopy(
                        encodingBuffer,
                        encodingOffset,
                        tempBuffer,
                        0,
                        copyingSize);

                encodingOffset += copyingSize;
                tempBufferRemaining -= copyingSize;
                finalCopySize += copyingSize;
            }

            if (encodingOffset == encodingBuffer.length) {
                int encodedBytes = sipCodec.pcmToCodec(encodingBuffer, codedBuffer);

                if (encodedBytes == sipCodec.getOutgoingEncodedFrameSize()) {

                    BufferUtils.byteBufferIndexedCopy(packetBuffer,
                            RTP_HEADER_SIZE, codedBuffer, 0, codedBuffer.length);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
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

    private long lastMS = System.currentTimeMillis();

    private void rtpSocketSend(RtpPacket rtpPacket) {
        try {
            rtpPacket.setTimestamp(time);
            rtpPacket.setSequenceNumber(seqn++);
            rtpPacket.setPayloadLength(sipCodec.getOutgoingEncodedFrameSize());
            rtpPacket.setPayloadType(sipCodec.getCodecId());
            rtpSocket.send(rtpPacket);
            time += sipCodec.getOutgoingPacketization();
            //System.out.println(String.format("Send RTP: interval %d, ts %d", System.currentTimeMillis() - lastMS, time));
        } catch (Exception e) {
            log.error("Error sending RTP packet", e);
        }
    }

    private static void println(String method, String message) {
        log.debug("RTPStreamSender - " + method + " -> " + message);
        System.out.println("RTPStreamSender - " + method + " -> " + message);
    }
}
