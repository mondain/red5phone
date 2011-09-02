package org.red5.server.webapp.sip;


import local.net.RtpPacket;
import local.net.RtpSocket;

import java.net.InetAddress;
import java.net.DatagramSocket;
import java.util.Vector;

import org.slf4j.Logger;

import org.red5.logging.Red5LoggerFactory;
import org.red5.codecs.SIPCodec;


public class RTPStreamSender
{
    protected static Logger log = Red5LoggerFactory.getLogger( RTPStreamSender.class, "sip" );

    public static int RTP_HEADER_SIZE = 12;
    RtpSocket rtpSocket = null;
    private SIPCodec sipCodec = null;
    boolean socketIsLocal = false;
    boolean doSync = true;
    private int syncAdj = 0;
    private byte[] packetBuffer;
    private RtpPacket rtpPacket;
    private int seqn = 0;
    private long time = 0;

    /**
     * Constructs a RtpStreamSender.
     *
     * @param RTMPUser
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

    public RTPStreamSender(RTMPUser rtmpUser, boolean do_sync, SIPCodec sipCodec, String dest_addr, int dest_port )
    {
        init( rtmpUser, do_sync, sipCodec, null, dest_addr, dest_port );
    }

    /**
     * Constructs a RtpStreamSender.
     *
     * @param RTMPUser
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

    public RTPStreamSender(RTMPUser rtmpUser, boolean do_sync, SIPCodec sipCodec, DatagramSocket src_socket, String dest_addr, int dest_port )
    {
        init( rtmpUser, do_sync, sipCodec, src_socket, dest_addr, dest_port );
    }


    private void init(RTMPUser rtmpUser, boolean do_sync, SIPCodec sipCodec, DatagramSocket src_socket,String dest_addr, int dest_port )
    {
        rtmpUser.rtpStreamSender = this;
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


    /** Sets the synchronization adjustment time (in milliseconds). */

    public void setSyncAdj( int millisecs )
    {
        syncAdj = millisecs;
    }


    public void start()
    {
        packetBuffer = new byte[ sipCodec.getOutgoingEncodedFrameSize() + RTP_HEADER_SIZE ];
        rtpPacket = new RtpPacket( packetBuffer, 0 );
        rtpPacket.setPayloadType( sipCodec.getCodecId() );

        seqn = 0;
        time = 0;

        println( "start()", "using blocks of " + ( packetBuffer.length - RTP_HEADER_SIZE ) + " bytes." );
    }


    public void queueSipDtmfDigits( String argDigits )
    {

    }



    public void send( byte[] asaoInput, int offset, int num ) {

        if ( rtpSocket == null ) {
            return;
        }

        if ( num > 0 ) {

			byte [] asaoBuffer = new byte[num];
			System.arraycopy(asaoInput, offset, packetBuffer, RTP_HEADER_SIZE, num);

			rtpPacket.setSequenceNumber( seqn++);
			rtpPacket.setTimestamp( time );
			rtpPacket.setPayloadLength( sipCodec.getOutgoingEncodedFrameSize() );
			rtpSocketSend( rtpPacket );

        } else if ( num < 0 ) {

            println( "send", "Closing" );
        }
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


    private synchronized void rtpSocketSend(RtpPacket rtpPacket)
    {
        try {
         	rtpSocket.send( rtpPacket );
            time += sipCodec.getOutgoingDecodedFrameSize();
        }
        catch ( Exception e ) {
        }
    }

    private static void println( String method, String message )
    {
        log.debug( "RTPStreamSender - " + method + " -> " + message );
        System.out.println( "RTPStreamSender - " + method + " -> " + message );
    }



}
