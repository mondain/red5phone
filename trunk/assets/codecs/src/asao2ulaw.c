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

/*
 * modified from original nelly2pcm for real-time usage
 * asao2ulaw reads 64 byes of asao from STDIN and converts to 256 bytes of ulaw at STDOUT
 */

#include <sys/types.h>
#include <sys/stat.h>
#include <sys/mman.h>
#include <arpa/inet.h>
#include <netinet/in.h>
#include <assert.h>
#include <stdint.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>

#include "nelly.h"

int main(int argc, char *argv[])
{
	float float_buf[256];
	short shorts_buf[256];
	unsigned char out_buf[256];
	unsigned char nm_data[64];
	int block_kt=0, nm_len=0;

	fprintf(stderr, "Nellymoser decoder\n");

	nelly_handle *nh;

	nh = nelly_get_handle();

	nm_len = read(0, nm_data, 64);

	while (nm_len == 64) {
		block_kt++;

		nelly_decode_block(nh, nm_data, float_buf);
		nelly_util_floats2shorts(float_buf, shorts_buf);
		nelly_util_shorts2ulaw(shorts_buf, out_buf);
		write(1, out_buf, 256);

		nm_len = read(0, nm_data, 64);
	}

	nelly_free_handle(nh);
	fprintf(stderr, "Total blocks processed = %d\n", block_kt);
	return 0;
}

