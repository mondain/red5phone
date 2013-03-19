package org.red5.sip.app;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.apache.commons.daemon.Daemon;
import org.apache.commons.daemon.DaemonContext;
import org.openmeetings.utils.PropertiesUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.zoolu.sip.address.NameAddress;

public class Application implements Daemon {
	private static final Logger log = LoggerFactory.getLogger(Application.class);
	private static final int SIP_START_PORT = 5070;
	private static final int SOUND_START_PORT = 3010;
	private static final int VIDEO_START_PORT = 7010;
	private static int sipPort = SIP_START_PORT;
	private static int soundPort = SOUND_START_PORT;
	private static int videoPort = VIDEO_START_PORT;
	private Properties props = null;
	private Map<Integer, SIPTransport> transportMap = new HashMap<Integer, SIPTransport>();
	private RTMPControlClient rtmpControlClient;

	private SIPTransport createSIPTransport(Properties prop, int room_id) {
		log.info("Creating SIP trasport for room: " + room_id);
		RTPStreamSender.useASAO = prop.getProperty("red5.codec", "asao").equals("asao");
		RTMPRoomClient roomClient = new RTMPRoomClient(prop.getProperty("red5.host"), prop.getProperty("om.context",
				"openmeetings"), room_id);

		SIPTransport sipTransport = new SIPTransport(roomClient, sipPort++, soundPort++, videoPort++) {
			public void onUaRegistrationSuccess(SIPRegisterAgent ra, NameAddress target, NameAddress contact,
					String result) {
				log.info("Registered successfully");
				this.roomClient.setSipNumberListener(this);
				this.roomClient.start();
			}

			public void onUaRegistrationFailure(SIPRegisterAgent ra, NameAddress target, NameAddress contact,
					String result) {
				log.info("Register failure");
				try {
					Thread.sleep(3000);
				} catch (InterruptedException e) {
					log.info("Reconnection pause was interrupted");
				}
				this.register();
			}
		};
		sipTransport.login(prop.getProperty("sip.obproxy"), prop.getProperty("sip.phone"),
				prop.getProperty("sip.authid"), prop.getProperty("sip.secret"), prop.getProperty("sip.realm"),
				prop.getProperty("sip.proxy"));
		sipTransport.register();
		return sipTransport;
	}

	public void init(String[] args) {
		log.info("Red5SIP starting...");
		File settings = new File(args[0]);
		if (!settings.exists()) {
			log.error("Settings file " + args[0] + " not found");
			return;
		}
		props = PropertiesUtils.load(settings);
		try {
			RTPStreamMultiplexingSender.sampling = RTPStreamMultiplexingSender.SAMPLE_RATE.findByShortName(Integer
					.parseInt(props.getProperty("red5.codec.rate", "22")));
		} catch (NumberFormatException e) {
			log.error("Can't parse red5.codec.rate value", e);
		}

	}

	public void init(DaemonContext daemonContext) throws Exception {
		init(daemonContext.getArguments());
	}

	public void start() throws Exception {
		String roomsStr = props.getProperty("rooms", null);
		if (props.getProperty("rooms.forceStart", "no").equals("yes") && roomsStr != null) {
			String[] rooms = roomsStr.split(",");
			for (String room : rooms) {
				try {
					int id = Integer.parseInt(room);
					transportMap.put(id, createSIPTransport(props, id));
				} catch (NumberFormatException e) {
					log.error("Room id parsing error: id=\"" + room + "\"");
				}
			}
		} else {
			this.rtmpControlClient = new RTMPControlClient(props.getProperty("red5.host"), props.getProperty(
					"om.context", "openmeetings")) {
				@Override
				protected void startRoomClient(int id) {
					transportMap.put(id, createSIPTransport(props, id));
				}

				@Override
				protected void stopRoomClient(int id) {
					SIPTransport t = transportMap.remove(id);
					if (t != null) {
						t.close();
					}
				}
			};
			this.rtmpControlClient.start();
		}
	}

	public void stop() throws Exception {
		if (this.rtmpControlClient != null) {
			this.rtmpControlClient.stop();
		}
		for (SIPTransport t : transportMap.values()) {
			t.close();
		}
		transportMap.clear();
	}

	public void destroy() {

	}
}
