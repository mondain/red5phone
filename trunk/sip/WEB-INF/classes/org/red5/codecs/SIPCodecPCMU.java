package org.red5.codecs;

import java.util.Arrays;

import local.media.G711;


public class SIPCodecPCMU implements SIPCodec {

    // Codec information
    private static final String codecName = "PCMU";
    
    private static final int codecId = 0;

    private static int defaultEncodedFrameSize = 160;

    private static int defaultDecodedFrameSize = 160;
        
    private static int defaultSampleRate = 8000;

    private int outgoingPacketization = 0;

    private int incomingPacketization = 0;


    public SIPCodecPCMU() {

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

        Arrays.fill( buffer, offset, offset + getOutgoingEncodedFrameSize(), (byte)G711.linear2ulaw(0));
        
        return getOutgoingEncodedFrameSize();
    }


    @Override
    public int codecToPcm( byte[] bufferIn, float[] bufferOut ) {

        if ( bufferIn.length > 0 ) {
            for ( int i = 0; i < bufferIn.length; i++ ) {
                bufferOut[ i ] = (float) G711.ulaw2linear( (int) bufferIn[ i ] );
            }
            
            return bufferOut.length;
        }
        else {
            return 0;
        }  
    }


    @Override
    public int pcmToCodec( float[] bufferIn, byte[] bufferOut ) {

        if ( bufferIn.length > 0 ) {
            for ( int i = 0; i < bufferIn.length; i++ ) {
                bufferOut[ i ] = (byte) G711.linear2ulaw( (int) bufferIn[ i ] );
            }
            
            return bufferOut.length;
        }
        else {
            return 0;
        }        
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

        // TODO Auto-generated method stub
        return null;
    }
}
