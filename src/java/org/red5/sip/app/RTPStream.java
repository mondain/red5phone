package org.red5.sip.app;

import local.net.RtpPacket;

import org.red5.codecs.asao.ByteStream;
import org.red5.logging.Red5LoggerFactory;
import org.slf4j.Logger;

public class RTPStream implements IMediaStream {

    protected static Logger log = Red5LoggerFactory.getLogger(RTPStream.class, "sip");

    private int streamId;
    private RTPStreamSender sender;
    private long syncSource;
    private long timestamp;

    /** Sip codec to be used on audio session */
    private byte[] packetBuffer;
    private RtpPacket rtpPacket;

    // Temporary buffer with received PCM audio from FlashPlayer.
    float[] tempBuffer;
    // Floats remaining on temporary buffer.
    int tempBufferRemaining = 0;
    // Encoding buffer used to encode to final codec format;
    float[] encodingBuffer;
    // Offset of encoding buffer.
    int encodingOffset = 0;
    // Indicates whether the current asao buffer was processed.
    boolean asao_buffer_processed = false;

    public RTPStream(int streamId, long syncSource, RTPStreamSender sender) {
        this.streamId = streamId;
        this.syncSource = syncSource;
        this.sender = sender;
        this.packetBuffer = new byte[ sender.sipCodec.getOutgoingEncodedFrameSize() + RTPStreamSender.RTP_HEADER_SIZE ];
        this.rtpPacket = new RtpPacket( this.packetBuffer, 0 );
        this.rtpPacket.setPayloadType( sender.sipCodec.getCodecId() );
        this.tempBuffer = new float[ RTPStreamSender.NELLYMOSER_DECODED_PACKET_SIZE ];
        this.encodingBuffer = new float[ sender.sipCodec.getOutgoingDecodedFrameSize() ];
    }

    public void send(long timestamp, byte[] asaoBuffer, int offset, int num) {
        if(RTPStreamSender.useASAO) {
            sendASAO(asaoBuffer, offset, num);
        } else {
            sendRaw(asaoBuffer, offset, num);
        }
    }

    public void sendRaw(byte[] asaoInput, int offset, int num ) {
        System.arraycopy(asaoInput, offset, packetBuffer, RTPStreamSender.RTP_HEADER_SIZE, num);
        rtpPacket.setSscr(syncSource);
        rtpPacket.setTimestamp( timestamp );
        rtpPacket.setPayloadLength( sender.sipCodec.getOutgoingEncodedFrameSize() );
        sender.send(rtpPacket);
    }

    public void sendASAO(byte[] asaoBuffer, int offset, int num) {
        asao_buffer_processed = false;

        if ( num > 0 ) {
            do {
                int encodedBytes = fillRtpPacketBuffer( asaoBuffer );
                if ( encodedBytes == 0 ) {
                    break;
                }
                if ( encodingOffset == sender.sipCodec.getOutgoingDecodedFrameSize() ) {
                    try {
                        rtpPacket.setSscr(syncSource);
                        rtpPacket.setTimestamp(timestamp);
                        rtpPacket.setPayloadLength(sender.sipCodec.getOutgoingEncodedFrameSize());
                        sender.send(rtpPacket);
                        timestamp += sender.sipCodec.getOutgoingPacketization();
                    }
                    catch ( Exception e ) {
                        log.error( "sendASAO: " + sender.sipCodec.getCodecName() + " encoder error.", e );
                    }
                    encodingOffset = 0;
                }
            }
            while ( !asao_buffer_processed );
        }
    }

    /** Fill the buffer of RtpPacket with necessary data. */
    private int fillRtpPacketBuffer(byte[] asaoBuffer) {

        boolean isBufferFilled = false;
        int copyingSize = 0;
        int finalCopySize = 0;
        byte[] codedBuffer = new byte[ sender.sipCodec.getOutgoingEncodedFrameSize() ];

        try {
            if ( ( tempBufferRemaining + encodingOffset ) >= sender.sipCodec.getOutgoingDecodedFrameSize() ) {

                copyingSize = encodingBuffer.length - encodingOffset;

                BufferUtils.floatBufferIndexedCopy(
                        encodingBuffer,
                        encodingOffset,
                        tempBuffer,
                        tempBuffer.length - tempBufferRemaining,
                        copyingSize );

                encodingOffset = sender.sipCodec.getOutgoingDecodedFrameSize();
                tempBufferRemaining -= copyingSize;
                finalCopySize = sender.sipCodec.getOutgoingDecodedFrameSize();

                //println( "fillRtpPacketBuffer", "Simple copy of " + copyingSize + " bytes." );
            }
            else {
                if ( tempBufferRemaining > 0 ) {
                    BufferUtils.floatBufferIndexedCopy(
                            encodingBuffer,
                            encodingOffset,
                            tempBuffer,
                            tempBuffer.length - tempBufferRemaining,
                            tempBufferRemaining );

                    encodingOffset += tempBufferRemaining;
                    finalCopySize += tempBufferRemaining;
                    tempBufferRemaining = 0;
                }

                // Decode new asao packet.

                asao_buffer_processed = true;

                ByteStream audioStream = new ByteStream( asaoBuffer, 1, RTPStreamSender.NELLYMOSER_ENCODED_PACKET_SIZE );

                sender.decoderMap = sender.decoder.decode( sender.decoderMap, audioStream.bytes, 1, tempBuffer, 0 );

                tempBufferRemaining = tempBuffer.length;

                if ( ( encodingOffset + tempBufferRemaining ) > sender.sipCodec.getOutgoingDecodedFrameSize() ) {
                    copyingSize = encodingBuffer.length - encodingOffset;
                }
                else {
                    copyingSize = tempBufferRemaining;
                }

                BufferUtils.floatBufferIndexedCopy(
                        encodingBuffer,
                        encodingOffset,
                        tempBuffer,
                        0,
                        copyingSize );

                encodingOffset += copyingSize;
                tempBufferRemaining -= copyingSize;
                finalCopySize += copyingSize;
            }

            if (encodingOffset == encodingBuffer.length)
            {
                isBufferFilled = true;
                int encodedBytes = sender.sipCodec.pcmToCodec( encodingBuffer, codedBuffer );
                if ( encodedBytes == sender.sipCodec.getOutgoingEncodedFrameSize() ) {
                    BufferUtils.byteBufferIndexedCopy( packetBuffer,
                            RTPStreamSender.RTP_HEADER_SIZE, codedBuffer, 0, codedBuffer.length );
                }
            }
        }
        catch ( Exception e ) {
            e.printStackTrace();
        }

        return finalCopySize;
    }
}
