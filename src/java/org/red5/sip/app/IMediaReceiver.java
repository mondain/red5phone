package org.red5.sip.app;

import java.io.IOException;

public interface IMediaReceiver {

	void pushAudio(byte[] audio, long ts, int codec) throws IOException;

	void pushVideo(byte[] video, long ts) throws IOException;
	
	void setVideoReceivingEnabled(boolean enable);
	
	boolean isVideoReceivingEnabled();
	
	void setAudioSender(IMediaSender sender);
	
	void setVideoSender(IMediaSender sender);

}
