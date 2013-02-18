package org.red5.sip.app;

import java.net.DatagramSocket;

import local.net.RtpPacket;
import local.net.RtpSocket;

import org.red5.codecs.SIPCodec;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class RTPStreamReceiver extends Thread {

    protected static Logger log = LoggerFactory.getLogger(RTPStreamReceiver.class);
    public static int RTP_HEADER_SIZE = 12;
    public static final int SO_TIMEOUT = 200;	// Maximum blocking time, spent waiting for reading new bytes [milliseconds]
    private SIPCodec sipCodec = null; // Sip codec to be used on audio session
    private IMediaReceiver rtmpUser = null;
    private RtpSocket rtp_socket = null;
    private boolean socketIsLocal = false;		// Whether the socket has been created here
    private boolean running = false;
    private long timeStamp = 0;
    private int frameCounter = 0;


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

    public RTPStreamReceiver(SIPCodec sipCodec, IMediaReceiver rtmpUser, int local_port)
    {
        try {
            DatagramSocket socket = new DatagramSocket( local_port );

            socketIsLocal = true;

            init( sipCodec, rtmpUser, socket );
        }
        catch ( Exception e ) {
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

    public RTPStreamReceiver(SIPCodec sipCodec, IMediaReceiver rtmpUser, DatagramSocket socket)
    {
        init( sipCodec, rtmpUser, socket );
    }


    /** Inits the RtpStreamReceiver */

    private void init( SIPCodec sipCodec, IMediaReceiver rtmpUser, DatagramSocket socket )
    {
        this.sipCodec = sipCodec;
        this.rtmpUser = rtmpUser;

        if ( socket != null ) {
            rtp_socket = new RtpSocket( socket );
        }
    }


    /** Whether is running */

    public boolean isRunning()
    {
        return running;
    }


    /** Stops running */

    public void halt()
    {
        running = false;
    }

    /** Runs it in a new Thread. */

    public void run()
    {
        if ( rtp_socket == null )
        {
            println( "run", "RTP socket is null." );
            return;
        }

        byte[] codedBuffer 		= new byte[ sipCodec.getIncomingEncodedFrameSize() ];
        byte[] internalBuffer 	= new byte[sipCodec.getIncomingEncodedFrameSize() + RTP_HEADER_SIZE ];

        RtpPacket rtpPacket = new RtpPacket( internalBuffer, 0 );

        running = true;

        try {

            rtp_socket.getDatagramSocket().setSoTimeout( SO_TIMEOUT );

            float[] decodingBuffer = new float[ sipCodec.getIncomingDecodedFrameSize() ];

            println( "run",
                    "internalBuffer.length = " + internalBuffer.length
                    + ", codedBuffer.length = " + codedBuffer.length
                    + ", decodingBuffer.length = " + decodingBuffer.length + "." );

            while ( running ) {

                try {
                    rtp_socket.receive( rtpPacket );
                    frameCounter++;

                    if ( running ) {

                        byte[] packetBuffer = rtpPacket.getPacket();
                        int offset = rtpPacket.getHeaderLength();
                        int payloadType = rtpPacket.getPayloadType();

                        if(payloadType < 20)
                        {
							System.arraycopy(packetBuffer, offset, codedBuffer, 0, sipCodec.getIncomingEncodedFrameSize());
                            //timeStamp = (System.currentTimeMillis() - start);
                            timeStamp += sipCodec.getIncomingPacketization();
							rtmpUser.pushAudio(codedBuffer, timeStamp, 130);
                        }
                    }
                }
                catch ( java.io.InterruptedIOException e ) {
                }
            }
        }
        catch ( Exception e ) {

            running = false;
            log.error("Exception", e);
        }

        // Close RtpSocket and local DatagramSocket.
        DatagramSocket socket = rtp_socket.getDatagramSocket();
        rtp_socket.close();

        if ( socketIsLocal && socket != null ) {
            socket.close();
        }

        // Free all.
        rtp_socket = null;

        println( "run", "Terminated." );
        println( "run", "Frames = " + frameCounter + "." );
    }


    /** Debug output */
    private static void println( String method, String message ) {
        //log.debug( "RtpStreamReceiver - " + method + " -> " + message );
    }
}

