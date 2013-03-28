package org.red5.sip.net.rtp;

import java.net.DatagramSocket;
import java.net.InetAddress;

import org.red5.codecs.SIPCodec;
import org.red5.sip.app.IMediaReceiver;
import org.red5.sip.app.IMediaSender;
import org.red5.sip.app.IMediaStream;
import org.red5.sip.app.SIPTransport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import local.net.RtpPacket;
import local.net.RtpSocket;

public class RTPStreamVideoSender implements IMediaSender {

	private static Logger log = LoggerFactory.getLogger(RTPStreamVideoSender.class);
	private SIPCodec codec;
	private SIPTransport sipTransport;
	private RtpSocket rtpSocket;
	private int seqn = 0;
	
	public RTPStreamVideoSender(SIPTransport sipTransport, IMediaReceiver mediaReceiver, SIPCodec codec, 
			DatagramSocket srcSocket, String destAddr, int destPort) {
		this.codec = codec;
		this.sipTransport = sipTransport;
		mediaReceiver.setVideoSender(this);
		
		try {
			rtpSocket = new RtpSocket(srcSocket, InetAddress.getByName(destAddr), destPort);
		} catch (Exception e) {
			log.error("", e);
		}
	}
	
	@Override
	public IMediaStream createStream(int streamId) {
		return new RTPVideoStream(sipTransport, this, codec);
	}

	@Override
	public void deleteStream(int streamId) {}

	@Override
	public void start() {
		seqn = 0;
	}

	@Override
	public void halt() {
		rtpSocket.close();
		rtpSocket = null;
	}
	
	public void send(RtpPacket packet) {
		if (rtpSocket == null) {
			return;
		}
		packet.setSequenceNumber(seqn++);
		rtpSocketSend(packet);
	}
	
	private synchronized void rtpSocketSend(RtpPacket rtpPacket) {
		try {
			rtpSocket.send(rtpPacket);
		} catch (Exception e) {
			log.error("", e);
		}
	}

}
