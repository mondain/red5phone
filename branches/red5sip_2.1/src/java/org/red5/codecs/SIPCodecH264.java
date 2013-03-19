package org.red5.codecs;

public class SIPCodecH264 implements SIPCodec {

	private static final String codecName = "H264";
	private static final int codecId = 35;
	private static int defaultEncodedFrameSize = 160;
    private static int defaultDecodedFrameSize = 160;
	private int outgoingPacketization = 90000;
    private int incomingPacketization = 90000;
	
	@Override
	public void encodeInit(int defaultEncodePacketization) {
		if (this.outgoingPacketization == 0) {        
            this.outgoingPacketization = defaultEncodePacketization;
        }
	}

	@Override
	public void decodeInit(int defaultDecodePacketization) {
		if (this.incomingPacketization == 0) {
            this.incomingPacketization = defaultDecodePacketization;
        }
	}

	@Override
	public String codecNegotiateAttribute(String attributeName,
			String localAttributeValue, String remoteAttributeValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getCodecBlankPacket(byte[] buffer, int offset) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int pcmToCodec(float[] bufferIn, byte[] bufferOut) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int codecToPcm(byte[] bufferIn, float[] bufferOut) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getIncomingEncodedFrameSize() {
		return (defaultEncodedFrameSize / SIPCodec.DEFAULT_PACKETIZATION) * incomingPacketization;
	}

	@Override
	public int getIncomingDecodedFrameSize() {
		return (defaultDecodedFrameSize / SIPCodec.DEFAULT_PACKETIZATION) * incomingPacketization;
	}

	@Override
	public int getOutgoingEncodedFrameSize() {
		return (defaultEncodedFrameSize / SIPCodec.DEFAULT_PACKETIZATION) * outgoingPacketization;
	}

	@Override
	public int getOutgoingDecodedFrameSize() {
		return (defaultDecodedFrameSize / SIPCodec.DEFAULT_PACKETIZATION) * outgoingPacketization;
	}

	@Override
	public int getSampleRate() {
		return 90000;
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
	public int getIncomingPacketization() {
		return (defaultEncodedFrameSize / SIPCodec.DEFAULT_PACKETIZATION) * incomingPacketization;
	}

	@Override
	public int getOutgoingPacketization() {
		return 2048;//( defaultDecodedFrameSize / SIPCodec.DEFAULT_PACKETIZATION ) * outgoingPacketization;
	}

	@Override
	public void setLocalPtime(int localPtime) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setRemotePtime(int remotePtime) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String[] getCodecMediaAttributes() {
		// TODO Auto-generated method stub
		return null;
	}

}
