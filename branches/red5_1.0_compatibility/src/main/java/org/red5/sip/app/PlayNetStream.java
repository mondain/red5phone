package org.red5.sip.app;

import org.apache.mina.core.buffer.IoBuffer;
import org.red5.logging.Red5LoggerFactory;
import org.red5.server.api.event.IEvent;
import org.red5.server.api.event.IEventDispatcher;
import org.red5.server.net.rtmp.event.AudioData;
import org.red5.server.net.rtmp.event.IRTMPEvent;
import org.red5.server.net.rtmp.event.SerializeUtils;
import org.red5.server.net.rtmp.event.VideoData;
import org.red5.server.stream.AbstractClientStream;
import org.red5.server.stream.IStreamData;
import org.red5.sip.IMediaSender;
import org.red5.sip.net.rtp.RTPStreamMultiplexingSender;
import org.slf4j.Logger;

public class PlayNetStream extends AbstractClientStream implements IEventDispatcher {

    private static Logger logger = Red5LoggerFactory.getLogger(PlayNetStream.class, "sip");

    private int audioTs = 0;

    private int kt = 0;

    private int kt2 = 0;

    private IMediaSender mediaSender;

    public PlayNetStream(IMediaSender mediaSender) {
        this.mediaSender = mediaSender;
        if(mediaSender instanceof RTPStreamMultiplexingSender) {
            ((RTPStreamMultiplexingSender) mediaSender).streamAdded();
        }
    }



    public void close() {

    }


    public void start() {

    }

    public void stop() {

    }

    public void dispatchEvent(IEvent event) {

        if (!(event instanceof IRTMPEvent)) {
            logger.debug("skipping non rtmp event: " + event);
            return;
        }

        IRTMPEvent rtmpEvent = (IRTMPEvent) event;

        if (logger.isDebugEnabled()) {
            // logger.debug("rtmp event: " + rtmpEvent.getHeader() + ", " +
            // rtmpEvent.getClass().getSimpleName());
        }

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
            audioTs += rtmpEvent.getTimestamp();

            IoBuffer audioData = ((IStreamData) rtmpEvent).getData().asReadOnlyBuffer();
            byte[] data = SerializeUtils.ByteBufferToByteArray(audioData);

            //System.out.println( "RTMPUser.dispatchEvent() - AudioData -> length = " + data.length + ".");

            kt2++;

            if (kt2 < 10) {
                logger.debug("*** " + data.length);
                System.out.println("*** " + data.length);
            }

            try {
                if (mediaSender != null) {
                    mediaSender.send(getStreamId(), data, 1, data.length - 1);
                }
            } catch (Exception e) {
                System.out.println("PlayNetStream dispatchEvent exception " + e);
            }

        }
    }
}