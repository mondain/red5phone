package org.red5.sip.app;

import org.red5.codecs.SIPCodec;

import local.net.RtpPacket;

public class RTPVideoStream implements IMediaStream {

	private RTPStreamVideoSender sender;
	private SIPVideoConverter converter;
	private SIPCodec codec;
	
	public RTPVideoStream(RTPStreamVideoSender sender, SIPCodec codec) {
		this.sender = sender;
		this.codec = codec;
		converter = new SIPVideoConverter();
	}
	
	@Override
	public void send(long timestamp, byte[] data, int offset, int num) {
		for (RtpPacket packet: converter.rtmp2rtp(data, timestamp, codec)) {
			sender.send(packet);
		}
	}

}
