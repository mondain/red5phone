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

public class SSCodecUtil
{
	/* these globals should not be an issue since there should be 
	 * no need to up and down sample from the same side
	 * the codec could always allocate another instance if needed
	 */
	
	//upsample vars
	private int usCurSample;
	private int uslastPcmSample;
	private int usInterpol;
	private int uspos;
	private int usR;

	// downsamle vars
	private int dnCurSample1;
	private int dnCurSample2;
	private int dnSample;
	private int dnpos;
	private int dnR;

	
	public int upSample2x(byte[] srcbuf,int len,byte[] outbuf,double gain)
	{
		// 2x upsample from bytes
		uspos=0;
		for (usR=0;usR<len;usR+=2)
		{	
			usCurSample= (int) ((srcbuf[usR + 1] << 8 | srcbuf[usR] & 0xff) * gain);
			
			if (usCurSample>32767)
				usCurSample=32767;
			else if (usCurSample<-32768)
				usCurSample=-32768;
			
			
			// create an extra sample by interpolation
    		usInterpol=(uslastPcmSample+usCurSample)/2;

			outbuf[uspos++] = (byte)(usInterpol & 0xff);
			outbuf[uspos++] = (byte)(usInterpol >> 8);
			
			outbuf[uspos++] = (byte)(usCurSample & 0xff);
			outbuf[uspos++] = (byte)(usCurSample >> 8);

			uslastPcmSample=usCurSample;
		}
		
		return uspos;
	}
	

	public int upSample2x(short[] srcbuf,int len,byte[] outbuf,double gain)
	{
		// 2x upsample from shorts
		uspos=0;
		for (usR=0;usR<len;usR++)
		{	
			usCurSample= (int) (srcbuf[usR] * gain);
			
			if (usCurSample>32767)
				usCurSample=32767;
			else if (usCurSample<-32768)
				usCurSample=-32768;
			
			
			// create an extra sample by interpolation
    		usInterpol=(uslastPcmSample+usCurSample)/2;

			outbuf[uspos++] = (byte)(usInterpol & 0xff);
			outbuf[uspos++] = (byte)(usInterpol >> 8);
			
			outbuf[uspos++] = (byte)(usCurSample & 0xff);
			outbuf[uspos++] = (byte)(usCurSample >> 8);

			uslastPcmSample=usCurSample;
		}
		
		return uspos;
	}
	
	
	
	public int downSample2x(byte[] srcbuf,int len,short[] outbuf,double gain)
	{
		// 2x downsample bytes to shorts
		dnpos=0;
    	for (dnR=0;dnR<len;dnR+=4) //	need to downsample - 2 samples each loop
		{
			// interpolate 2 samples - sounds better than just dropping a sample
			
    		dnCurSample1= srcbuf[dnR + 1] << 8 | srcbuf[dnR] & 0xff;
    		dnCurSample2= srcbuf[dnR + 3] << 8 | srcbuf[dnR + 2] & 0xff;
			
    		
    		dnSample=(int)(((dnCurSample1+dnCurSample2)/2)*gain);
			if (dnSample>32767)
				dnSample=32767;
			else if (dnSample<-32768)
				dnSample=-32768;
    		
    		outbuf[dnpos++] = (short)dnSample;
		}
    	
    	return dnpos;
	}


	public int downSample2x(byte[] srcbuf,int len,byte[] outbuf,double gain)
	{
		// 2x downsample bytes to bytes
		dnpos=0;
    	for (dnR=0;dnR<len;dnR+=4) //	need to downsample - 2 samples each loop
		{
			// interpolate 2 samples - sounds better than just dropping a sample
			
    		dnCurSample1= srcbuf[dnR + 1] << 8 | srcbuf[dnR] & 0xff;
    		dnCurSample2= srcbuf[dnR + 3] << 8 | srcbuf[dnR + 2] & 0xff;
			
    		
    		dnSample=(int)(((dnCurSample1+dnCurSample2)/2)*gain);
			if (dnSample>32767)
				dnSample=32767;
			else if (dnSample<-32768)
				dnSample=-32768;
    		
    		outbuf[dnpos++] = (byte)(dnSample & 0xff);
    		outbuf[dnpos++] = (byte)(dnSample >> 8);
		}
    	
    	return dnpos;
	}

	public int convertBytesToShortsLE(byte[] srcbuf,int offset,int len,short[] outbuf)
	{
		// bytes to shorts (little Endian)
		int convbspos=0;
    	for (int convbsR=offset;convbsR<len+offset;convbsR+=2)
		{
    		outbuf[convbspos++] = (short) (srcbuf[convbsR + 1] << 8 | srcbuf[convbsR] & 0xff);
		}
    	
    	return convbspos;
	}

	
	public int convertShortsToBytesLE(short[] srcbuf,int len, byte[] outbuf,int offset)
	{
		// shorts to bytes (little Endian)
		int convsbpos=offset;
		for (int convsbR=0;convsbR<len;convsbR++)
		{	
			outbuf[convsbpos++] = (byte)(srcbuf[convsbR] & 0xff);
			outbuf[convsbpos++] = (byte)(srcbuf[convsbR] >> 8);
		}
		
		return convsbpos-offset;
	}

	
	
	public int convertBytesToShortsBE(byte[] srcbuf,int offset,int len,short[] outbuf)
	{
		// bytes to shorts (big Endian)
		int convbspos=0;
    	for (int convbsR=offset;convbsR<len+offset;convbsR+=2)
		{
    		outbuf[convbspos++] = (short) (srcbuf[convbsR] << 8 | srcbuf[convbsR+1] & 0xff);
		}
    	
    	return convbspos;
	}

	
	public int convertShortsToBytesBE(short[] srcbuf,int len, byte[] outbuf,int offset)
	{
		// shorts to bytes (big Endian)
		int convsbpos=offset;
		for (int convsbR=0;convsbR<len;convsbR++)
		{	
			outbuf[convsbpos++] = (byte)(srcbuf[convsbR] >> 8);
			outbuf[convsbpos++] = (byte)(srcbuf[convsbR] & 0xff);
		}
		
		return convsbpos-offset;
	}

	

	
}
