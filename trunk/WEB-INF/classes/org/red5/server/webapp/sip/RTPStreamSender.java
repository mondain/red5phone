package org.red5.server.webapp.sip;


import local.net.RtpPacket;
import local.net.RtpSocket;

import java.io.InputStream;
import java.net.InetAddress;
import java.net.DatagramSocket;

import java.util.Vector;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



public class RTPStreamSender extends Thread
{
   protected static Logger log = LoggerFactory.getLogger(RTPStreamSender.class);

   public static boolean DEBUG=true;

   InputStream input_stream=null;
   RtpSocket rtp_socket=null;
   int p_type;
   long frame_rate;
   int frame_size;
   long frame_time=-1;
   boolean socket_is_local=false;
   boolean do_sync=true;
   int sync_adj=0;
   boolean running=false;
   Asao2Ulaw asao2Ulaw = new Asao2Ulaw();
   int dtmf2833Type=101;
   Vector<String> dtmfSipQueue=new Vector<String>();


   /** Constructs a RtpStreamSender.
     * @param input_stream the stream source
     * @param do_sync whether time synchronization must be performed by the RtpStreamSender,
     *        or it is performed by the InputStream (e.g. the system audio input)
     * @param payload_type the payload type
     * @param frame_rate the frame rate, i.e. the number of frames that should be sent per second;
     *        it is used to calculate the nominal packet time and,in case of do_sync==true,
              the next departure time
     * @param frame_size the size of the payload
     * @param dest_addr the destination address
     * @param dest_port the destination port */

   public RTPStreamSender(InputStream input_stream, boolean do_sync, int payload_type, long frame_rate, int frame_size, String dest_addr, int dest_port)
   {  init(input_stream,do_sync,payload_type,frame_rate,frame_size,null,dest_addr,dest_port);
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
     * @param input_stream the stream to be sent
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
   public RTPStreamSender(InputStream input_stream, boolean do_sync, int payload_type, long frame_rate, int frame_size, DatagramSocket src_socket, String dest_addr, int dest_port)
   {  init(input_stream,do_sync,payload_type,frame_rate,frame_size,src_socket,dest_addr,dest_port);
   }


   /** Inits the RtpStreamSender */
   private void init(InputStream input_stream, boolean do_sync, int payload_type, long frame_rate, int frame_size, DatagramSocket src_socket, /*int src_port,*/ String dest_addr, int dest_port)
   {
	  long byte_rate=frame_rate*frame_size;

      this.input_stream = asao2Ulaw.decode(input_stream);
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
   {  sync_adj=millisecs;
   }

   /** Whether is running */
   public boolean isRunning()
   {  return running;
   }

   public void queueSipDtmfDigits(String argDigits)
   {
		for (int d=0;d<argDigits.length();d++)
			dtmfSipQueue.add(argDigits.substring(d,d+1));
   }

   private char getNextDtmfDigit()
   {
		 if (dtmfSipQueue.size()>0)
		 {
		   String digit=dtmfSipQueue.get(0);
		   dtmfSipQueue.remove(0);
		   return digit.charAt(0);
		 }
		 else
			 return 0;
   }

   /** Stops running */
   public void halt()
   {  running=false;
   }

   /** Runs it in a new Thread. */
   public void run()
   {
      if (rtp_socket==null || input_stream==null) return;
      //else

      byte[] buffer=new byte[frame_size+12];
      RtpPacket rtp_packet=new RtpPacket(buffer,0);
      rtp_packet.setPayloadType(p_type);

      int startPayloadPos=rtp_packet.getHeaderLength();

	  byte[] dtmfbuf=new byte[frame_size+12];
	  RtpPacket dtmfpacket=new RtpPacket(dtmfbuf,0);
      dtmfpacket.setPayloadType(dtmf2833Type);
	  dtmfpacket.setPayloadLength(frame_size);

      byte[] blankbuf=new byte[frame_size+12];
	  RtpPacket blankpacket=new RtpPacket(blankbuf,0);
	  blankpacket.setPayloadType(p_type);
	  blankpacket.setPayloadLength(frame_size);

      int seqn=0;
      long time=0;
      //long start_time=System.currentTimeMillis();
      long byte_rate=frame_rate*frame_size;

      running=true;

      if (DEBUG) println("RtpStreamSender: Writing blocks of "+(buffer.length-12)+" bytes");

      try
      {  while (running)
         {

			if (dtmfSipQueue.size()>0)
			{

				char digit=getNextDtmfDigit();

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



            int num=input_stream.read(buffer,12,buffer.length-12);
            if (num>0)
            {  rtp_packet.setSequenceNumber(seqn++);
               rtp_packet.setTimestamp(time);
               rtp_packet.setPayloadLength(num);
               rtp_socket.send(rtp_packet);
               // update rtp timestamp (in milliseconds)
               long frame_time=(num*1000)/byte_rate;
               time+=frame_time;
               // wait fo next departure
               if (do_sync)
               {  // wait before next departure..
                  //long frame_time=start_time+time-System.currentTimeMillis();
                  // accellerate in order to compensate possible program latency.. ;)
                  frame_time-=sync_adj;
                  try {  Thread.sleep(frame_time);  } catch (Exception e) {}
               }
            }
            else
            if (num<0)
            {  running=false;
               if (DEBUG) println("RtpStreamSender: Error reading from InputStream");
            }
         }
      }
      catch (Exception e) {  running=false;  e.printStackTrace();  }

      //if (DEBUG) println("rtp time:  "+time);
      //if (DEBUG) println("real time: "+(System.currentTimeMillis()-start_time));

      // close RtpSocket and local DatagramSocket
      DatagramSocket socket=rtp_socket.getDatagramSocket();
      rtp_socket.close();
      if (socket_is_local && socket!=null) socket.close();

      // free all
      asao2Ulaw.stop();
      asao2Ulaw = null;

      input_stream=null;
      rtp_socket=null;

      if (DEBUG) println("RtpStreamSender: Terminated");
   }

	private void doRtpDelay()
	{

		try {
			sleep(this.frame_time-2);

		} catch(Exception e){}
	}


   /** Debug output */
   private static void println(String str)
   {
	   log.debug(str);
   }

}