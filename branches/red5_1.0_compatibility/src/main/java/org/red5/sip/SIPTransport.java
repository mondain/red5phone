package org.red5.sip;

import org.red5.logging.Red5LoggerFactory;
import org.red5.sip.net.rtmp.RTMPRoomClient;
import org.slf4j.Logger;
import org.zoolu.net.SocketAddress;
import org.zoolu.sip.address.NameAddress;
import org.zoolu.sip.provider.SipProvider;
import org.zoolu.sip.provider.SipStack;

public class SIPTransport implements SIPUserAgentListener, SIPRegisterAgentListener, ISipNumberListener {

	protected static Logger log = Red5LoggerFactory.getLogger(SIPTransport.class, "sip");

	public boolean sipReady = false;

	private SipProvider sip_provider;

	private SIPUserAgentProfile user_profile;

	private String opt_outbound_proxy = null;

	protected SIPUserAgent ua;

	private SIPRegisterAgent ra;

	protected RTMPRoomClient roomClient;

	private String username;

	private String password;

	private String realm;

	protected int sipPort;

	protected int rtpPort;

	private String proxy;

	public SIPTransport(RTMPRoomClient roomClient, int sipPort, int rtpPort) {
		this.roomClient = roomClient;
		this.sipPort = sipPort;
		this.rtpPort = rtpPort;
	}

	public void login(String obproxy, String phone, String username, String password, String realm, String proxy) {
		log.debug("login");

		this.username = username;
		this.password = password;
		this.proxy = proxy;
		this.opt_outbound_proxy = obproxy;
		this.realm = realm;

		String fromURL = "\"" + phone + "\" <sip:" + phone + "@" + proxy + ">";

		try {
			SipStack.init();
			SipStack.debug_level = 0;
			SipStack.log_path = "log";

			sip_provider = new SipProvider(null, sipPort);
			sip_provider.setOutboundProxy(new SocketAddress(opt_outbound_proxy));

			user_profile = new SIPUserAgentProfile();
			user_profile.audioPort = rtpPort;
			user_profile.username = username;
			user_profile.passwd = password;
			user_profile.realm = realm;
			user_profile.fromUrl = fromURL;
			user_profile.contactUrl = "sip:" + phone + "@" + sip_provider.getViaAddress();

			if (sip_provider.getPort() != SipStack.default_port) {
				user_profile.contactUrl += ":" + sip_provider.getPort();
			}

			user_profile.keepaliveTime = 8000;
			user_profile.acceptTime = 0;
			user_profile.hangupTime = 20;

			ua = new SIPUserAgent(sip_provider, user_profile, this, roomClient);

			sipReady = false;
			ua.listen();

		} catch (Exception e) {
			log.debug("login: Exception:>\n" + e);
		}
	}

	public void dtmf(String digits) {
		log.debug("dtmf " + digits);
		try {
			if (ua != null && ua.audioApp != null && ua.audioApp.sender != null) {
				ua.audioApp.sender.queueSipDtmfDigits(digits);
			}
		} catch (Exception e) {
			log.debug("dtmf: Exception:>\n" + e);
		}
	}

	public void call(String destination) {
		log.debug("Calling " + destination);
		try {
			roomClient.init();
			sipReady = false;
			ua.setMedia(roomClient);
			ua.hangup();
			if (destination.indexOf("@") == -1) {
				destination = destination + "@" + proxy;
			}
			if (destination.indexOf("sip:") > -1) {
				destination = destination.substring(4);
			}
			ua.call(destination);
		} catch (Exception e) {
			log.debug("call: Exception:>\n" + e);
		}
	}

	public void transfer(String transferTo) {
		log.debug("Transfer To: " + transferTo);
		try {
			if (transferTo.indexOf("@") == -1) {
				transferTo = transferTo + "@" + proxy;
			}
			ua.transfer(transferTo);
		} catch (Exception e) {
			log.debug("transfer: Exception:>\n" + e);
		}
	}

	public void register() {
		log.debug("register");
		try {
			if (sip_provider != null) {
				ra = new SIPRegisterAgent(sip_provider, user_profile.fromUrl, user_profile.contactUrl, username, user_profile.realm, password, this);
				loopRegister(user_profile.expires, user_profile.expires / 2, user_profile.keepaliveTime);
			}
		} catch (Exception e) {
			log.debug("register: Exception:>\n" + e);
		}
	}

	public void close() {
		log.debug("close1");
		try {
			hangup();
			unregister();
			Thread.sleep(3000);
		} catch (Exception e) {
			log.debug("close: Exception:>\n" + e);
		}
		try {
			log.debug("provider.halt");
			sip_provider.halt();
		} catch (Exception e) {
			log.debug("close: Exception:>\n" + e);
		}
	}

	public void accept() {
		log.debug("accept");
		if (ua != null) {
			try {
				roomClient.init();
				sipReady = false;
				ua.setMedia(roomClient);
				ua.accept();
			} catch (Exception e) {
				log.debug("accept - Exception:>\n" + e);
			}
		}
	}

	public void hangup() {
		log.debug("hangup");
		if (ua != null) {
			if (!ua.call_state.equals(SIPUserAgent.UA_IDLE)) {
				ua.hangup();
				ua.listen();
			}
		}
		closeStreams();
		roomClient.stopStream();
	}

	protected void closeStreams() {
		log.debug("closeStreams");
	}

	public void unregister() {
		log.debug("unregister");
		if (ra != null) {
			if (ra.isRegistering()) {
				ra.halt();
			}
			ra.unregister();
			ra = null;
		}
		if (ua != null) {
			ua.hangup();
		}
		ua = null;
	}

	public boolean isClosed() {
		return ua == null;
	}

	private void loopRegister(int expire_time, int renew_time, long keepalive_time) {
		if (ra.isRegistering()) {
			ra.halt();
		}
		ra.loopRegister(expire_time, renew_time, keepalive_time);
	}

	public void onUaRegistrationSuccess(SIPRegisterAgent ra, NameAddress target, NameAddress contact, String result) {
	}

	public void onUaRegistrationFailure(SIPRegisterAgent ra, NameAddress target, NameAddress contact, String result) {
	}

	public void onUaCallIncoming(SIPUserAgent ua, NameAddress callee, NameAddress caller) {
	}

	public void onUaCallCancelled(SIPUserAgent ua) {
	}

	public void onUaCallRinging(SIPUserAgent ua) {
	}

	public void onUaCallAccepted(SIPUserAgent ua) {
	}

	public void onUaCallTrasferred(SIPUserAgent ua) {
	}

	public void onUaCallFailed(SIPUserAgent ua) {
	}

	public void onUaCallClosed(SIPUserAgent ua) {
	}

	public void onUaCallConnected(SIPUserAgent ua) {
	}

	public void onSipNumber(String number) {
		this.call(number);
	}
	
}
