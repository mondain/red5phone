package org.red5.sip.app;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.apache.mina.core.RuntimeIoException;
import org.red5.server.api.service.IPendingServiceCall;
import org.red5.server.api.service.IPendingServiceCallback;
import org.red5.client.net.rtmp.ClientExceptionHandler;
import org.red5.client.net.rtmp.RTMPClient;
import org.red5.server.net.rtmp.RTMPConnection;
import org.red5.server.net.rtmp.codec.RTMP;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class RTMPControlClient extends RTMPClient implements ClientExceptionHandler, IPendingServiceCallback {

	private static final Logger log = LoggerFactory.getLogger(RTMPControlClient.class);
	private static final int UPDATE_MS = 10000;

	private RTMPConnection conn;
	private final String host;
	private final String context;
	private boolean reconnect;
	private Set<Integer> activeRooms = new HashSet<Integer>();

	protected enum ServiceMethod {
		connect, getActiveRoomIds
	}
	private final Runnable updateTask = new Runnable() {
		public void run() {
			while (true) {
				try {
					Thread.sleep(UPDATE_MS);
					getActiveRoomIds();
				} catch (InterruptedException e) {
					log.debug("updateThread was interrupted", e);
					return;
				}
			}
		}
	};
	private Thread updateThread = null;

	public RTMPControlClient(String host, String context) {
		super();
		this.host = host;
		this.context = context;
	}

	public void start() {
		log.debug("Connecting. Host: {}, Port: {}, Context: {}", host, "1935", context);
		stop();
		reconnect = true;
		connect(host, 1935, context + "/0", this);
	}

	public void stop() {
		reconnect = false;
		if (conn != null) {
			disconnect();
		}
	}

	@Override
	public void connectionOpened(RTMPConnection conn, RTMP state) {
		log.debug("RTMP Connection opened");
		super.connectionOpened(conn, state);
		this.conn = conn;
	}

	private void reconnect() {
		if (reconnect) {
			try {
				Thread.sleep(3000);
			} catch (InterruptedException e) {
				log.error("Reconnection pause was interrupted", e);
			}
			log.debug("Try reconnect...");
			this.start();
		} else {
			if (updateThread != null && updateThread.isAlive()) {
				updateThread.interrupt();
			}
			updateThread = null;
		}
	}
	
	@Override
	public void connectionClosed(RTMPConnection conn, RTMP state) {
		log.debug("RTMP Connection closed");
		super.connectionClosed(conn, state);
		reconnect();
	}

	@Override
	public void handleException(Throwable throwable) {
		log.error("Exception was: ", throwable);
		if (throwable instanceof RuntimeIoException) {
			reconnect();
		}
	}

	private void getActiveRoomIds() {
		conn.invoke("getActiveRoomIds", this);
	}

	public void resultReceived(IPendingServiceCall call) {
		log.debug("service call result: " + call);
		ServiceMethod method;
		try {
			method = ServiceMethod.valueOf(call.getServiceMethodName());
		} catch (IllegalArgumentException e) {
			log.error("Unknown service method: " + call.getServiceMethodName());
			return;
		}
		switch (method) {
		case connect:
			log.info("connect");
			getActiveRoomIds();
			updateThread = new Thread(updateTask, "RTMPControlClient updateThread");
			updateThread.start();
			break;
		case getActiveRoomIds:
			log.debug("getActiveRoomIds");
			if (call.getResult() instanceof Collection) {
				Collection<Integer> newActiveRooms = ((Collection<Integer>) call.getResult());
				for (Integer id : newActiveRooms) {
					if (!this.activeRooms.contains(id)) {
						this.activeRooms.add(id);
						log.debug("Start room client, id: " + id);
						startRoomClient(id);
					}
				}
				for (Integer id : this.activeRooms) {
					if (!newActiveRooms.contains(id)) {
						log.info("Stop room client, id: " + id);
						this.activeRooms.remove(id);
						stopRoomClient(id);
					}
				}
			} else {
				for (Integer id : this.activeRooms) {
					log.info("Stop room client, id: " + id);
					this.activeRooms.remove(id);
					stopRoomClient(id);
				}
			}
			break;
		}
	}

	protected abstract void startRoomClient(int id);

	protected abstract void stopRoomClient(int id);
}
