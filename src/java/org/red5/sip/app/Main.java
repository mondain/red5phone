package org.red5.sip.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Main {
	private static final Logger log = LoggerFactory.getLogger(Main.class);

	public static void main(String[] args) {
		final Application main = new Application();
		main.init(args);
		try {
			main.start();
		} catch (Exception e) {
			e.printStackTrace();
		}
		Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
			public void run() {
				log.warn("!!! Shutdown hook !!!");
				try {
					main.stop();
				} catch (Exception e) {
					log.error("Unexpected exception while shutting down", e);
				}
			}
		}));
	}
}
