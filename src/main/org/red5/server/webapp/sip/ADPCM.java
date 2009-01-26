package org.red5.server.webapp.sip;

public final class ADPCM
{
	private static final int index_table[] = {
		 -1, -1, -1, -1, 2, 4, 6, 8,
		 -1, -1, -1, -1, 2, 4, 6, 8,
	};

	private static final int step_table[] = {
		7, 8, 9, 10, 11, 12, 13, 14, 16, 17,
		19, 21, 23, 25, 28, 31, 34, 37, 41, 45,
		50, 55, 60, 66, 73, 80, 88, 97, 107, 118,
		130, 143, 157, 173, 190, 209, 230, 253, 279, 307,
		337, 371, 408, 449, 494, 544, 598, 658, 724, 796,
		876, 963, 1060, 1166, 1282, 1411, 1552, 1707, 1878, 2066,
		2272, 2499, 2749, 3024, 3327, 3660, 4026, 4428, 4871, 5358,
		5894, 6484, 7132, 7845, 8630, 9493, 10442, 11487, 12635, 13899,
		15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794, 32767
	};


	private static final int yamaha_difflookup[] = {
		1, 3, 5, 7, 9, 11, 13, 15,
		-1, -3, -5, -7, -9, -11, -13, -15
	};


	private static int step_index;
	private static int prev_sample;

    public static byte[] compress(byte[] sound)
    {
		int numberOfSamples = sound.length / 2;

        int[] samples = new int[numberOfSamples];

        FSCoder soundIn = new FSCoder(FSCoder.LITTLE_ENDIAN, sound);

        for (int i=0; i<numberOfSamples; i++)
            samples[i] = soundIn.readWord(2, true);

        FSCoder compressedData = new FSCoder(FSCoder.LITTLE_ENDIAN, new byte[numberOfSamples*2]);

        compressedData.writeBits(2, 2);  //Set 4bits flash adpcm format

		step_index = 0;
		int diff = Math.abs(samples[1] - samples[0]);

		while (step_table[step_index] < diff && step_index < 63)
			step_index++;

        step_index = av_clip(step_index, 0, 63); // clip step so it fits 6 bits

        compressedData.writeBits(samples[0] & 0xFFFF, 16);
        compressedData.writeBits(step_index, 6);

        prev_sample = samples[0];

        for (int i=1; i<numberOfSamples; i++) {
            compressedData.writeBits(adpcm_ima_compress_sample(samples[i]), 4);
		}

		return compressedData.getData();
	}


	private static byte adpcm_ima_compress_sample(int sample)
	{
		int delta = sample - prev_sample;
		int nibble = FFMIN(7, (Math.abs(delta)*4/step_table[step_index])) + ((delta<0 ? 1:0)*8);
		prev_sample += ((step_table[step_index] * yamaha_difflookup[nibble]) / 8);
		prev_sample = av_clip_int16(prev_sample);
		step_index = av_clip(step_index + index_table[nibble], 0, 88);

		return (byte) nibble;
	}

	private static int FFMIN(int a, int b) {

		return ((a) > (b) ? (b) : (a));
	}

	private static int av_clip(int a, int amin, int amax)
	{
		if (a < amin)      return amin;
		else if (a > amax) return amax;
		else               return a;
	}

	private static int av_clip_int16(int a)
	{
		int temp = (a+32768) & ~65535;

		if (temp==1) return (a>>31) ^ 32767;
		else                    return a;
	}


}
