package org.red5.sip.webapp;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.red5.logging.Red5LoggerFactory;
import org.red5.sip.SIPTransport;
import org.slf4j.Logger;

public final class SIPManager {

	private static Map<String, SIPTransport> sessions = Collections.synchronizedMap(new HashMap<String, SIPTransport>());

	private static SIPManager singleton = new SIPManager();

	protected static Logger log = Red5LoggerFactory.getLogger(SIPManager.class, "sip");

	public static SIPManager getInstance() {
		return singleton;
	}

	private SIPManager() {
	}

	public void addSIPUser(String sipID, SIPTransport sipUser) {
		sessions.put(sipID, sipUser);
	}

	public SIPTransport getSIPUser(String sipID) {
		return sessions.get(sipID);
	}

	public SIPTransport removeSIPUser(String sipID) {
		SIPTransport sess = sessions.remove(sipID);
		sess = null;
		return sess;
	}

	public Collection<SIPTransport> getSIPUsers() {
		return sessions.values();
	}

	public int getNumberOfSessions() {
		return sessions.size();
	}

	public void closeSIPUser(String sipID) {
		SIPTransport sipUser = getSIPUser(sipID);
		if (sipUser != null) {
			sipUser.close();
			removeSIPUser(sipID);
		}
	}

	public void destroyAllSessions() {
		Collection<SIPTransport> sipUsers = getSIPUsers();
		SIPTransport sipUser;
		for (Iterator<SIPTransport> iter = sipUsers.iterator(); iter.hasNext();) {
			sipUser = (SIPTransport) iter.next();
			sipUser.close();
			sipUser = null;
		}
		sessions = new HashMap<String, SIPTransport>();
	}

}
