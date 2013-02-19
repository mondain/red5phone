package org.red5.sip.app;

import java.net.DatagramSocket;
import org.red5.codecs.SIPCodec;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import local.net.RtpPacket;
import local.net.RtpSocket;

public class RTPStreamVideoReceiver extends Thread {

	protected static Logger log = LoggerFactory.getLogger(RTPStreamVideoReceiver.class);
	public static int RTP_HEADER_SIZE = 12;
	protected RtpSocket rtpSocket;
	protected IMediaReceiver mediaReceiver;
	protected SIPCodec codec;
	private boolean running;
	
	public RTPStreamVideoReceiver(IMediaReceiver mediaReceiver, DatagramSocket socket, SIPCodec codec) {
		this.mediaReceiver = mediaReceiver;
		rtpSocket = new RtpSocket(socket);
		this.codec = codec;
	}

	@Override
	public void interrupt() {
		running = false;
	}

	@Override
	public void run() {
		running = true;
		
		try {
			while(running) {
				byte[] sourceBuffer = new byte[codec.getIncomingDecodedFrameSize()];
				RtpPacket rtpPacket = new RtpPacket(sourceBuffer, 0);
				rtpSocket.receive(rtpPacket);
				byte[] destBuffer = new byte[rtpPacket.getLength() - rtpPacket.getHeaderLength()];
				System.arraycopy(sourceBuffer, rtpPacket.getHeaderLength(), destBuffer, 0, destBuffer.length);
				mediaReceiver.pushVideo(destBuffer, rtpPacket.getTimestamp(), codec.getCodecId());
			}
		} catch (Exception e) {
			log.error("", e);
		}
		rtpSocket.close();
	}
	
}
