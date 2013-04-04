package org.red5.sip.app;

import java.net.DatagramSocket;

import local.ua.MediaLauncher;

import org.red5.codecs.SIPCodec;
import org.red5.sip.net.rtp.RTPStreamVideoReceiver;
import org.red5.sip.net.rtp.RTPStreamVideoSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SIPVideoLauncher implements MediaLauncher {

	protected static Logger log = LoggerFactory.getLogger(SIPVideoLauncher.class);
	protected DatagramSocket socket;
	protected RTPStreamVideoReceiver receiver;
	protected RTPStreamVideoSender sender;

	public SIPVideoLauncher(int localPort, String remoteAddr, int remotePort, SIPTransport sipTransport,
			IMediaReceiver mediaReceiver, SIPCodec codec) {
		try {
			socket = new DatagramSocket(localPort);
			receiver = new RTPStreamVideoReceiver(sipTransport, mediaReceiver, codec, socket);
			sender = new RTPStreamVideoSender(sipTransport, mediaReceiver, codec, socket, remoteAddr, remotePort);
			mediaReceiver.setVideoSender(sender);
		} catch (Exception e) {
			log.error("", e);
		}
	}

	@Override
	public boolean startMedia() {
		log.debug("startMedia()");
		receiver.start();
		sender.start();
		return true;
	}

	@Override
	public boolean stopMedia() {
		log.debug("stopMedia()");
		receiver.interrupt();
		sender.halt();
		socket.close();
		return false;
	}

}
