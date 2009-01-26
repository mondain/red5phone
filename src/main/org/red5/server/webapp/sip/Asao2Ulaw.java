package org.red5.server.webapp.sip;

import java.net.*;
import java.io.*;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Asao2Ulaw  implements Runnable {

	private Process asaoProcess;
	private BufferedReader display;
	private ASAOThread asao;
	private Thread thread = null;
	private DataOutputStream out;
	private InputStream in;
	private InputStream inputStream;

	protected static Logger log = LoggerFactory.getLogger(Asao2Ulaw.class);

	public Asao2Ulaw() {

	}

	public InputStream decode(InputStream inputStream) {
		this.inputStream = inputStream;

		stopThread();

		try {

			String[] command = {""};
			String appPath = System.getProperty("user.dir");
			appPath = appPath.substring(0, (appPath.length() - 8));  // removing /wrapper from path name

			String OS = System.getProperty("os.name").toLowerCase();

			if (OS.indexOf("windows") > -1) {
				command[0] = appPath + "/webapps/sip/assets/codecs/asao2ulaw.exe";

			} else { // we assue linux
				command[0] = appPath + "/webapps/sip/assets/codecs/asao2ulaw.exe";
			}

			asaoProcess = Runtime.getRuntime().exec(command);

			p("Started Asao2Ulaw decode v 0.0.1 using " + command[0]);

			if (asaoProcess != null) {
	      		display = new BufferedReader (new InputStreamReader(asaoProcess.getErrorStream()));
				out = new DataOutputStream(asaoProcess.getOutputStream());
		  		in = asaoProcess.getInputStream();

				p("Started Asao2Ulaw Reader");
	      		asao = new ASAOThread();
	      		asao.start(display);

				thread = new Thread(this);
				thread.start();
			}

		} catch (Exception e) {
			p("Asao2Ulaw decode exception " + e);
			stop();
		}

		return in;
	}



	public void run() {
		p("Run Asao2Ulaw");

		byte[] block = new byte[64];

		while (thread != null && thread.isAlive()) {
			try {

				int b = inputStream.read(block);

				while (b != -1) {
					out.write(block);
					out.flush();
					b = inputStream.read(block);
				}

				inputStream.close();
				out.close();
				stop();

			} catch (Throwable t) {}

		}
	}


	public void stop() {

		p("Stopped Asao2Ulaw");

		if (display != null) {
			asao.stop();
		}

		asaoProcess.destroy();
		stopThread();
	}



	public void stopThread() {
		p("In stopThread()");

		// Keep a reference such that we can kill it from here.
		Thread targetThread = thread;

		thread = null;

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
