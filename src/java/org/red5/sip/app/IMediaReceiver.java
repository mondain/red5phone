package org.red5.sip.app;

import java.io.IOException;

public interface IMediaReceiver {

	void pushAudio(byte[] audio, long ts, int codec) throws IOException;

	void setSender(IMediaSender sender);

}
