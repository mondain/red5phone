package org.red5.server.webapp.sip;


import local.net.RtpPacket;
import local.net.RtpSocket;
import local.media.G711;

import java.io.*;
import java.net.InetAddress;
import java.net.DatagramSocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.apache.mina.common.ByteBuffer;


public class RTPStreamReceiver extends Thread
{

	protected static Logger log = LoggerFactory.getLogger(RTPStreamReceiver.class);

   /** Whether working in debug mode. */
   //private static final boolean DEBUG=true;
   public static boolean DEBUG=true;

   /** Size of the read buffer */
   public static final int BUFFER_SIZE=32768;

   /** Maximum blocking time, spent waiting for reading new bytes [milliseconds] */
   public static final int SO_TIMEOUT=200;

   /** The RTMPUser */
   RTMPUser rtmpUser=null;

   /** The RtpSocket */
   RtpSocket rtp_socket=null;

   /** Whether the socket has been created here */
   boolean socket_is_local=false;

   /** Whether it is running */
   boolean running=false;

   int last = 0;
   int timeStamp = 0;
   int frameCounter = 0;

   ByteBuffer buffer = ByteBuffer.allocate(1024);

   /** Constructs a RtpStreamReceiver.
     * @param rtmpUser the stream sink
     * @param local_port the local receiver port */
   public RTPStreamReceiver(RTMPUser rtmpUser, int local_port)
   {  try
      {  DatagramSocket socket=new DatagramSocket(local_port);
         socket_is_local=true;
         init(rtmpUser,socket);
      }
      catch (Exception e) {  e.printStackTrace();  }
   }

   /** Constructs a RtpStreamReceiver.
     * @param rtmpUser the stream sink
     * @param socket the local receiver DatagramSocket */
   public RTPStreamReceiver(RTMPUser rtmpUser, DatagramSocket socket)
   {  init(rtmpUser,socket);
   }

   /** Inits the RtpStreamReceiver */
   private void init(RTMPUser rtmpUser, DatagramSocket socket)
   {  this.rtmpUser = rtmpUser;
      if (socket!=null) rtp_socket=new RtpSocket(socket);
   }


   /** Whether is running */
   public boolean isRunning()
   {  return running;
   }

   /** Stops running */
   public void halt()
   {  running=false;
   }

   /** Runs it in a new Thread. */
   public void run()
   {
      if (rtp_socket==null)
      {  if (DEBUG) println("RtpStreamReceiver: RTP socket is null");
         return;
      }
      //else

      byte[] buffer=new byte[BUFFER_SIZE];
      RtpPacket rtp_packet=new RtpPacket(buffer,0);
      boolean compress = false;  //"yes".equals(PacketHandler.getInstance().getADPCMCompress());


      if (DEBUG) println("RtpStreamReceiver: Reading blocks of max "+buffer.length+" bytes");

	  try {
		//writeHeader();

	  } catch (Exception e) {
		 System.out.println("RtpStreamReceiver: Exception " + e);
	  }

      running=true;
      try
      {  rtp_socket.getDatagramSocket().setSoTimeout(SO_TIMEOUT);
      	 float aux1[] = new float[440];
      	 int packetCount = 0;

         while (running)
         {  try
            {  // read a block of data from the rtp socket
               rtp_socket.receive(rtp_packet);
               frameCounter++;

               if (running)
               {  byte[] pkt=rtp_packet.getPacket();
                  int offset=rtp_packet.getHeaderLength();
                  int len=rtp_packet.getPayloadLength();

				  //System.out.println("Packet size = " + len);
				  //System.out.println("Timestamp = " + rtp_packet.getTimestamp());

                  for (int i=0; i<len; i++)
                  {
                     aux1[packetCount++]=(float)G711.ulaw2linear(pkt[offset+i]);

                     if (packetCount == 440) {
						  byte[] aux = resample ((float)(8.0/11.025), aux1);

						  if (compress) {
						  	byte[] aux2 = ADPCM.compress(aux);
						    rtmpUser.pushAudio(aux2.length, aux2, timeStamp, true);

					  	  } else {
							rtmpUser.pushAudio(aux.length, aux, timeStamp, false);
					      }
						  timeStamp = timeStamp + 46;
						  packetCount = 0;
					 }
                  }
               }
            }
            catch (java.io.InterruptedIOException e) { }
         }

		byte[] aux = resample ((float)(8.0/11.025), aux1);

		if (compress) {
			byte[] aux2 = ADPCM.compress(aux);
			rtmpUser.pushAudio(aux2.length, aux2, timeStamp, true);

		} else {
			rtmpUser.pushAudio(aux.length, aux, timeStamp, false);
		}

      }
      catch (Exception e) {  running=false;  e.printStackTrace();  }

      // close RtpSocket and local DatagramSocket
      DatagramSocket socket=rtp_socket.getDatagramSocket();
      rtp_socket.close();
      if (socket_is_local && socket!=null) socket.close();

      // free all

      rtp_socket=null;

      if (DEBUG) println("RtpStreamReceiver: Terminated");

	  System.out.println("RtpStreamReceiver: Frames = " + frameCounter);
   }


   /** Debug output */
   private static void println(String str)
   {
	   log.debug(str);
   }


	public byte[] resample (float sampleRateFactor, float[] s1)
	{

		int o1 = 0;
		int l1 = s1.length;

		int resampledLength = (int)((float)l1 / sampleRateFactor);

	   	float tmp[] = new float[resampledLength];

      	double oldIndex = o1;

      	for (int i=o1; i<o1+resampledLength; i++)   {

        	if (((int)oldIndex+1) < s1.length)
			{
				tmp[i] = interpolate0(s1, (float)oldIndex);
			}
         	else
			   break;   //end of source

		 	oldIndex += sampleRateFactor;
      	}

      	oldIndex = o1;

      	for (int i=o1; i<o1+resampledLength; i++)   {

        	if (((int)oldIndex+1) < s1.length)
			{
				tmp[i] = interpolate1(s1, (float)oldIndex);
			}
         	else
			   break;   //end of source

		 	oldIndex += sampleRateFactor;
      	}



		byte[] outSample = new byte[resampledLength * 2];
		int pos = 0;

		for (int z=o1; z<o1+resampledLength; z++)
		{
            outSample[pos++]=(byte)((int)tmp[z] & 0xFF);
            outSample[pos++]=(byte)(((int)tmp[z] & 0xFF00)>>8);
		}

		return outSample;
	}



   public static int byte2int(byte b)
   {  //return (b>=0)? b : -((b^0xFF)+1);
      //return (b>=0)? b : b+0x100;
      return (b+0x100)%0x100;
   }

   public static int byte2int(byte b1, byte b2)
   {  return (((b1+0x100)%0x100)<<8)+(b2+0x100)%0x100;
   }


	/**
	 *	zeroth order interpolation
	 *	@param data seen as circular buffer when array out of bounds
	 */
	public static float interpolate0 (float[] data, float index)
	{
		try
		{
			return data[((int)index)%data.length];
		}
		catch (ArrayIndexOutOfBoundsException e)
		{
			return 0;
		}
	}


	/**
	 *	first order interpolation
	 *	@param data seen as circular buffer when array out of bounds
	 */
	public static float interpolate1 (float[] data, float index)
	{
		try
		{
			int ip = ((int)index);
			float fp = index - ip;

	      return data[ip%data.length] * (1 - fp) + data[(ip+1)%data.length] * fp;
		}
		catch (ArrayIndexOutOfBoundsException e)
		{
			return 0;
		}
	}

	/**
	 *	second order interpolation
	 *	@param data seen as circular buffer when array out of bounds
	 */
	public static float interpolate2 (float[] data, float index)
	{
		try
		{
			//Newton's 2nd order interpolation
			int ip = ((int)index);
			float fp = index - ip;

			float d0 = data[ip%data.length];
			float d1 = data[(ip+1)%data.length];
			float d2 = data[(ip+2)%data.length];

			float a0 = d0;
			float a1 = d1 - d0;
			float a2 = (d2 - d1 - a1) / 2;

			return a0 + a1 * fp + a2 * fp * (fp - 1);

		}
		catch (ArrayIndexOutOfBoundsException e)
		{
			return 0;
		}
	}


	/**
	 *	third order interpolation
	 *	@param data seen as circular buffer when array out of bounds
	 */
	public static float interpolate3 (float[] data, float index)
	{
		try
		{
			//cubic hermite interpolation
			int ip = (int)index;
			float fp = index - ip;

			float dm1 = data[(ip-1)%data.length];
			float d0 = data[ip%data.length];
			float d1 = data[(ip+1)%data.length];
			float d2 = data[(ip+2)%data.length];

			float a = (3 * (d0 - d1) - dm1 + d2) / 2;
			float b = 2 * d1 + dm1 - (5 * d0 + d2) / 2;
			float c = (d1 - dm1) / 2;

			return (((a * fp) + b) * fp + c) * fp + data[ip%data.length];

		}
		catch (ArrayIndexOutOfBoundsException e)
		{
			return 0;
		}
	}
}


