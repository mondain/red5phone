package org.red5.server.webapp.sip;

import java.net.*;
import java.io.*;
import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class ASAOThread implements Runnable {

	protected static Logger log = LoggerFactory.getLogger(ASAOThread.class);

	private Thread thread = null;
	private BufferedReader input;
	private BufferedWriter output;

	public ASAOThread() {

	}


	public void start(BufferedReader input) {
		this.input = input;

		stopThread();
		thread = new Thread(this);
		thread.start();
	}

	public void run() {
		p("Start run()");

		// Get events while we're alive.
		while (thread != null) {

			if (!thread.isAlive())  break;

		    String line;

			try {

			  while ((line = input.readLine()) != null) {
				p(line);
			  }

     		  input.close();

			} catch (Throwable t) {

				if (input != null) {

					try {
						input.close();
					} catch (Exception ignore) {}
				}
			}

		}
	}

	public void stop() {

		p("Stopped ASAOThread");

		if (input != null) {

			try {
				input.close();
			} catch (Exception ignore) {}
		}
		stopThread();
	}

	public void stopThread() {
		p("In stopThread()");

		// Keep a reference such that we can kill it from here.
		Thread targetThread = thread;

		thread = null;

		// This should stop the main loop for this thread.
		// Killing a thread on a blcing read is tricky.
		// See also http://gee.cs.oswego.edu/dl/cpj/cancel.html
		if ((targetThread != null) && targetThread.isAlive()) {

			targetThread.interrupt();

			try {

				// Wait for it to die
				targetThread.join(500);
			}
			catch (InterruptedException ignore) {
			}

			// If current thread refuses to die,
			// take more rigorous methods.
			if (targetThread.isAlive()) {

				// Not preferred but may be needed
				// to stop during a blocking read.
				//targetThread.stop();

				// Wait for it to die
				try {
					targetThread.join(500);
				}
				catch (InterruptedException ignore) {
				}
			}

			p("Stopped thread alive=" + targetThread.isAlive());

		}
	}

	private void p(String s) {
		log.debug(s);
	}

}
