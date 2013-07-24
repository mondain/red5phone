package org.red5.sip.app.net.rtp;

import static org.red5.sip.app.net.rtp.RTPStreamMultiplexingSender.NELLYMOSER_ENCODED_PACKET_SIZE;
import static org.red5.sip.app.BytesBuffer.READY;

import org.red5.codecs.asao.DecoderMap;
import org.red5.sip.app.BytesBuffer;
import org.red5.sip.app.IMediaStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RTPStreamForMultiplex implements IMediaStream {
	protected static Logger log = LoggerFactory.getLogger(RTPStreamForMultiplex.class);

	private int streamId;
	private boolean ready = false;
	protected DecoderMap decoderMap = null;
	private BytesBuffer buffer = new BytesBuffer(NELLYMOSER_ENCODED_PACKET_SIZE, 200) {
		@Override
		protected void onBufferOverflow() {
			super.onBufferOverflow();
			log.error("Stream %d buffer overflow. Buffer is cleared", getStreamId());
		}

		@Override
		protected void onBufferEmpty() {
			super.onBufferEmpty();
			ready = false;
			log.error("Stream %d buffer is empty.", getStreamId());
		}
	};

	protected RTPStreamForMultiplex(int streamId) {
		this.streamId = streamId;
	}

	public int getStreamId() {
		return streamId;
	}

	public void send(long timestamp, byte[] asaoBuffer, int offset, int num) {
		log.trace("Stream " + streamId + " send");
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
		return buffer.take(dst, offset);
	}

	@Override
	public void stop() {
		// nothing to do
	}
}
