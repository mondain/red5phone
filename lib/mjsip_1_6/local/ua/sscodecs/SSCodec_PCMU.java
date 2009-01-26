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

public class SSCodec_PCMU implements SSCodec
{
	private int frame_size=0;
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

    private static byte[] ulawEncodeTable=null;
    private static short[] ulawDecodeTable=null;


    public void init(int frame_size,double argEncodeGain,double argDecodeGain)
    {
		this.frame_size=frame_size;
		this.encodeGain=argEncodeGain;
		this.decodeGain=argDecodeGain;

		ulawEncodeTable=getUlawEncodeTable(encodeGain);
		ulawDecodeTable=getUlawDecodeTable(decodeGain);
    }


    public int PcmToCodec(byte[] inpcm,int len,byte[] outulaw,int offset)
    {
    	outulawpos=offset;

    	for (encR=0;encR<len;encR+=2) //	need to downsample - 2 samples each loop
		{
    		encCurSample1= inpcm[encR + 1] << 8 | inpcm[encR] & 0xff;

			outulaw[outulawpos++]=ulawEncodeTable[encCurSample1+32768];
		}
    	return len/2;
    }

    public int CodecToPcm(byte[] ulawbuf,int offset,int len,byte[] outpcm)
    {
    	outpcmpos=0;

		for (decR=0;decR<len;decR++)
		{
			pcmout=ulawDecodeTable[ulawbuf[decR+offset]+128];

			outpcm[outpcmpos++] = (byte)(pcmout & 0xff);
			outpcm[outpcmpos++] = (byte)(pcmout >> 8);

			lastPcmSample=pcmout;
		}

    	return len*2;
    }

	private static byte[] getUlawEncodeTable(double gain)
	{
		byte[] table=new byte[65536];
		for (int v=-32768;v<32768;v++)
		{
			int s=(int) (v*gain);
			if (s>32767)
				s=32767;
			else if (s<-32768)
				s=-32768;


			table[v+32768]=(byte)G711.linear2ulaw(s);

			if (table[v+32768]==0)
				table[v+32768]=2;
		}
		return table;
	}

	private static short[] getUlawDecodeTable(double gain)
	{
		short[] table=new short[256];
		for (int v=-128;v<128;v++)
		{
			int s=G711.ulaw2linear((byte)v);

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
