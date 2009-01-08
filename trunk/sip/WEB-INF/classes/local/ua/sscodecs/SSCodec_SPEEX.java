/*
 * Copyright (C) 2008 Greg Dorfuss - mhspot.com
 *
 * This source code is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This source code is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this source code; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 * Based on mjsip 1.6 software and skype4java
 *
 * uses JSpeex
 *
 * Author(s):
 * Greg Dorfuss
 */

package local.ua.sscodecs;

import org.xiph.speex.SpeexEncoder;
import org.xiph.speex.SpeexDecoder;

public class SSCodec_SPEEX implements SSCodec
{
	private int sample_rate=16000;
	private int speexMode=1; //0=narrowband,1=wideband,2=ultrawideband
	private int sample_size=1;
	private int speexChannels=1;
	private int frame_size=0;
	private double encodeGain=0;
	private double decodeGain=0;
	private int pcmFrameSize;

	//encoder vars
	private SpeexEncoder encoder=new SpeexEncoder();
	private int speexQuality=10; // 0-10

	//decoder vars
	private SpeexDecoder decoder=new SpeexDecoder();
	private boolean speexEnhanced=false;

	public void init(int frame_size, double argEncodeGain, double argDecodeGain)
    {
		this.frame_size=frame_size;
		this.pcmFrameSize=frame_size;
    	this.encodeGain=argEncodeGain;
		this.decodeGain=argDecodeGain;

		encoder.init(speexMode, speexQuality,sample_rate,speexChannels);

		//encoder.getEncoder().setComplexity(2); // (0-10 from least complex to most complex)
		//encoder.getEncoder().setVbrQuality(4);
		//encoder.getEncoder().setVbr(false);
		//encoder.getEncoder().setAbr(0);
		//encoder.getEncoder().setVad(false);
		//encoder.getEncoder().setDtx(false);

		decoder.init(speexMode,sample_rate,speexChannels,speexEnhanced);
    }

    public int PcmToCodec(byte[] inpcm,int len,byte[] outSpeex,int offset)
    {
      	try
      	{
			encoder.processData(inpcm, offset, len);
      	}
      	catch(Exception e)
      	{
      		return 0;
      	}

        return encoder.getProcessedData(outSpeex, 0);

    }

    public int CodecToPcm(byte[] speexBuf,int offset,int len,byte[] outpcm)
    {
      	try
      	{
      		decoder.processData(speexBuf,offset,len);
      	}
      	catch(Exception e)
      	{
      		return 0;
      	}

    	return decoder.getProcessedData(outpcm, 0);
    }
}
