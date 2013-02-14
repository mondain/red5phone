package org.red5.sip.app;

import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.concurrent.atomic.AtomicLong;

import local.net.RtpPacket;
import local.net.RtpSocket;

import org.red5.codecs.SIPCodec;
import org.red5.codecs.asao.Decoder;
import org.red5.codecs.asao.DecoderMap;
import org.red5.logging.Red5LoggerFactory;
import org.slf4j.Logger;
import org.zoolu.tools.Random;


public class RTPStreamSender implements IMediaSender {

    protected static Logger log = Red5LoggerFactory.getLogger( RTPStreamSender.class, "sip" );

    public static boolean useASAO = true;

    public static int RTP_HEADER_SIZE = 12;

    protected static final int NELLYMOSER_DECODED_PACKET_SIZE = 256;

    protected static final int NELLYMOSER_ENCODED_PACKET_SIZE = 64;

    RtpSocket rtpSocket = null;

    /** Sip codec to be used on audio session */
    protected SIPCodec sipCodec = null;

    boolean socketIsLocal = false;

    boolean doSync = true;

    protected Decoder decoder;

    protected DecoderMap decoderMap;

    private int seqn = 0;

    private AtomicLong syncSourceBase = new AtomicLong(Random.nextLong());

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

    public RTPStreamSender(
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
    public RTPStreamSender(
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

            rtpSocket = new RtpSocket( src_socket, InetAddress.getByName( dest_addr ), dest_port );
        }
        catch ( Exception e ) {
            e.printStackTrace();
        }
    }

    public IMediaStream createStream(int streamId) {
        return new RTPStream(streamId, syncSourceBase.getAndIncrement(), this);
    }

    public void deleteStream(int streamId) {
        //nothing to do
    }

    public void start() {
        seqn = 0;
        decoder = new Decoder();
        decoderMap = null;
    }

    protected void send(RtpPacket rtpPacket) {
        if ( rtpSocket == null ) {
            return;
        }
        rtpPacket.setSequenceNumber(seqn++);
        rtpSocketSend( rtpPacket );
    }


    public void halt() {

        DatagramSocket socket = rtpSocket.getDatagramSocket();

        rtpSocket.close();

        if ( socketIsLocal && socket != null ) {
            socket.close();
        }

        rtpSocket = null;

        println( "halt", "Terminated" );
    }


    private synchronized void rtpSocketSend(RtpPacket rtpPacket) {
        try {
         	rtpSocket.send( rtpPacket );
            System.out.println(rtpPacket.getSscr() + " : " + rtpPacket.getTimestamp());
        }
        catch ( Exception e ) {
        }
    }

    private static void println( String method, String message ) {
        log.debug( "RTPStreamSender - " + method + " -> " + message );
        System.out.println( "RTPStreamSender - " + method + " -> " + message );
    }



}

