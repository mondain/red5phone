package org.red5.codecs;


import org.red5.codecs.g729.Decoder;
import org.red5.codecs.g729.Encoder;


public class SIPCodecG729 implements SIPCodec {

    // Codec information
    private static final String codecName = "G729";

    private static String[] codecMediaAttributes = { "fmtp:18 annexb=no" };

    private static final int codecId = 18;

    private static int defaultEncodedFrameSize = 20;

    private static int defaultDecodedFrameSize = 160;

    private static int defaultSampleRate = 8000;

    private int outgoingPacketization = 0;

    private int incomingPacketization = 0;

    private Encoder encoder = new Encoder();
    
    private Decoder decoder = new Decoder();


    public SIPCodecG729() {

    }


    @Override
    public void encodeInit( int defaultEncodePacketization ) {
        
        if ( this.outgoingPacketization == 0 ) {
            
            this.outgoingPacketization = defaultEncodePacketization;
        }
    }


    @Override
    public void decodeInit( int defaultDecodePacketization ) {
        
        if ( this.incomingPacketization == 0 ) {
            
            this.incomingPacketization = defaultDecodePacketization;
        }
    }


    @Override
    public String codecNegotiateAttribute( String attributeName, String localAttributeValue, String remoteAttributeValue ) {

        // Not applicable for this codec type
        return null;
    }


    @Override
    public int getCodecBlankPacket( byte[] buffer, int offset ) {

        // TODO Auto-generated method stub
        return 0;
    }


    @Override
    public int codecToPcm( byte[] bufferIn, float[] bufferOut ) {

        decoder.decode( bufferIn, bufferOut );

        return bufferOut.length;
    }


    @Override
    public int pcmToCodec( float[] bufferIn, byte[] bufferOut ) {

        encoder.encode( bufferIn, bufferOut );

        return bufferOut.length;
    }


    @Override
    public int getIncomingEncodedFrameSize() {

        return ( defaultEncodedFrameSize / SIPCodec.DEFAULT_PACKETIZATION ) * incomingPacketization;
    }


    @Override
    public int getIncomingDecodedFrameSize() {

        return ( defaultDecodedFrameSize / SIPCodec.DEFAULT_PACKETIZATION ) * incomingPacketization;
    }


    @Override
    public int getOutgoingEncodedFrameSize() {

        return ( defaultEncodedFrameSize / SIPCodec.DEFAULT_PACKETIZATION ) * outgoingPacketization;
    }


    @Override
    public int getOutgoingDecodedFrameSize() {

        return ( defaultDecodedFrameSize / SIPCodec.DEFAULT_PACKETIZATION ) * outgoingPacketization;
    }


    @Override
    public int getIncomingPacketization() {

        return incomingPacketization;
    }


    @Override
    public int getOutgoingPacketization() {

        return outgoingPacketization;
    }


    @Override
    public void setLocalPtime( int localPtime ) {
        
        // Test for prior update during attributes negotiation.
        if ( this.incomingPacketization == 0 ) {
            
            incomingPacketization = localPtime;
        }
    }


    @Override
    public void setRemotePtime( int remotePtime ) {
        
        // Test for prior update during attributes negotiation.
        if ( this.outgoingPacketization == 0 ) {
            
            outgoingPacketization = remotePtime;
        }
    }


    @Override
    public int getSampleRate() {

        return defaultSampleRate;
    }


    @Override
    public String getCodecName() {

        return codecName;
    }


    @Override
    public int getCodecId() {

        return codecId;
    }


    @Override
    public String[] getCodecMediaAttributes() {

        return codecMediaAttributes;
    }
}
