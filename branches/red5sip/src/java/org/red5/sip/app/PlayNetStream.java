package org.red5.sip.app;

import org.apache.mina.core.buffer.IoBuffer;
import org.red5.server.api.event.IEvent;
import org.red5.server.api.event.IEventDispatcher;
import org.red5.server.net.rtmp.event.AudioData;
import org.red5.server.net.rtmp.event.IRTMPEvent;
import org.red5.server.net.rtmp.event.SerializeUtils;
import org.red5.server.net.rtmp.event.VideoData;
import org.red5.server.stream.AbstractClientStream;
import org.red5.server.stream.IStreamData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PlayNetStream extends AbstractClientStream implements IEventDispatcher {
	private static Logger logger = LoggerFactory.getLogger(PlayNetStream.class);

	private int audioTs = 0;

	private IMediaSender mediaSender;

	private IMediaStream mediaStream;

	public PlayNetStream(IMediaSender mediaSender) {
		this.mediaSender = mediaSender;
	}

	public void close() {
		if (mediaSender != null) {
			mediaSender.deleteStream(getStreamId());
		}
	}

	public void start() {
		if (mediaSender != null) {
			mediaStream = mediaSender.createStream(getStreamId());
		}
	}

	public void stop() {
		if (mediaSender != null) {
			mediaSender.deleteStream(getStreamId());
		}
	}

	public void dispatchEvent(IEvent event) {

		if (!(event instanceof IRTMPEvent)) {
			logger.debug("skipping non rtmp event: " + event);
			return;
		}

		IRTMPEvent rtmpEvent = (IRTMPEvent) event;

		if (!(rtmpEvent instanceof IStreamData)) {
			logger.debug("skipping non stream data");
			return;
		}

		if (rtmpEvent.getHeader().getSize() == 0) {
			logger.debug("skipping event where size == 0");
			return;
		}

		if (rtmpEvent instanceof VideoData) {
			// videoTs += rtmpEvent.getTimestamp();
			// tag.setTimestamp(videoTs);

		} else if (rtmpEvent instanceof AudioData) {
			audioTs = rtmpEvent.getTimestamp();

			IoBuffer audioData = ((AudioData) rtmpEvent).getData().asReadOnlyBuffer();
			byte[] data = SerializeUtils.ByteBufferToByteArray(audioData);

			try {
				if (mediaStream != null) {
					mediaStream.send(audioTs, data, 1, data.length - 1);
				}
			} catch (Exception e) {
				logger.error("PlayNetStream dispatchEvent exception ", e);
			}
		}
	}
}