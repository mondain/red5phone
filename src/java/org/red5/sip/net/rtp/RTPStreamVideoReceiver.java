package org.red5.sip.net.rtp;

import java.net.DatagramSocket;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

import local.net.RtpPacket;
import local.net.RtpSocket;

import org.red5.codecs.SIPCodec;
import org.red5.sip.app.IMediaReceiver;
import org.red5.sip.app.SIPTransport;
import org.red5.sip.app.SIPVideoConverter;
import org.red5.sip.app.SIPVideoConverter.RTMPPacketInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RTPStreamVideoReceiver extends Thread {
	protected static Logger log = LoggerFactory.getLogger(RTPStreamVideoReceiver.class);
	protected RtpSocket rtpSocket;
	protected IMediaReceiver mediaReceiver;
	protected SIPCodec codec;
	private boolean running;
	private ConverterThread converterThread;
	private SIPTransport sipTransport;
	private DatagramSocket socket;

	public RTPStreamVideoReceiver(SIPTransport sipTransport, IMediaReceiver mediaReceiver, SIPCodec codec,
			DatagramSocket socket) {
		log.debug("... constructor !!!");
		this.mediaReceiver = mediaReceiver;
		this.socket = socket;
		this.codec = codec;
		this.sipTransport = sipTransport;
	}

	@Override
	public void interrupt() {
		running = false;
		converterThread.interrupt();
		rtpSocket.close();
	}

	@Override
	public void run() {
		running = true;
		rtpSocket = new RtpSocket(socket);
		converterThread = new ConverterThread(sipTransport);
		converterThread.start();
		try {
			while (running) {
				RtpPacket rtpPacket = new RtpPacket(new byte[codec.getIncomingDecodedFrameSize()], 0);
				rtpSocket.receive(rtpPacket);
				converterThread.addPacket(rtpPacket);
			}
		} catch (Exception e) {
			log.error("Unexpected exception while running, shutting down", e);
			interrupt();
		}
	}

	private class ConverterThread extends Thread {
		private final Queue<RtpPacket> packetQueue;
		private boolean running;
		private SIPVideoConverter converter;

		public ConverterThread(SIPTransport sipTransport) {
			log.debug("... ConverterThread constructor !!!");
			packetQueue = new ConcurrentLinkedQueue<RtpPacket>();
			converter = new SIPVideoConverter(sipTransport);
		}

		public void addPacket(RtpPacket packet) {
			if (!running) {
				return;
			}
			packetQueue.add(packet);
		}

		@Override
		public void run() {
			running = true;
			while (running) {
				try {
					if (sipTransport.getSipUsersCount() > 0) {
						RtpPacket packet = packetQueue.poll();
						if (packet != null) {
							mediaReceiver.setVideoReceivingEnabled(true);
							for (RTMPPacketInfo packetInfo : converter.rtp2rtmp(packet, codec)) {
								mediaReceiver.pushVideo(packetInfo.data, packetInfo.ts);
							}
						}
					} else {
						mediaReceiver.setVideoReceivingEnabled(false);
						packetQueue.clear();
					}
					if (packetQueue.size() == 0) {
						Thread.sleep(50);
					}
				} catch (Exception e) {
					log.error("", e);
				}
			}
		}

		@Override
		public void interrupt() {
			running = false;
			packetQueue.clear();
		}
	}
}
