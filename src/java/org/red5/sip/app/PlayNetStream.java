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

	private IMediaSender audioSender;

	private IMediaStream audioStream;
	
	private IMediaSender videoSender;

	private IMediaStream videoStream;

	public PlayNetStream(IMediaSender audioSender, IMediaSender videoSender) {
		this.audioSender = audioSender;
		this.videoSender = videoSender;
	}

	public void close() {
		if (audioSender != null) {
			audioSender.deleteStream(getStreamId());
		}
		if (videoSender != null) {
			videoSender.deleteStream(getStreamId());
		}
	}

	public void start() {
		if (audioSender != null) {
			audioStream = audioSender.createStream(getStreamId());
		}
		if (videoSender != null) {
			videoStream = videoSender.createStream(getStreamId());
		}
	}

	public void stop() {
		if (audioSender != null) {
			audioSender.deleteStream(getStreamId());
		}
		if (videoSender != null) {
			videoSender.deleteStream(getStreamId());
		}
	}

	private long sipStream = -1;
	
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
			if (sipStream == -1)
				sipStream = rtmpEvent.getHeader().getStreamId();
			if (rtmpEvent.getHeader().getStreamId() != sipStream) return;
			
			int videoTs = rtmpEvent.getTimestamp();
			IoBuffer videoData = ((VideoData) rtmpEvent).getData().asReadOnlyBuffer();
			videoData.reset();
			byte[] data = SerializeUtils.ByteBufferToByteArray(videoData);
			
			try {
				if (videoStream != null) {
					videoStream.send(videoTs, data, 0, data.length);
				}
			} catch (Exception e) {
				logger.error("PlayNetStream dispatchEvent exception ", e);
			}
		} else if (rtmpEvent instanceof AudioData) {
			audioTs = rtmpEvent.getTimestamp();

			IoBuffer audioData = ((AudioData) rtmpEvent).getData().asReadOnlyBuffer();
			byte[] data = SerializeUtils.ByteBufferToByteArray(audioData);

			try {
				if (audioStream != null) {
					audioStream.send(audioTs, data, 1, data.length - 1);
				}
			} catch (Exception e) {
				logger.error("PlayNetStream dispatchEvent exception ", e);
			}
		}
	}
}