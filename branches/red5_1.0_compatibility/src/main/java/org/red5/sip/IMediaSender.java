package org.red5.sip;

public interface IMediaSender {

    void send(int streamId, byte[] asaoBuffer, int offset, int num);

    void start();

    void halt();

	void queueSipDtmfDigits(String digits);

}
