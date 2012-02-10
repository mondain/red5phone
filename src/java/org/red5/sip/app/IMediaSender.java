package org.red5.sip.app;

public interface IMediaSender {

    void send(int streamId, byte[] asaoBuffer, int offset, int num);

    void start();

    void halt();

}
