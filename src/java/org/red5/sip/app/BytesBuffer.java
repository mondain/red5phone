package org.red5.sip.app;

public class BytesBuffer {
	private final int buffersCount;
	private final int arrayLength;
	private byte[][] buffer;
	private int[] bufLen;
	private int start, end;
	public static final float READY = .05f;

	public BytesBuffer(int arrayLength, int buffersCount) {
		this.buffersCount = buffersCount;
		this.arrayLength = arrayLength;
		this.buffer = new byte[buffersCount][arrayLength];
		this.bufLen = new int[buffersCount];
		clean();
	}

	protected void onBufferOverflow() {
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
	}

	public int take(byte[] dst, int offset) {
		int res = -1;
		if (start >= 0) {
			System.arraycopy(buffer[start], 0, dst, offset, Math.min(bufLen[start], dst.length - offset));
			res = bufLen[start++];
			if (start == buffersCount) {
				start = 0;
			}
			if (start == end) {
				start = -1;
				end = 0;
				onBufferEmpty();
			}
		}
		return res;
	}
}
