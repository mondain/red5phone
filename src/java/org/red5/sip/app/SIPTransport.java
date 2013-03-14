package org.red5.sip.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.zoolu.net.SocketAddress;
import org.zoolu.sip.address.NameAddress;
import org.zoolu.sip.message.Message;
import org.zoolu.sip.message.MessageFactory;
import org.zoolu.sip.message.SipMethods;
import org.zoolu.sip.provider.SipProvider;
import org.zoolu.sip.provider.SipStack;

public abstract class SIPTransport implements SIPUserAgentListener, SIPRegisterAgentListener, ISipNumberListener {
	protected static Logger log = LoggerFactory.getLogger(SIPTransport.class);

	protected RTMPRoomClient roomClient;
	private SipProvider sipProvider;
	private SIPUserAgentProfile userProfile;
	private String opt_outbound_proxy = null;
	private SIPUserAgent ua;
	private SIPRegisterAgent ra;

	private String username;
	private String password;
	private int sipPort;
	private int rtpAudioPort;
	private int rtpVideoPort;
	private String proxy;
	private String number;

	private void p(String s) {
		log.debug(s);
	}

	public SIPTransport(RTMPRoomClient roomClient, int sipPort, int rtpAudioPort, int rtpVideoPort) {
		this.roomClient = roomClient;
		this.sipPort = sipPort;
		this.rtpAudioPort = rtpAudioPort;
		this.rtpVideoPort = rtpVideoPort;
	}

	public void login(String obproxy, String phone, String username, String password, String realm, String proxy) {
		p("login");

		this.username = username;
		this.password = password;
		this.proxy = proxy;
		this.opt_outbound_proxy = obproxy;

		String fromURL = "\"" + phone + "\" <sip:" + phone + "@" + proxy + ">";

		try {
			SipStack.init();
			SipStack.debug_level = 0;
			SipStack.log_path = "log";

			sipProvider = new SipProvider(null, sipPort);
			sipProvider.setOutboundProxy(new SocketAddress(opt_outbound_proxy));

			userProfile = new SIPUserAgentProfile();
			userProfile.audioPort = rtpAudioPort;
			userProfile.videoPort = rtpVideoPort;
			userProfile.username = username;
			userProfile.passwd = password;
			userProfile.realm = realm;
			userProfile.fromUrl = fromURL;
			userProfile.contactUrl = "sip:" + phone + "@" + sipProvider.getViaAddress();

			if (sipProvider.getPort() != SipStack.default_port) {
				userProfile.contactUrl += ":" + sipProvider.getPort();
			}

			userProfile.keepaliveTime = 8000;
			userProfile.acceptTime = 0;
			userProfile.hangupTime = 20;

			ua = new SIPUserAgent(sipProvider, userProfile, this, roomClient);

			ua.listen();

		} catch (Exception e) {
			p("login: Exception:>\n" + e);
		}
	}

	public void call(String destination) {
		p("Calling " + destination);

		try {
			roomClient.init(destination);

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
			p("call: Exception:>\n" + e);
		}
	}

	public void register() {
		p("register");
		roomClient.stop();

		try {

			if (sipProvider != null) {
				ra = new SIPRegisterAgent(sipProvider, userProfile.fromUrl, userProfile.contactUrl, username,
						userProfile.realm, password, this);
				loopRegister(userProfile.expires, userProfile.expires / 2, userProfile.keepaliveTime);
			}

		} catch (Exception e) {
			p("register: Exception:>\n" + e);
		}
	}

	public void close() {
		p("close");

		try {
			hangup();
		} catch (Exception e) {
			p("close: Exception:>\n" + e);
		}

		try {
			p("provider.halt");
			sipProvider.halt();
		} catch (Exception e) {
			p("close: Exception:>\n" + e);
		}

		try {
			unregister();
		} catch (Exception e) {
			p("close: Exception:>\n" + e);
		}
	}

	public void hangup() {
		p("hangup");

		if (ua != null) {
			if (!ua.call_state.equals(SIPUserAgent.UA_IDLE)) {
				ua.hangup();
				ua.listen();
			}
		}

		closeStreams();
		roomClient.stop();
	}

	private void closeStreams() {
		p("closeStreams");
	}

	public void unregister() {
		p("unregister");

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

	private void loopRegister(int expire_time, int renew_time, long keepalive_time) {
		if (ra.isRegistering()) {
			ra.halt();
		}
		ra.loopRegister(expire_time, renew_time, keepalive_time);
	}

	public void onUaCallIncoming(SIPUserAgent ua, NameAddress callee, NameAddress caller) {
		// To change body of implemented methods use File | Settings | File
		// Templates.
	}

	public void onUaCallCancelled(SIPUserAgent ua) {
		// To change body of implemented methods use File | Settings | File
		// Templates.
	}

	public void onUaCallRinging(SIPUserAgent ua) {
		// To change body of implemented methods use File | Settings | File
		// Templates.
	}

	public void onUaCallAccepted(SIPUserAgent ua) {
		// To change body of implemented methods use File | Settings | File
		// Templates.
	}

	public void onUaCallTrasferred(SIPUserAgent ua) {
		// To change body of implemented methods use File | Settings | File
		// Templates.
	}

	public void onUaCallFailed(SIPUserAgent ua) {
		log.info("Call failed");
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			log.info("Reconnection pause was interrupted");
		}
		roomClient.start();
	}

	public void onUaCallClosing(SIPUserAgent ua) {
		log.info("Call closing");
	}

	public void onUaCallClosed(SIPUserAgent ua) {
		log.info("Call closed");
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			log.info("Reconnection pause was interrupted");
		}
		log.info("Try reconnect: Call " + number);
		register();
	}

	public void onUaCallConnected(SIPUserAgent ua) {
		log.info("Call connected");
	}

	public void onSipNumber(String number) {
		log.info("Room number: " + number);
		this.number = number;
		this.call(number);
	}

	public void requestFIR() {
		log.debug("requesting FIR...");
		Message msg = MessageFactory.createRequest(
			sipProvider
			, SipMethods.INFO
			, sipProvider.completeNameAddress(roomClient.getDestination())
			, sipProvider.completeNameAddress(userProfile.fromUrl)
			, ""); // no way to pass content-type, will set empty message for now
		msg.setBody("application/media_control+xml"
			,	"<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n" +
				" <media_control>\n" +
				"  <vc_primitive>\n" +
				"   <to_encoder>\n" +
				"    <picture_fast_update>\n" +
				"    </picture_fast_update>\n" +
				"   </to_encoder>\n" +
				"  </vc_primitive>\n" +
				" </media_control>\n");
		sipProvider.sendMessage(msg);
	}
}
