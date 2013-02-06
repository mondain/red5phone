package org.red5.sip.app;

import org.red5.logging.Red5LoggerFactory;
import org.slf4j.Logger;

public class RTPStreamForMultiplex implements IMediaStream {
    protected static Logger log = Red5LoggerFactory.getLogger(RTPStreamForMultiplex.class, "sip");

    private int streamId;
    private RTPStreamMultiplexingSender sender;
    private long syncSource;
    private static int BUFFERS_COUNT = 1024;
    private byte[][] buffer = new byte[BUFFERS_COUNT][65];
    private int[] bufLen = new int[BUFFERS_COUNT];
    private int start, end;
    private boolean ready = false;

    protected RTPStreamForMultiplex(int streamId, long syncSource, RTPStreamMultiplexingSender sender) {
        this.streamId = streamId;
        this.sender = sender;
        this.syncSource = syncSource;
        end = 0;
        start = -1;
    }

    public int getStreamId() {
        return streamId;
    }

    public synchronized void send(long timestamp, byte[] asaoBuffer, int offset, int num) {
        if(end == start) {
            log.error("Stream buffer overflow: streamId: " + streamId + ", start: " + start + ", end: " + end);
            return;
        }
        System.arraycopy(asaoBuffer, 0, buffer[end], 0, asaoBuffer.length);
        bufLen[end++] = num;
        if(end == BUFFERS_COUNT) {
            end = 0;
        }
        if(start == -1) {
            start = 0;
        }

        if(!ready && available() > 10) {
            ready = true;
        }
    }

    protected synchronized int available() {
        return (end > start) ? (end - start) : (BUFFERS_COUNT - start + end);
    }

    protected synchronized boolean ready() {
        return ready;
    }

    protected synchronized int read(byte[] dst, int offset) {
        int res = -1;
        if(start >= 0) {
            System.arraycopy(buffer[start], 0, dst, offset, dst.length);
            res = start++;
            if(start == BUFFERS_COUNT) {
                start = 0;
            }
            if(start == end) {
                start = -1;
                end = 0;
                ready = false;
            }
        }
        return res;
    }
}
