package org.red5.sip.net.rtp;

import java.net.DatagramSocket;
import java.net.InetAddress;

import local.net.RtpPacket;
import local.net.RtpSocket;

import org.apache.commons.lang.NotImplementedException;
import org.red5.codecs.SIPCodec;
import org.red5.codecs.asao.ByteStream;
import org.red5.codecs.asao.Decoder;
import org.red5.codecs.asao.DecoderMap;
import org.red5.logging.Red5LoggerFactory;
import org.red5.sip.IMediaReceiver;
import org.red5.sip.IMediaSender;
import org.red5.sip.util.BufferUtils;
import org.red5.sip.util.ResampleUtils;
import org.slf4j.Logger;

public class RTPStreamMultiplexingSender implements IMediaSender, Runnable {
    protected static Logger log = Red5LoggerFactory.getLogger(RTPStreamMultiplexingSender.class, "sip");

    public static int RTP_HEADER_SIZE = 12;

    protected static final int NELLYMOSER_DECODED_PACKET_SIZE = 256;

    protected static final int NELLYMOSER_ENCODED_PACKET_SIZE = 64;

    RtpSocket rtpSocket = null;

    /** Sip codec to be used on audio session */
    protected SIPCodec sipCodec = null;

    boolean socketIsLocal = false;

    boolean doSync = true;

    private Decoder decoder;

    private DecoderMap decoderMap;

    private byte[] packetBuffer;

    private RtpPacket rtpPacket;

    private int seqn = 0;

    private long time = 0;

    // Temporary buffer with received PCM audio from FlashPlayer.
    float[] tempBuffer;

    int[] multiplexedStreams;
    float[] decodedBuffer1;
    float[] decodedBuffer2;
    long sendInterval = 0;

    volatile int multiplexingCount = 0;

    int streamsCount = 0;

    private Thread sendThread;

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
     * @param mediaReceiver
     *            the RTMP stream source
     * @param do_sync
     *            whether time synchronization must be performed by the
     *            RtpStreamSender, or it is performed by the InputStream (e.g.
     *            the system audio input)
     * @param sipCodec
     *            codec to be used on audio session
     * @param dest_addr
     *            the destination address
     * @param dest_port
     *            the destination port
     */

    public RTPStreamMultiplexingSender(
        IMediaReceiver mediaReceiver,
        boolean do_sync,
        SIPCodec sipCodec,
        String dest_addr,
        int dest_port ) {

        init( mediaReceiver, do_sync, sipCodec, null, dest_addr, dest_port );
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
     * @param mediaReceiver
     *            the RTMP stream source
     * @param do_sync
     *            whether time synchronization must be performed by the
     *            RtpStreamSender, or it is performed by the InputStream (e.g.
     *            the system audio input)
     * @param sipCodec
     *            codec to be used on audio session
     * @param src_socket
     *            the socket used to send the RTP packet
     * @param dest_addr
     *            the destination address
     * @param dest_port
     *            the thestination port
     */
    public RTPStreamMultiplexingSender(
        IMediaReceiver mediaReceiver,
        boolean do_sync,
        SIPCodec sipCodec,
        DatagramSocket src_socket,
        String dest_addr,
        int dest_port ) {

        init( mediaReceiver, do_sync, sipCodec, src_socket, dest_addr, dest_port );
    }


    /** Inits the RtpStreamSender */
    private void init(
        IMediaReceiver mediaReceiver,
        boolean do_sync,
        SIPCodec sipCodec,
        DatagramSocket src_socket,
        String dest_addr,
        int dest_port ) {

        mediaReceiver.setSender(this);
        this.sipCodec = sipCodec;
        this.doSync = do_sync;

        try {
            if ( src_socket == null ) {

                src_socket = new DatagramSocket();
                socketIsLocal = true;
            }

            rtpSocket = new RtpSocket( src_socket, InetAddress.getByName(dest_addr), dest_port );
        }
        catch ( Exception e ) {
            e.printStackTrace();
        }
    }

    public void streamAdded() {
        this.streamsCount++;
    }

    public void streamRemoved() {
        this.streamsCount--;
    }

    public void start() {

        packetBuffer = new byte[ sipCodec.getOutgoingEncodedFrameSize() + RTP_HEADER_SIZE ];
        rtpPacket = new RtpPacket( packetBuffer, 0 );
        rtpPacket.setPayloadType( sipCodec.getCodecId() );

        seqn = 0;
        time = 0;

        println( "start()", "using blocks of " + ( packetBuffer.length - RTP_HEADER_SIZE ) + " bytes." );

        decoder = new Decoder();
        decoderMap = null;

        sendThread = new Thread(this);
        sendInterval = System.currentTimeMillis();
        sendThread.start();
    }
    
    public void queueSipDtmfDigits( String argDigits ) {
    	throw new NotImplementedException();
    }

    private void fillDecodedBuffer(byte[] asaoBuffer, float[] tempBuffer) {
        ByteStream audioStream = new ByteStream( asaoBuffer, 1, NELLYMOSER_ENCODED_PACKET_SIZE );
        decoderMap = decoder.decode( decoderMap, audioStream.bytes, 1, tempBuffer, 0 );
    }

    public void send(int streamId, byte[] asaoBuffer, int offset, int num) {
        boolean bufferAvailable = false;
        do {
            synchronized (this) {
                bufferAvailable = multiplexingCount < streamsCount;
                for(int i=0; i<multiplexingCount; i++) {
                    bufferAvailable = bufferAvailable && streamId != multiplexedStreams[i];
                }
            }
            try {
                if(bufferAvailable) {
                    fillDecodedBuffer(asaoBuffer, decodedBuffer1);
                    synchronized (this) {
                        if(multiplexingCount != 0) {
                            ResampleUtils.multiplex(decodedBuffer2, decodedBuffer1);
                        } else {
                            BufferUtils.floatBufferIndexedCopy(decodedBuffer2, 0, decodedBuffer1, 0, decodedBuffer1.length);
                        }
                        multiplexedStreams[multiplexingCount++] = streamId;
                    }
                    System.out.println("Multiplex: " + multiplexingCount + "("+streamId+")");
                } else {
                    Thread.yield();
                }
            } catch (Exception e) {
                log.debug("Send error : ", e);
            }

        } while (!bufferAvailable);
    }

    /** Fill the buffer of RtpPacket with necessary data. */
    private int fillRtpPacketBuffer() {

        int copyingSize = 0;
        int finalCopySize = 0;
        byte[] codedBuffer = new byte[ sipCodec.getOutgoingEncodedFrameSize() ];

        try {

            if ( ( tempBufferRemaining + encodingOffset ) >= sipCodec.getOutgoingDecodedFrameSize() ) {

                copyingSize = encodingBuffer.length - encodingOffset;

                BufferUtils.floatBufferIndexedCopy(
                        encodingBuffer,
                        encodingOffset,
                        tempBuffer,
                        tempBuffer.length - tempBufferRemaining,
                        copyingSize );

                encodingOffset = sipCodec.getOutgoingDecodedFrameSize();
                tempBufferRemaining -= copyingSize;
                finalCopySize = sipCodec.getOutgoingDecodedFrameSize();

                //println( "fillRtpPacketBuffer", "Simple copy of " + copyingSize + " bytes." );
            }
            else {
                if ( tempBufferRemaining > 0 ) {
                    BufferUtils.floatBufferIndexedCopy(
                            encodingBuffer,
                            encodingOffset,
                            tempBuffer,
                            tempBuffer.length - tempBufferRemaining,
                            tempBufferRemaining );

                    encodingOffset += tempBufferRemaining;
                    finalCopySize += tempBufferRemaining;
                    tempBufferRemaining = 0;

                }

                // Decode new asao packet.

                asao_buffer_processed = true;

                boolean bufferAvailable = false;
                int waitCount = 0;
                do {
                    if(multiplexingCount != 0) {
                        synchronized (this) {
                            bufferAvailable = multiplexingCount == streamsCount || waitCount++ > streamsCount;
                            if(bufferAvailable) {
//                                System.out.println("waitCount:" + waitCount);
                                multiplexingCount = 0;
                                waitCount = 0;
                                BufferUtils.floatBufferIndexedCopy(tempBuffer, 0, decodedBuffer2, 0, decodedBuffer2.length);
                            }
                        }
                    }
                    if(!bufferAvailable) {
                        Thread.sleep(5);
                    }
                } while (!bufferAvailable);
                long tmp = System.currentTimeMillis() - sendInterval;
                if(tmp > 50) {
                    System.out.println("Send: " + tmp);
                }
                sendInterval = System.currentTimeMillis();

//                tempBuffer = ResampleUtils.normalize(tempBuffer, 256); 	// normalise volume

                tempBufferRemaining = tempBuffer.length;

                if ( tempBuffer.length <= 0 ) {

                    println( "fillRtpPacketBuffer", "Asao decoder Error." );
                }

                // Try to complete the encodingBuffer with necessary data.

                if ( ( encodingOffset + tempBufferRemaining ) > sipCodec.getOutgoingDecodedFrameSize() ) {
                    copyingSize = encodingBuffer.length - encodingOffset;
                }
                else {
                    copyingSize = tempBufferRemaining;
                }

                BufferUtils.floatBufferIndexedCopy(
                        encodingBuffer,
                        encodingOffset,
                        tempBuffer,
                        0,
                        copyingSize );

                encodingOffset += copyingSize;
                tempBufferRemaining -= copyingSize;
                finalCopySize += copyingSize;
            }

            if (encodingOffset == encodingBuffer.length)
            {
                int encodedBytes = sipCodec.pcmToCodec( encodingBuffer, codedBuffer );

                if ( encodedBytes == sipCodec.getOutgoingEncodedFrameSize() ) {

                    BufferUtils.byteBufferIndexedCopy( packetBuffer,
                            RTP_HEADER_SIZE, codedBuffer, 0, codedBuffer.length );
                }
            }

        }
        catch ( Exception e ) {
            e.printStackTrace();
        }

        return finalCopySize;
    }


    public void run() {

        if ( rtpSocket == null ) {
            return;
        }

        asao_buffer_processed = false;

        if ( !hasInitilializedBuffers ) {

            tempBuffer = new float[ NELLYMOSER_DECODED_PACKET_SIZE ];
            multiplexedStreams = new int[100];
            decodedBuffer1 = new float[ NELLYMOSER_DECODED_PACKET_SIZE ];
            decodedBuffer2 = new float[ NELLYMOSER_DECODED_PACKET_SIZE ];
            encodingBuffer = new float[ sipCodec.getOutgoingDecodedFrameSize() ];

            hasInitilializedBuffers = true;
        }

        //println( "send",
        //        "asaoBuffer.length = [" + asaoBuffer.length + "], offset = ["
        //        + offset + "], num = [" + num + "]." );
        do {

            do {

                int encodedBytes = fillRtpPacketBuffer();

                //println( "send", sipCodec.getCodecName() + " encoded " + encodedBytes + " bytes." );

                if ( encodedBytes == 0 ) {

                    break;
                }

                if ( encodingOffset == sipCodec.getOutgoingDecodedFrameSize() ) {

                    //println( "send", "Seding packet with " + encodedBytes + " bytes." );

                    try {

                        rtpPacket.setSequenceNumber(seqn++);
                        rtpPacket.setTimestamp(time);
                        rtpPacket.setPayloadLength(sipCodec.getOutgoingEncodedFrameSize());
                        rtpSocketSend( rtpPacket );
                    }
                    catch ( Exception e ) {
                        println( "send", sipCodec.getCodecName() + " encoder error." );
                    }

                    encodingOffset = 0;
                }

                //println( "send", "asao_buffer_processed = ["
                //        + asao_buffer_processed + "] ." );
            }
            while ( !asao_buffer_processed );

        } while (rtpSocket != null);
    }

    public void halt() {

        DatagramSocket socket = rtpSocket.getDatagramSocket();

        rtpSocket.close();

        if ( socketIsLocal && socket != null ) {
            socket.close();
        }

        rtpSocket = null;
        sendThread = null;

        println( "halt", "Terminated" );
    }

    private synchronized void rtpSocketSend(RtpPacket rtpPacket) {

        try {
         	rtpSocket.send( rtpPacket );
            time += sipCodec.getOutgoingDecodedFrameSize();
        }
        catch ( Exception e ) {
        }
    }

    private static void println( String method, String message ) {

        log.debug( "RTPStreamSender - " + method + " -> " + message );
        System.out.println( "RTPStreamSender - " + method + " -> " + message );
    }
}
