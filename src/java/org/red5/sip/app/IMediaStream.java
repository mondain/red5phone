package org.red5.sip.app;

public interface IMediaStream {

    void send(long timestamp, byte[] asaoBuffer, int offset, int num);

}
