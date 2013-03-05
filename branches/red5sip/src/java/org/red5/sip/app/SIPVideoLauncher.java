package org.red5.sip.app;

import java.net.DatagramSocket;

import org.red5.codecs.SIPCodec;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import local.ua.MediaLauncher;

public class SIPVideoLauncher implements MediaLauncher {

	protected static Logger log = LoggerFactory.getLogger(SIPVideoLauncher.class);
	protected DatagramSocket socket;
	protected RTPStreamVideoReceiver receiver;
	protected RTPStreamVideoSender sender;
	
	public SIPVideoLauncher(int localPort, String remoteAddr, int remotePort, IMediaReceiver mediaReceiver, SIPCodec codec) {
		try {
			socket = new DatagramSocket(localPort);
			receiver = new RTPStreamVideoReceiver(mediaReceiver, socket, codec);
			sender = new RTPStreamVideoSender(mediaReceiver, codec, socket, remoteAddr, remotePort);
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
