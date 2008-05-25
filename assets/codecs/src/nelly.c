/*
 * Copyright (c) 2007 a840bda5870ba11f19698ff6eb9581dfb0f95fa5,
 *                    539459aeb7d425140b62a3ec7dbf6dc8e408a306, and
 *                    520e17cd55896441042b14df2566a6eb610ed444
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

#include <stdlib.h>
#include <time.h>
#include <math.h>

#include "nelly.h"

extern unsigned char nelly_center_table[64];
extern short nelly_init_table[64];
extern float nelly_inv_dft_table[129];
extern short nelly_delta_table[32];
extern float nelly_pos_unpack_table[64];
extern float nelly_state_table[128];
extern float nelly_signal_table[64];
extern float nelly_neg_unpack_table[64];
extern int nelly_copy_count[23];
extern float nelly_huff_table[127];

static void center(float *audio)
{
	int i, j;
	float ftmp;

	for (i = 0; i < NELLY_BUF_LEN; i+=2) {
		j = nelly_center_table[i/2];
		if (j > i) {
			ftmp = audio[j];
			audio[j] = audio[i];
			audio[i] = ftmp;
			ftmp = audio[j+1];
			audio[j+1] = audio[i+1];
			audio[i+1] = ftmp;
		}
	}
}

static void inverse_dft(float *audio)
{
	int i, j, k, advance;
	float *aptr, a, b, c, d, e, f;

	aptr = audio;
	for (i = 0; i < NELLY_BUF_LEN/4; i++) {
		a = *aptr;
		b = *(aptr+2);
		c = *(aptr+1);
		d = *(aptr+3);

		*(aptr+2) = a-b;
		*aptr = a+b;
		*(aptr+3) = c-d;
		*(aptr+1) = c+d;

		aptr += 4;
	}

	aptr = audio;
	for (i = 0; i < NELLY_BUF_LEN/8; i++) {
		a = *aptr;
		b = *(aptr+4);
		c = *(aptr+1);
		d = *(aptr+5);

		*(aptr+4) = a-b;
		*(aptr+5) = c-d;
		*aptr = a+b;
		*(aptr+1) = c+d;

		aptr += 2;

		a = *aptr;
		b = *(aptr+5);
		c = *(aptr+1);
		d = *(aptr+4);

		*(aptr+4) = a-b;
		*aptr = a+b;
		*(aptr+5) = c+d;
		*(aptr+1) = c-d;

		aptr += 6;
	}

	i = 0;
	for (advance = 8; advance < NELLY_BUF_LEN; advance *= 2) {
		aptr = audio;

		for (k = 0; k < NELLY_BUF_LEN/(2*advance); k++) {
			for (j = 0; j < advance/4; j++) {
				a = nelly_inv_dft_table[128-i];
				b = *(aptr+advance);
				c = nelly_inv_dft_table[i];
				d = *(aptr+advance+1);
				e = *aptr;
				f = *(aptr+1);

				*(aptr+advance) = e-(a*b+c*d);
				*aptr = e+(a*b+c*d);
				*(aptr+advance+1) = f+(b*c-a*d);
				*(aptr+1) = f-(b*c-a*d);

				i += 512/advance;
				aptr += 2;
			}

			for (j = 0; j < advance/4; j++) {
				a = nelly_inv_dft_table[128-i];
				b = *(aptr+advance);
				c = nelly_inv_dft_table[i];
				d = *(aptr+advance+1);
				e = *aptr;
				f = *(aptr+1);

				*(aptr+advance) = e+(a*b-c*d);
				*aptr = e-(a*b-c*d);
				*(aptr+advance+1) = f+(a*d+b*c);
				*(aptr+1) = f-(a*d+b*c);

				i -= 512/advance;
				aptr += 2;
			}

			aptr += advance;
		}
	}
}

static void unpack_coeffs(float *buf, float *audio)
{
	int i, end, mid_hi, mid_lo;
	float a, b, c, d, e, f;

	end = NELLY_BUF_LEN-1;
	mid_hi = NELLY_BUF_LEN/2;
	mid_lo = mid_hi-1;

	for (i = 0; i < NELLY_BUF_LEN/4; i++) {
		a = buf[end-(2*i)];
		b = buf[2*i];
		c = buf[(2*i)+1];
		d = buf[end-(2*i)-1];
		e = nelly_pos_unpack_table[i];
		f = nelly_neg_unpack_table[i];

		audio[2*i] = b*e-a*f;
		audio[(2*i)+1] = a*e+b*f;

		a = nelly_neg_unpack_table[mid_lo-i];
		b = nelly_pos_unpack_table[mid_lo-i];

		audio[end-(2*i)-1] = b*d-a*c;
		audio[end-(2*i)] = b*c+a*d;
	}
}

static void complex2signal(float *audio)
{
	int i, end, mid_hi, mid_lo;
	float *aptr, *sigptr, a, b, c, d, e, f, g;

	end = NELLY_BUF_LEN-1;
	mid_hi = NELLY_BUF_LEN/2;
	mid_lo = mid_hi-1;

	a = audio[end];
	b = audio[end-1];
	c = audio[1];
	d = nelly_signal_table[0];
	e = audio[0];
	f = nelly_signal_table[mid_lo];
	g = nelly_signal_table[1];

	audio[0] = d*e;
	audio[1] = b*g-a*f;
	audio[end-1] = a*g+b*f;
	audio[end] = c*(-d);

	aptr = audio+end-2;
	sigptr = nelly_signal_table+mid_hi-1;

	for (i = 3; i < NELLY_BUF_LEN/2; i += 2) {
		a = audio[i-1];
		b = audio[i];
		c = nelly_signal_table[i/2];
		d = *sigptr;
		e = *(aptr-1);
		f = *aptr;

		audio[i-1] = a*c+b*d;
		*aptr = a*d-b*c;

		a = nelly_signal_table[(i/2)+1];
		b = *(sigptr-1);

		*(aptr-1) = b*e+a*f;
		audio[i] = a*e-b*f;

		sigptr--;
		aptr -= 2;
	}
}

static void apply_state(float *state, float *audio)
{
	int bot, mid_up, mid_down, top;
	float s_bot, s_top;
	float *t = nelly_state_table;

	bot = 0;
	top = NELLY_BUF_LEN-1;
	mid_up = NELLY_BUF_LEN/2;
	mid_down = (NELLY_BUF_LEN/2)-1;

	while (bot < NELLY_BUF_LEN/4) {
		s_bot = audio[bot];
		s_top = audio[top];

		audio[bot] = audio[mid_up]*t[bot]+state[bot]*t[top];
		audio[top] = state[bot]*t[bot]-audio[mid_up]*t[top];
		state[bot] = -audio[mid_down];

		audio[mid_down] = s_top*t[mid_down]+state[mid_down]*t[mid_up];
		audio[mid_up] = state[mid_down]*t[mid_down]-s_top*t[mid_up];
		state[mid_down] = -s_bot;

		bot++;
		mid_up++;
		mid_down--;
		top--;
	}
}

static int sum_bits(short *buf, short shift, short off)
{
	int b, i = 0, ret = 0;

	for (i = 0; i < NELLY_FILL_LEN; i++) {
		b = buf[i] - off;
		if (b < 0)
			b = 0;
		b = ((b>>(shift-1))+1)>>1;
		if (b > NELLY_BIT_CAP)
			ret += NELLY_BIT_CAP;
		else
			ret += b;
	}

	return ret;
}

static int headroom(int *la, short *sa)
{
	if (*la == 0)
		*sa += 31;
	else if (*la < 0) {
		while (*la > -1<<30) {
			*la <<= 1;
			(*sa)++;
		}
	} else {
		while (*la < 1<<30) {
			*la <<= 1;
			(*sa)++;
		}
	}

	return *la;
}

static void get_sample_bits(float *buf, int *bits)
{
	int i, j;
	short sbuf[128];
	int bitsum = 0, last_bitsum, small_bitsum, big_bitsum;
	short shift, shift_saved;
	int tmp;
	int big_off;
	int off, diff;

	tmp = 0;
	for (i = 0; i < NELLY_FILL_LEN; i++) {
		if (buf[i] > tmp)
			tmp = buf[i];
	}
	shift = -16;
	headroom(&tmp, &shift);

	if (shift < 0)
		for (i = 0; i < NELLY_FILL_LEN; i++)
			sbuf[i] = ((int)buf[i]) >> -shift;
	else
		for (i = 0; i < NELLY_FILL_LEN; i++)
			sbuf[i] = ((int)buf[i]) << shift;

	for (i = 0; i < NELLY_FILL_LEN; i++)
		sbuf[i] = (3*sbuf[i])>>2;

	tmp = 0;
	for (i = 0; i < NELLY_FILL_LEN; i++)
		tmp += sbuf[i];

	shift += 11;
	shift_saved = shift;
	tmp -= NELLY_DETAIL_BITS << shift;
	headroom(&tmp, &shift);
	off = (NELLY_BASE_OFF * (tmp>>16)) >> 15;
	shift = shift_saved - (NELLY_BASE_SHIFT+shift-31);

	if (shift < 0)
		off >>= -shift;
	else
		off <<= shift;

	bitsum = sum_bits(sbuf, shift_saved, off);

	if (bitsum != NELLY_DETAIL_BITS) {
		shift = 0;
		diff = bitsum - NELLY_DETAIL_BITS;

		if (diff > 0) {
			while (diff <= 16383) {
				shift++;
				diff *= 2;
			}
		} else {
			while (diff >= -16383) {
				shift++;
				diff *= 2;
			}
		}

		diff = (diff * NELLY_BASE_OFF) >> 15;
		shift = shift_saved-(NELLY_BASE_SHIFT+shift-15);

		if (shift > 0) {
			diff <<= shift;
		} else {
			diff >>= -shift;
		}

		for (j = 1; j < 20; j++) {
			tmp = off;
			off += diff;
			last_bitsum = bitsum;

			bitsum = sum_bits(sbuf, shift_saved, off);

			if ((bitsum-NELLY_DETAIL_BITS) * (last_bitsum-NELLY_DETAIL_BITS) <= 0)
				break;
		}

		if (bitsum != NELLY_DETAIL_BITS) {
			if (bitsum > NELLY_DETAIL_BITS) {
				big_off = off;
				off = tmp;
				big_bitsum=bitsum;
				small_bitsum=last_bitsum;
			} else {
				big_off = tmp;
				big_bitsum=last_bitsum;
				small_bitsum=bitsum;
			}

			while (bitsum != NELLY_DETAIL_BITS && j <= 19) {
				diff = (big_off+off)>>1;
				bitsum = sum_bits(sbuf, shift_saved, diff);
				if (bitsum > NELLY_DETAIL_BITS) {
					big_off=diff;
					big_bitsum=bitsum;
				} else {
					off = diff;
					small_bitsum=bitsum;
				}
				j++;
			}

			if (abs(big_bitsum-NELLY_DETAIL_BITS) >=
			    abs(small_bitsum-NELLY_DETAIL_BITS)) {
				bitsum = small_bitsum;
			} else {
				off = big_off;
				bitsum = big_bitsum;
			}

		}
	}

	for (i = 0; i < NELLY_FILL_LEN; i++) {
		tmp = sbuf[i]-off;
		if (tmp < 0)
			tmp = 0;
		else
			tmp = ((tmp>>(shift_saved-1))+1)>>1;

		if (tmp > NELLY_BIT_CAP)
			tmp = NELLY_BIT_CAP;
		bits[i] = tmp;
	}

	if (bitsum > NELLY_DETAIL_BITS) {
		tmp = i = 0;
		while (tmp < NELLY_DETAIL_BITS) {
			tmp += bits[i];
			i++;
		}

		tmp -= bits[i-1];
		bits[i-1] = NELLY_DETAIL_BITS-tmp;
		bitsum = NELLY_DETAIL_BITS;
		while (i < NELLY_FILL_LEN) {
			bits[i] = 0;
			i++;
		}
	}
}

static unsigned char get_bits(unsigned char block[NELLY_BLOCK_LEN], int *off, int n)
{
	char ret;
	int boff = *off/8, bitpos = *off%8, mask = (1<<n)-1;

	if (bitpos+n > 8) {
		ret = block[boff%NELLY_BLOCK_LEN] >> bitpos;
		mask >>= 8-bitpos;
		ret |= (block[(boff+1)%NELLY_BLOCK_LEN] & mask) << (8-bitpos);
	} else {
		ret = (block[boff%NELLY_BLOCK_LEN] >> bitpos) & mask;
	}

	*off += n;
	return ret;
}

void nelly_decode_block(nelly_handle *nh, unsigned char block[NELLY_BLOCK_LEN], float audio[256])
{
	int i,j;
	float buf[NELLY_BUF_LEN], pows[NELLY_BUF_LEN];
	float *aptr, *bptr, *pptr, val, pval;
	int bits[NELLY_BUF_LEN];
	unsigned char v;
	int bit_offset = 0;

	bptr = buf;
	pptr = pows;
	val = nelly_init_table[get_bits(block, &bit_offset, 6)];
	for (i = 0; i < 23; i++) {
		if (i > 0)
			val += nelly_delta_table[get_bits(block, &bit_offset, 5)];
		pval = pow(2, val/2048);
		for (j = 0; j < nelly_copy_count[i]; j++) {
			*bptr = val;
			*pptr = pval;
			bptr++;
			pptr++;
		}

	}

	for (i = NELLY_FILL_LEN; i < NELLY_BUF_LEN; i++)
		buf[i] = pows[i] = 0.0;

	get_sample_bits(buf, bits);

	for (i = 0; i < 2; i++) {
		aptr = audio+i*128;
		bit_offset = NELLY_HEADER_BITS + i*NELLY_DETAIL_BITS;

		for (j = 0; j < NELLY_FILL_LEN; j++) {
			if (bits[j] <= 0) {
				buf[j] = M_SQRT1_2*pows[j];
				if (random() % 2)
					buf[j] *= -1.0;
			} else {
				v = get_bits(block, &bit_offset, bits[j]);
				buf[j] = nelly_huff_table[(1<<bits[j])-1+v]*pows[j];
			}
		}

		unpack_coeffs(buf, aptr);
		center(aptr);
		inverse_dft(aptr);
		complex2signal(aptr);
		apply_state(nh->state, aptr);
	}
}

void nelly_util_floats2shorts(float audio[256], short shorts[256])
{
	int i;

	for (i = 0; i < 256; i++) {
		if (audio[i] >= 32767.0)
			shorts[i] = 32767;
		else if (audio[i] <= -32768.0)
			shorts[i] = -32768;
		else
			shorts[i] = (short)audio[i];
	}
}


void nelly_util_shorts2ulaw(short shorts[256], unsigned char bytes[256])
{
	int i;

	for (i = 0; i < 256; i++) {
		bytes[i] = linear2ulaw(shorts[i]);
	}
}



nelly_handle *nelly_get_handle()
{
	static int first = 1;
	int i;
	nelly_handle *nh;

	if (first) {
		srandom(time(NULL));
		first = 0;
	}

	nh = malloc(sizeof(nelly_handle));

	if (nh != NULL)
		for (i = 0; i < 64; i++)
			nh->state[i] = 0.0;

	return nh;
}

void nelly_free_handle(nelly_handle *nh)
{
	free(nh);
}
