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
 * Author(s):
 * Greg Dorfuss
 */

package local.ua.sscodecs;

import java.util.Arrays;

import local.media.G711;

public class SSCodec_PCMA implements SSCodec
{
	private String codecName="PCMA";
	private int payLoadType=8;
	private int sample_rate=8000;  
	private int sample_size=1;
	private int frame_size=0;
	private int pcmFrameSize;
	private double encodeGain=0;
	private double decodeGain=0;

	
	// encoder globals
	private int encCurSample1;
	private int encCurSample2;
	private int encInterpol;
	private int outulawpos=0;
	private int encR=0;
	
	// decode globals
	private int outpcmpos=0;
	private int pcmout;
	private int decInterpol;
	private int lastPcmSample=0;
	private int decR=0;
	
    private static byte[] alawEncodeTable=null;
    private static short[] alawDecodeTable=null;

    public void init(int frame_size,double argEncodeGain,double argDecodeGain)
    {
		this.frame_size=frame_size;
		this.pcmFrameSize=frame_size*4;
		this.encodeGain=argEncodeGain;
		this.decodeGain=argDecodeGain;

		alawEncodeTable=getAlawEncodeTable(encodeGain);
		alawDecodeTable=getAlawDecodeTable(decodeGain);
    }
    
    public SSCodecInfo getCodecInfo()
    {
    	return new SSCodecInfo(this.getClass().getSimpleName().replaceAll("^[^_]+_", ""),this.codecName,this.frame_size,this.encodeGain,this.decodeGain);
    }


    public int[] getValidFrameSizes()
    {
    	return new int[]{160,240,320};
    }
    
	public int getFrameSize()
	{
	   return frame_size;	
	}
	
	public int getSampleRate()
	{
	   return sample_rate;	
	}
	
	public void setSampleRate(int rate)
	{
		sample_rate=rate;
	}
	
	public void setPayloadType(int type)
	{
		payLoadType=type;
	}

	public int getPcmFrameSize()
	{
		   return pcmFrameSize;	
	}

	public int getPayloadType()
	{
		return payLoadType;
	}
	public String getCodecName()
	{
		return codecName;
	}


    public int PcmToCodec(byte[] inpcm,int len,byte[] outulaw,int offset)
    {
    	outulawpos=offset;
    	for (encR=0;encR<len;encR+=4) //	need to downsample - 2 samples each loop
		{
			// interpolate 2 samples - sounds better than just dropping a sample
			
    		encCurSample1= inpcm[encR + 1] << 8 | inpcm[encR] & 0xff;
    		encCurSample2= inpcm[encR + 3] << 8 | inpcm[encR + 2] & 0xff;
			
			encInterpol=(encCurSample1+encCurSample2)/2;
			outulaw[outulawpos++]=alawEncodeTable[encInterpol+32768];
		}
    	return len/4;
    }
    
    public int CodecToPcm(byte[] ulawbuf,int offset,int len,byte[] outpcm)
    {
    	outpcmpos=0;
		for (decR=0;decR<len;decR++)
		{	
			pcmout=alawDecodeTable[ulawbuf[decR+offset]+128];
			
			
			//need 2x upsample

			// create an extra sample by interpolation
			decInterpol=(lastPcmSample+pcmout)/2;

			outpcm[outpcmpos++] = (byte)(decInterpol & 0xff);
			outpcm[outpcmpos++] = (byte)(decInterpol >> 8);
			
			outpcm[outpcmpos++] = (byte)(pcmout & 0xff);
			outpcm[outpcmpos++] = (byte)(pcmout >> 8);

			lastPcmSample=pcmout;
		}
    	
    	return len*4;
    }

    public int getCodecBlankPacket(byte[] buf,int offset)
    {
    	Arrays.fill(buf, offset, offset+frame_size,alawEncodeTable[32768]);
    	return frame_size;
    }

    
	private static byte[] getAlawEncodeTable(double gain)
	{
		byte[] table=new byte[65536];
		for (int v=-32768;v<32768;v++)
		{	
			int s=(int) (v*gain);
			if (s>32767)
				s=32767;
			else if (s<-32768)
				s=-32768;
			
			table[v+32768]=(byte)G711.linear2alaw(s);
			
			if (table[v+32768]==0)
				table[v+32768]=2;	
		}
		return table;
	}
	
	private static short[] getAlawDecodeTable(double gain)
	{
		short[] table=new short[256];
		for (int v=-128;v<128;v++)
		{	
			int s=G711.alaw2linear((byte)v);
			
			if (gain>1 && Math.abs(s)>60) // simple noise reduction - don't amplify low level signals
				s=(int) (s*gain);
				
			if (s>32767)
				s=32767;
			else if (s<-32768)
				s=-32768;
			
			table[v+128]=(short)s;
		}
		return table;
	}

	
	
}
