package org.red5.server.webapp.sip;

import local.ua.MediaLauncher;
import org.zoolu.sip.provider.SipStack;

import java.net.DatagramSocket;

import java.io.BufferedInputStream;
import java.io.InputStream;
import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.AudioInputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class SIPAudioLauncher implements MediaLauncher {

    protected static Logger log = LoggerFactory.getLogger(SIPAudioLauncher.class);

	int payload_type=0;		// ulaw 16bit at 8KHZ 256 bytes framebuffer
	int sample_rate=8000;
	int sample_size=1;
	int frame_size=256;
	int frame_rate=16;

	boolean signed=false;
	boolean big_endian=false;


	DatagramSocket socket=null;

	public RTPStreamSender sender=null;
	public RTPStreamReceiver receiver=null;


   public SIPAudioLauncher(int local_port, String remote_addr, int remote_port, InputStream input_stream, RTMPUser rtmpUser, int sample_rate, int sample_size, int frame_size) {
      frame_rate=sample_rate/frame_size;

      try {
		    socket=new DatagramSocket(local_port);

			printLog("new audio sender to "+remote_addr+":"+remote_port);
            sender=new RTPStreamSender(new BufferedInputStream(input_stream),false,payload_type,frame_rate,frame_size,socket,remote_addr,remote_port);
			//sender=new RTPStreamSender(input_stream,true,payload_type,frame_rate,frame_size,socket,remote_addr,remote_port);

            printLog("new audio receiver on "+local_port);
            receiver=new RTPStreamReceiver(rtmpUser, socket);
      }
      catch (Exception e) {
		  printLog("SIPAudioLauncher execption " + e);
      }
   }


   public boolean startMedia()
   {  printLog("starting sip audio..");

      if (sender!=null)
      {  printLog("start sending");
         sender.start();
      }

      if (receiver!=null)
      {  printLog("start receiving");
         receiver.start();
      }

      return true;
   }


   public boolean stopMedia()
   {  printLog("halting sip audio..");

      if (sender!=null)
      {  sender.halt(); sender=null;
         printLog("sender halted");
      }

      if (receiver!=null)
      {  receiver.halt(); receiver=null;
         printLog("receiver halted");
      }

      // take into account the resilience of RtpStreamSender
      // (NOTE: it does not take into acconunt the resilience of RtpStreamReceiver; this can cause SocketException)
      try { Thread.sleep(RTPStreamReceiver.SO_TIMEOUT); } catch (Exception e) {}
      socket.close();
      return true;
   }

   private void printLog(String str) {
		log.debug(str);
   }
}