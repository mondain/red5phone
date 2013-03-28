package org.red5.sip.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BytesBuffer {
	private static Logger log = LoggerFactory.getLogger(BytesBuffer.class);
	private final int buffersCount;
	private final int arrayLength;
	private byte[][] buffer;
	private int[] bufLen;
	private int start, end;

	public BytesBuffer(int arrayLength, int buffersCount) {
		this.buffersCount = buffersCount;
		this.arrayLength = arrayLength;
		this.buffer = new byte[buffersCount][arrayLength];
		this.bufLen = new int[buffersCount];
		clean();
	}

	protected void onBufferOverflow() {
		log.debug("onBufferOverflow:: start: {} end: {}", start, end);
		clean();
	}

	protected void onBufferEmpty() {

	}

	public void clean() {
		end = 0;
		start = -1;
	}

	protected int available() {
        if(start >= 0) {
		    return (end > start) ? (end - start) : (buffersCount - start + end);
        } else {
            return 0;
        }
	}

	protected float bufferUsage() {
		return available() * 1.0f / buffersCount;
	}

	public void push(byte[] array, int offset, int length) {
		log.trace("push:: start: {} end: {} offset: {} length: {} arr.length: {}", start, end, offset, length, array.length);
		if (end == start) {
			onBufferOverflow();
		}
		if (arrayLength < length) {
			throw new IllegalArgumentException("Array length too much: " + length);
		}
		System.arraycopy(array, offset, buffer[end], 0, length);
		bufLen[end++] = length;
		if (end == buffersCount) {
			end = 0;
		}
		if (start == -1) {
			start = 0;
		}
		log.trace("push:: start: {} end: {}", start, end);
	}

	public int take(byte[] dst, int offset) {
		log.trace("take:: start: {} end: {} offset: {} arr.length: {}", start, end, offset, dst.length);
		int res = -1;
		if (start >= 0) {
			System.arraycopy(buffer[start], 0, dst, offset, Math.min(bufLen[start], dst.length - offset));
			res = bufLen[start++];
			if (start == buffersCount) {
				start = 0;
			}
			if (start == end) {
				clean();
				onBufferEmpty();
			}
		}
		log.trace("take:: start: {} end: {} ", start, end);
		return res;
	}
}
