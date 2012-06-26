package org.red5.sip.webapp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.red5.logging.Red5LoggerFactory;
import org.red5.server.adapter.ApplicationAdapter;
import org.red5.server.api.IClient;
import org.red5.server.api.IConnection;
import org.red5.server.api.Red5;
import org.red5.server.api.scope.IScope;
import org.red5.server.api.service.IServiceCapableConnection;
import org.red5.server.api.stream.IBroadcastStream;
import org.red5.server.api.stream.IPlayItem;
import org.red5.server.api.stream.IPlaylistSubscriberStream;
import org.red5.server.api.stream.IStreamAwareScopeHandler;
import org.red5.server.api.stream.ISubscriberStream;
import org.red5.sip.SIPRegisterAgent;
import org.red5.sip.SIPTransport;
import org.red5.sip.SIPUserAgent;
import org.red5.sip.net.rtmp.RTMPRoomClient;
import org.slf4j.Logger;
import org.zoolu.sip.address.NameAddress;

/**
 * Red5 application for Red5Phone.
 */
public class Application extends ApplicationAdapter implements IStreamAwareScopeHandler {

	protected static Logger log = Red5LoggerFactory.getLogger(Application.class, "sip");

	private SIPManager sipManager;

	private boolean available = false;

	private int startSIPPort = 5070;

	private int stopSIPPort = 5099;

	private int sipPort;

	private int startRTPPort = 3000;

	private int stopRTPPort = 3029;

	private int rtpPort;

	private Map<String, String> userNames = new HashMap<String, String>();

	@Override
	public boolean appStart(IScope scope) {
		log.info("Red5SIP starting in scope " + scope.getName() + " " + System.getProperty("user.dir"));
		sipManager = SIPManager.getInstance();

		// startSIPPort =
		// Integer.parseInt(PacketHandler.getInstance().getStartSIPPort());
		// stopSIPPort =
		// Integer.parseInt(PacketHandler.getInstance().getEndSIPPort());
		// startRTPPort =
		// Integer.parseInt(PacketHandler.getInstance().getStartRTPPort());
		// stopRTPPort =
		// Integer.parseInt(PacketHandler.getInstance().getEndRTPPort());

		log.info("Red5SIP using RTP port range " + startRTPPort + "-" + stopRTPPort + ", using SIP port range " + startSIPPort + "-" + stopSIPPort);
		sipPort = startSIPPort;
		rtpPort = startRTPPort;
		return true;
	}

	@Override
	public void appStop(IScope scope) {
		log.info("Red5SIP stopping in scope " + scope.getName());
		sipManager.destroyAllSessions();
	}

	@Override
	public boolean appConnect(IConnection conn, Object[] params) {
		IServiceCapableConnection service = (IServiceCapableConnection) conn;
		log.info("Red5SIP Client connected " + conn.getClient().getId() + " service " + service);
		return true;
	}

	@Override
	public boolean appJoin(IClient client, IScope scope) {

		log.info("Red5SIP Client joined app " + client.getId());
		IConnection conn = Red5.getConnectionLocal();
		IServiceCapableConnection service = (IServiceCapableConnection) conn;

		return true;
	}

	@Override
	public void appLeave(IClient client, IScope scope) {
		log.info("Red5SIP Client leaving app " + client.getId());
		if (userNames.containsKey(client.getId())) {
			log.info("Red5SIP Client closing client " + userNames.get(client.getId()));
			sipManager.closeSIPUser(userNames.get(client.getId()));
			userNames.remove(client.getId());
		}
	}

	public void streamPublishStart(IBroadcastStream stream) {
		log.info("Red5SIP Stream publish start: " + stream.getPublishedName());
	}

	public void streamBroadcastClose(IBroadcastStream stream) {
		log.info("Red5SIP Stream broadcast close: " + stream.getPublishedName());
	}

	public void streamBroadcastStart(IBroadcastStream stream) {
		log.info("Red5SIP Stream broadcast start: " + stream.getPublishedName());
	}

	public void streamPlaylistItemPlay(IPlaylistSubscriberStream stream, IPlayItem item, boolean isLive) {
		log.info("Red5SIP Stream play: " + item.getName());
	}

	public void streamPlaylistItemStop(IPlaylistSubscriberStream stream, IPlayItem item) {
		log.info("Red5SIP Stream stop: " + item.getName());
	}

	public void streamPlaylistVODItemPause(IPlaylistSubscriberStream stream, IPlayItem item, int position) {

	}

	public void streamPlaylistVODItemResume(IPlaylistSubscriberStream stream, IPlayItem item, int position) {

	}

	public void streamPlaylistVODItemSeek(IPlaylistSubscriberStream stream, IPlayItem item, int position) {

	}

	public void streamSubscriberClose(ISubscriberStream stream) {
		log.info("Red5SIP Stream subscribe close: " + stream.getName());
	}

	public void streamSubscriberStart(ISubscriberStream stream) {
		log.info("Red5SIP Stream subscribe start: " + stream.getName());
	}

	public List<String> getStreams(final IConnection conn) {
		List<String> streamList = new ArrayList<String>();
		streamList.addAll(getBroadcastStreamNames(conn.getScope()));
		return streamList;
	}

	public void onPing() {
		log.info("Red5SIP Ping");
	}

	public void open(String obproxy, String uid, String phone, String username, String password, String realm, String proxy) {
		log.info("Red5SIP open");

		login(obproxy, uid, phone, username, password, realm, proxy);
		register(uid);
	}

	public void login(String obproxy, String uid, String phone, String username, String password, String realm, String proxy) {
		log.info("Red5SIP login " + uid);

		IConnection conn = Red5.getConnectionLocal();
		IServiceCapableConnection service = (IServiceCapableConnection) conn;

		SIPTransport sipUser = sipManager.getSIPUser(uid);
		if (sipUser == null) {
			log.info("Red5SIP open creating sipUser for " + username + " on sip port " + sipPort + " audio port " + rtpPort + " uid " + uid);
			try {
				RTMPRoomClient roomClient = new RTMPRoomClient("localhost", "sip", conn.getScope().getName());
				sipUser = new FlashSIPTransport(service, roomClient, sipPort, rtpPort);
				sipManager.addSIPUser(uid, sipUser);
			} catch (Exception e) {
				log.info("open error " + e);
			}
		}

		sipUser.login(obproxy, phone, username, password, realm, proxy);
		userNames.put(conn.getClient().getId(), uid);

		sipPort++;
		if (sipPort > stopSIPPort)
			sipPort = startSIPPort;

		rtpPort++;
		if (rtpPort > stopRTPPort)
			rtpPort = startRTPPort;

	}

	public void register(String uid) {
		log.info("Red5SIP register");

		SIPTransport sipUser = sipManager.getSIPUser(uid);

		if (sipUser != null) {
			sipUser.register();
		}
	}

	public void call(String uid, String destination) {
		log.info("Red5SIP Call " + destination);
		SIPTransport sipUser = sipManager.getSIPUser(uid);
		if (sipUser != null) {
			log.info("Red5SIP Call found user " + uid + " making call to " + destination);
			sipUser.call(destination);
		}
	}

	public void transfer(String uid, String transferTo) {
		log.info("Red5SIP transfer " + transferTo);
		SIPTransport sipUser = sipManager.getSIPUser(uid);
		if (sipUser != null) {
			log.info("Red5SIP Call found user " + uid + " transfering call to " + transferTo);
			sipUser.transfer(transferTo);
		}
	}

	public void addToConf(String uid, String conf) {
		log.info("Red5SIP addToConf " + conf);
		SIPTransport sipUser = sipManager.getSIPUser(uid);
		if (sipUser != null) {
			log.info("Red5SIP addToConf found user " + uid + " adding to conf " + conf);
			sipUser.transfer("8" + conf);
		}
	}

	public void joinConf(String uid, String conf) {
		log.info("Red5SIP joinConf " + conf);
		SIPTransport sipUser = sipManager.getSIPUser(uid);
		if (sipUser != null) {
			log.info("Red5SIP joinConf found user " + uid + " joining conf " + conf);
			sipUser.call("8" + conf);
		}
	}

	public void dtmf(String uid, String digits) {
		log.info("Red5SIP DTMF " + digits);
		SIPTransport sipUser = sipManager.getSIPUser(uid);
		if (sipUser != null) {
			log.info("Red5SIP DTMF found user " + uid + " sending dtmf digits " + digits);
			sipUser.dtmf(digits);
		}
	}

	public void accept(String uid) {
		log.info("Red5SIP Accept");
		SIPTransport sipUser = sipManager.getSIPUser(uid);
		if (sipUser != null) {
			sipUser.accept();
		}
	}

	public void unregister(String uid) {
		log.info("Red5SIP unregister");
		SIPTransport sipUser = sipManager.getSIPUser(uid);
		if (sipUser != null) {
			sipUser.unregister();
		}
	}

	public void hangup(String uid) {
		log.info("Red5SIP Hangup");
		SIPTransport sipUser = sipManager.getSIPUser(uid);
		if (sipUser != null) {
			sipUser.hangup();
		}
	}

	public void streamStatus(String uid, String status) {
		log.info("Red5SIP streamStatus: {}", status);
	}

	public void close(String uid) {
		log.info("Red5SIP endRegister");
		IConnection conn = Red5.getConnectionLocal();
		sipManager.closeSIPUser(uid);
		userNames.remove(conn.getClient().getId());
	}

	private class FlashSIPTransport extends SIPTransport {

		IServiceCapableConnection service;

		FlashSIPTransport(IServiceCapableConnection service, RTMPRoomClient roomClient, int sipPort, int rtpPort) {
			super(roomClient, sipPort, rtpPort);
			this.service = service;
		}

		public void onUaCallIncoming(SIPUserAgent ua, NameAddress callee, NameAddress caller) {
			String source = caller.getAddress().toString();
			String sourceName = caller.hasDisplayName() ? caller.getDisplayName() : "";
			String destination = callee.getAddress().toString();
			String destinationName = callee.hasDisplayName() ? callee.getDisplayName() : "";
			log.debug("onUaCallIncoming " + source + " " + destination);
			if (service != null) {
				((IServiceCapableConnection) service).invoke("incoming", new Object[] { source, sourceName, destination, destinationName });
			}
		}

		public void onUaCallRinging(SIPUserAgent ua) {
			log.debug("onUaCallRinging");
			if (service != null) {
				((IServiceCapableConnection) service).invoke("callState", new Object[] { "onUaCallRinging" });
			}
		}

		public void onUaCallAccepted(SIPUserAgent ua) {
			log.debug("onUaCallAccepted");
			if (service != null) {
				((IServiceCapableConnection) service).invoke("callState", new Object[] { "onUaCallAccepted" });
			}
		}

		public void onUaCallConnected(SIPUserAgent ua) {
			log.debug("onUaCallConnected");
			sipReady = true;
			if (service != null) {
				//((IServiceCapableConnection) service).invoke("connected", new Object[] { playName, publishName });
				((IServiceCapableConnection) service).invoke("callState", new Object[] { "onUaCallConnected" });
			}
		}

		public void onUaCallTrasferred(SIPUserAgent ua) {
			log.debug("onUaCallTrasferred");
			if (service != null) {
				((IServiceCapableConnection) service).invoke("callState", new Object[] { "onUaCallTrasferred" });
			}
		}

		public void onUaCallCancelled(SIPUserAgent ua) {
			log.debug("onUaCallCancelled");
			sipReady = false;
			closeStreams();
			if (service != null) {
				((IServiceCapableConnection) service).invoke("callState", new Object[] { "onUaCallCancelled" });
			}
			ua.listen();
		}

		public void onUaCallFailed(SIPUserAgent ua) {
			log.debug("onUaCallFailed");
			sipReady = false;
			closeStreams();
			if (service != null) {
				((IServiceCapableConnection) service).invoke("callState", new Object[] { "onUaCallFailed" });
			}
			ua.listen();
		}

		public void onUaCallClosed(SIPUserAgent ua) {
			log.debug("onUaCallClosed");
			sipReady = false;
			closeStreams();
			if (service != null) {
				((IServiceCapableConnection) service).invoke("callState", new Object[] { "onUaCallClosed" });
			}
			ua.listen();
		}

		public void onUaRegistrationSuccess(SIPRegisterAgent ra, NameAddress target, NameAddress contact, String result) {
			log.debug("SIP Registration success " + result);
			if (service != null) {
				((IServiceCapableConnection) service).invoke("registrationSucess", new Object[] { result });
			}
		}

		public void onUaRegistrationFailure(SIPRegisterAgent ra, NameAddress target, NameAddress contact, String result) {
			log.debug("SIP Registration failure " + result);
			if (service != null) {
				((IServiceCapableConnection) service).invoke("registrationFailure", new Object[] { result });
			}
		}
	}
	
}
