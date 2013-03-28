package org.red5.sip.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BufferUtils {

	protected static Logger log = LoggerFactory.getLogger(RTPStreamSender.class);

	/**
	 * Copy "copySize" floats from "origBuffer", starting on "startOrigBuffer", to "destBuffer", starting on
	 * "startDestBuffer".
	 */
	public static int floatBufferIndexedCopy(float[] destBuffer, int startDestBuffer, float[] origBuffer,
			int startOrigBuffer, int copySize) {

		int destBufferIndex = startDestBuffer;
		int origBufferIndex = startOrigBuffer;
		int counter = 0;

		log.debug("floatBufferIndexedCopy:: destBuffer.length = " + destBuffer.length + ", startDestBuffer = "
				+ startDestBuffer + ", origBuffer.length = " + origBuffer.length + ", startOrigBuffer = "
				+ startOrigBuffer + ", copySize = " + copySize + ".");

		if (destBuffer.length < (startDestBuffer + copySize)) {
			log.debug("floatBufferIndexedCopy:: Size copy problem.");
			return -1;
		}

		for (counter = 0; counter < copySize; counter++) {
			destBuffer[destBufferIndex] = origBuffer[origBufferIndex];

			destBufferIndex++;
			origBufferIndex++;
		}

		log.debug("floatBufferIndexedCopy " + counter + " bytes copied.");

		return counter;
	}

	/**
	 * Copy "copySize" bytes from "origBuffer", starting on "startOrigBuffer", to "destBuffer", starting on
	 * "startDestBuffer".
	 */
	public static int byteBufferIndexedCopy(byte[] destBuffer, int startDestBuffer, byte[] origBuffer,
			int startOrigBuffer, int copySize) {

		int destBufferIndex = startDestBuffer;
		int origBufferIndex = startOrigBuffer;
		int counter = 0;

		log.debug("byteBufferIndexedCopy:: destBuffer.length = " + destBuffer.length + ", startDestBuffer = "
				+ startDestBuffer + ", origBuffer.length = " + origBuffer.length + ", startOrigBuffer = "
				+ startOrigBuffer + ", copySize = " + copySize + ".");

		if (destBuffer.length < (startDestBuffer + copySize)) {
			log.debug("byteBufferIndexedCopy:: size copy problem.");
			return -1;
		}

		for (counter = 0; counter < copySize; counter++) {
			destBuffer[destBufferIndex] = origBuffer[origBufferIndex];

			destBufferIndex++;
			origBufferIndex++;
		}

		log.debug("byteBufferIndexedCopy:: " + counter + " bytes copied.");

		return counter;
	}
}
