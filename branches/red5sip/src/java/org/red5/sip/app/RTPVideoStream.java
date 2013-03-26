package org.red5.sip.app;

import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.red5.codecs.SIPCodec;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import local.net.RtpPacket;

public class RTPVideoStream implements IMediaStream {

	private static Logger log = LoggerFactory.getLogger(RTPVideoStream.class);
	private RTPStreamVideoSender sender;
	private SIPVideoConverter converter;
	private SIPCodec codec;
	private boolean running;
	private ConverterThread converterThread;
	private int kv = 0;
	
	public RTPVideoStream(SIPTransport sipTransport, RTPStreamVideoSender sender, SIPCodec codec) {
		this.sender = sender;
		this.codec = codec;
		converter = new SIPVideoConverter(sipTransport);
		converterThread = new ConverterThread();
		converterThread.start();
		running = true;
	}
	
	@Override
	public void send(long timestamp, byte[] data, int offset, int num) {
		if (!running) {
			throw new IllegalStateException("Steam is not started");
		}
		converterThread.addData(data, timestamp);
	}

	@Override
	public void stop() {
		running = false;
	}
	
	public SIPVideoConverter getConverter() {
		return converter;
	}

	private class ConverterThread extends Thread {

		private Queue<QueueItem> queue;
		
		public ConverterThread() {
			queue = new ConcurrentLinkedQueue<QueueItem>();
		}
		
		public void addData(byte[] data, long ts) {
			queue.add(new QueueItem(ts, data));
		}
		
		@Override
		public void run() {
			while (running) {
				try {
					QueueItem item = queue.poll();
					if (item != null) {
						if (log.isDebugEnabled() && ++kv % 10 == 0) {
							log.debug("+++ Video - ts = {}, length = {}", item.ts, item.data.length);
						}
						for (RtpPacket packet: converter.rtmp2rtp(item.data, item.ts, codec)) {
							sender.send(packet);
						}
					}
					
					if (queue.size() == 0) {
						Thread.sleep(50);
					}
				} catch (Exception e) {
					log.error("", e);
				}
			}
		}
		
		private class QueueItem {
			
			public final long ts;
			public final byte[] data;
			
			public QueueItem(long ts, byte[] data) {
				super();
				this.ts = ts;
				this.data = data;
			}
			
		}
		
	}
	
}
