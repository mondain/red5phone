package org.red5.server.webapp.sip;


import local.net.RtpPacket;
import local.net.RtpSocket;

import java.net.InetAddress;
import java.net.DatagramSocket;

import java.util.Vector;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.red5.codecs.asao.*;
import local.media.G711;


public class RTPStreamSender
{
   protected static Logger log = LoggerFactory.getLogger(RTPStreamSender.class);

   public static boolean DEBUG=true;
   public static final int BUFFER_SIZE=32768;

   RtpSocket rtp_socket=null;
   int p_type;
   long frame_rate;
   int frame_size;
   long frame_time=-1;
   boolean socket_is_local=false;
   boolean do_sync=true;
   private int sync_adj=0;

   private Decoder decoder;
   private DecoderMap decoderMap;

   private byte[] buffer;
   private RtpPacket rtp_packet;
   private int startPayloadPos;

   private int dtmf2833Type=101;
   private int seqn=0;
   private long time=0;
   private long byte_rate;
   private int packetCount = 0;

   /** Constructs a RtpStreamSender.
     * @param RTMPUser the RTMP stream source
     * @param do_sync whether time synchronization must be performed by the RtpStreamSender,
     *        or it is performed by the InputStream (e.g. the system audio input)
     * @param payload_type the payload type
     * @param frame_rate the frame rate, i.e. the number of frames that should be sent per second;
     *        it is used to calculate the nominal packet time and,in case of do_sync==true,
              the next departure time
     * @param frame_size the size of the payload
     * @param dest_addr the destination address
     * @param dest_port the destination port */

   public RTPStreamSender(RTMPUser rtmpUser, boolean do_sync, int payload_type, long frame_rate, int frame_size, String dest_addr, int dest_port)
   {
	   init(rtmpUser, do_sync, payload_type, frame_rate, frame_size, null, dest_addr, dest_port);
   }


   /** Constructs a RtpStreamSender.
     * @param input_stream the stream source
     * @param do_sync whether time synchronization must be performed by the RtpStreamSender,
     *        or it is performed by the InputStream (e.g. the system audio input)
     * @param payload_type the payload type
     * @param frame_rate the frame rate, i.e. the number of frames that should be sent per second;
     *        it is used to calculate the nominal packet time and,in case of do_sync==true,
              the next departure time
     * @param frame_size the size of the payload
     * @param src_port the source port
     * @param dest_addr the destination address
     * @param dest_port the destination port */
   //public RtpStreamSender(InputStream input_stream, boolean do_sync, int payload_type, long frame_rate, int frame_size, int src_port, String dest_addr, int dest_port)
   //{  init(input_stream,do_sync,payload_type,frame_rate,frame_size,null,src_port,dest_addr,dest_port);
   //}


   /** Constructs a RtpStreamSender.
     * @param RTMPUser the RTMP stream source
     * @param do_sync whether time synchronization must be performed by the RtpStreamSender,
     *        or it is performed by the InputStream (e.g. the system audio input)
     * @param payload_type the payload type
     * @param frame_rate the frame rate, i.e. the number of frames that should be sent per second;
     *        it is used to calculate the nominal packet time and,in case of do_sync==true,
              the next departure time
     * @param frame_size the size of the payload
     * @param src_socket the socket used to send the RTP packet
     * @param dest_addr the destination address
     * @param dest_port the thestination port */

   public RTPStreamSender(RTMPUser rtmpUser, boolean do_sync, int payload_type, long frame_rate, int frame_size, DatagramSocket src_socket, String dest_addr, int dest_port)
   {  init(rtmpUser, do_sync, payload_type, frame_rate, frame_size, src_socket, dest_addr, dest_port);
   }


   /** Inits the RtpStreamSender */
   private void init(RTMPUser rtmpUser, boolean do_sync, int payload_type, long frame_rate, int frame_size, DatagramSocket src_socket, /*int src_port,*/ String dest_addr, int dest_port)
   {
	  byte_rate=frame_rate*frame_size;

	  rtmpUser.rtpStreamSender = this;

      this.p_type=payload_type;
      this.frame_rate=frame_rate;
      this.frame_size=frame_size;
      this.frame_time=(frame_size*1000)/byte_rate; // milliseconds
      this.do_sync=do_sync;

      try
      {  if (src_socket==null)
         {  //if (src_port>0) src_socket=new DatagramSocket(src_port); else
            src_socket=new DatagramSocket();
            socket_is_local=true;
         }
         rtp_socket=new RtpSocket(src_socket,InetAddress.getByName(dest_addr),dest_port);
      }
      catch (Exception e) {  e.printStackTrace();  }
   }


   /** Sets the synchronization adjustment time (in milliseconds). */
   public void setSyncAdj(int millisecs)
   {
	   sync_adj=millisecs;
   }


   public void start()
   {
		buffer=new byte[160 + 12];
		rtp_packet=new RtpPacket(buffer,0);
		rtp_packet.setPayloadType(p_type);
		startPayloadPos=rtp_packet.getHeaderLength();

		seqn=0;
		time=0;

		if (DEBUG) println("RtpStreamSender: using blocks of "+(buffer.length-12)+" bytes");

        decoder = new Decoder();
        decoderMap = null;
   }



   public void queueSipDtmfDigits(String argDigits)
   {
		byte[] dtmfbuf=new byte[frame_size+12];
		RtpPacket dtmfpacket=new RtpPacket(dtmfbuf,0);
		dtmfpacket.setPayloadType(dtmf2833Type);
		dtmfpacket.setPayloadLength(frame_size);

		byte[] blankbuf=new byte[frame_size+12];
		RtpPacket blankpacket=new RtpPacket(blankbuf,0);
		blankpacket.setPayloadType(p_type);
		blankpacket.setPayloadLength(frame_size);

		//long start_time=System.currentTimeMillis();

		long byte_rate=frame_rate*frame_size;

		for (int d=0;d<argDigits.length();d++) {

			char digit = argDigits.charAt(d) ;

			if (digit=='*')
				dtmfbuf[startPayloadPos]=10;

			else if (digit=='#')
				dtmfbuf[startPayloadPos]=11;

			else if (digit>='A' && digit<='D')
				dtmfbuf[startPayloadPos]=(byte)(digit-53);

			else
				dtmfbuf[startPayloadPos]=(byte)(digit-48);


			if (DEBUG) println("Sending digit:"+dtmfbuf[startPayloadPos]);

			// notice we are bumping times/seqn just like audio packets

			try
			{
				// send start event packet 3 times
				dtmfbuf[startPayloadPos+1]=0; // start event flag and volume
				dtmfbuf[startPayloadPos+2]=1; // duration 8 bits
				dtmfbuf[startPayloadPos+3]=-32; // duration 8 bits

				for (int r=0;r<3;r++)
				{
					dtmfpacket.setSequenceNumber(seqn++);
					dtmfpacket.setTimestamp(time+=frame_size);
					doRtpDelay();
					rtp_socket.send(dtmfpacket);
				}

				// send end event packet 3 times
				dtmfbuf[startPayloadPos+1]=-128; // end event flag
				dtmfbuf[startPayloadPos+2]=3; // duration 8 bits
				dtmfbuf[startPayloadPos+3]=116; // duration 8 bits
				for (int r=0;r<3;r++)
				{
					dtmfpacket.setSequenceNumber(seqn++);
					dtmfpacket.setTimestamp(time+=frame_size);
					doRtpDelay();
					rtp_socket.send(dtmfpacket);
				}

				// send 200 ms of blank packets
				for (int r=0;r<200/frame_time;r++)
				{
					blankpacket.setSequenceNumber(seqn++);
					blankpacket.setTimestamp(time+=frame_size);
					doRtpDelay();
					rtp_socket.send(blankpacket);
				}

			}
			catch(Exception e)
			{
				if (DEBUG) println(e.getLocalizedMessage());
			}
		}

   }


   	public void send(byte[] asaoBuffer , int offset, int num) {

		if (rtp_socket==null) return;

		if (num>0)
		{
		   //if (DEBUG) println("RtpStreamSender: Recieving asao " + num + " bytes");

		   float audioFloat[] = new float[256];
		   ByteStream audioStream = new ByteStream(asaoBuffer, offset, num);

		   decoderMap = decoder.decode(decoderMap, audioStream.bytes, 1, audioFloat, 0);

		   int num2 = audioFloat.length;

		   //if (DEBUG) println("RtpStreamSender: Decoded pcm " + num2 + " floats");

		   if (num2 > 0) {


				for (int encR=0; encR<num2; encR++)
				{
					buffer[packetCount + 12] = (byte) G711.linear2ulaw((int) audioFloat[encR]);
					packetCount++;


					if (packetCount == 160) {

						//if (DEBUG) println("RtpStreamSender: Encoded ulaw " + kt + " bytes");

					   try {

						   rtp_packet.setSequenceNumber(seqn++);
						   rtp_packet.setTimestamp(time);
						   rtp_packet.setPayloadLength(packetCount);
						   rtp_socket.send(rtp_packet);
						   // update rtp timestamp (in milliseconds)
						   long frame_time=(num*1000)/byte_rate;
						   //time+=frame_time;
						   time+=rtp_packet.getPayloadLength();

					   // wait fo next departure

					   } catch(Exception e){
						   println("RtpStreamSender: ulaw encoder Error ");
					   }

						packetCount = 0;
					}
				}


		   } else println("RtpStreamSender: asao decoder Error ");
		}

		else
			if (num<0)
			{
			   if (DEBUG) println("RtpStreamSender: Closing");
			}

	}

   	public void halt() {

      DatagramSocket socket=rtp_socket.getDatagramSocket();
      rtp_socket.close();

      if (socket_is_local && socket!=null) socket.close();

      rtp_socket=null;

      if (DEBUG) println("RtpStreamSender: Terminated");
   	}



	private void doRtpDelay()
	{
		try {
			Thread.sleep(this.frame_time-2);

		} catch(Exception e){}
	}


   private static void println(String str)
   {
	   log.debug(str);
   }

}