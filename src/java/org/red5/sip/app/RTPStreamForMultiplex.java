package org.red5.sip.app;

import static org.red5.sip.app.RTPStreamMultiplexingSender.NELLYMOSER_ENCODED_PACKET_SIZE;

import org.red5.codecs.asao.DecoderMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RTPStreamForMultiplex implements IMediaStream {
	protected static Logger log = LoggerFactory.getLogger(RTPStreamForMultiplex.class);
	private static final float READY = .2f;
	private int streamId;
	private boolean ready = false;
	protected DecoderMap decoderMap = null;
	private BytesBuffer buffer = new BytesBuffer(NELLYMOSER_ENCODED_PACKET_SIZE, 200) {
		@Override
		protected void onBufferOverflow() {
			super.onBufferOverflow();
			log.error("Stream {} buffer overflow. Buffer was cleared", streamId);
		}

		@Override
		protected void onBufferEmpty() {
			super.onBufferEmpty();
			ready = false;
			log.error("Stream {} buffer empty.", streamId);
		}
	};

	protected RTPStreamForMultiplex(int streamId) {
		this.streamId = streamId;
	}

	public int getStreamId() {
		return streamId;
	}

	public void send(long timestamp, byte[] asaoBuffer, int offset, int num) {
		log.trace("Stream {} send:: num: {} ready {}", streamId, num, ready);
		for (int i = 0; i < num; i += NELLYMOSER_ENCODED_PACKET_SIZE) {
			synchronized (this) {
				buffer.push(asaoBuffer, offset + i, NELLYMOSER_ENCODED_PACKET_SIZE);
			}
			Thread.yield();
		}
		synchronized (this) {
			if (!ready && buffer.bufferUsage() > READY) {
				ready = true;
			}
		}
	}

	protected synchronized boolean ready() {
		return ready;
	}

	protected synchronized float bufferUsage() {
		return buffer.bufferUsage();
	}

	protected synchronized int read(byte[] dst, int offset) {
		int read = buffer.take(dst, offset);
		ready = buffer.bufferUsage() > READY;
		log.trace("Stream {} read:: ready: {} read {}", streamId, ready, read);
		return read;
	}

	@Override
	public void stop() {
		// nothing to do
	}
}
