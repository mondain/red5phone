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

public interface SSCodec
{
	public void init(int frame_size,double encodeGain,double decodeGain);

    public int PcmToCodec(byte[] buf,int len,byte[] codecOut,int codecBufOffset);

    public int CodecToPcm(byte[] buf,int offset,int len,byte[] pcmout);

}
