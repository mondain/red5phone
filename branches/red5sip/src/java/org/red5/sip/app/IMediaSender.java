package org.red5.sip.app;

public interface IMediaSender {

    IMediaStream createStream(int streamId);

    void deleteStream(int streamId);

    void start();

    void halt();

}
