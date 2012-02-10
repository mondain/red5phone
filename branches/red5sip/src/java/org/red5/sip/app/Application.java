package org.red5.sip.app;

import org.apache.commons.daemon.Daemon;
import org.apache.commons.daemon.DaemonContext;
import org.openmeetings.utils.PropertiesUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class Application implements Daemon {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    private static final int SIP_START_PORT = 5070;
    private static final int SOUND_START_PORT = 3010;

    private static int sipPort = SIP_START_PORT;
    private static int soundPort = SOUND_START_PORT;

    private Properties props = null;

    private List<SIPTransport> transportList = new ArrayList<SIPTransport>();

    public static SIPTransport createSIPTransport(Properties prop, int room_id) {
        log.info("Creating SIP trasport for room: " + room_id);
        RTMPRoomClient roomClient = new RTMPRoomClient(prop.getProperty("red5.host"), "openmeetings", room_id);
        SIPTransport sipTransport = new SIPTransport(roomClient, sipPort++, soundPort++);
        sipTransport.login(prop.getProperty("sip.obproxy"), prop.getProperty("sip.phone"),
                prop.getProperty("sip.authid"), prop.getProperty("sip.secret"), prop.getProperty("sip.realm"),
                prop.getProperty("sip.proxy"));
        sipTransport.register();

        roomClient.setSipNumberListener(sipTransport);
        roomClient.start();
        return sipTransport;
    }

    public void init(String[] args) {
        log.info("Red5SIP starting...");
        File settings = new File(args[0]);
        if(!settings.exists()) {
            log.error("Settings file " + args[0] + " not found");
            return;
        }
        props = PropertiesUtils.load(settings);
    }

    public void init(DaemonContext daemonContext) throws Exception {
        init(daemonContext.getArguments());
    }

    public void start() throws Exception {
        String[] rooms = props.getProperty("rooms").split(",");
        for(String room: rooms) {
            transportList.add(createSIPTransport(props, Integer.parseInt(room)));
        }
    }

    public void stop() throws Exception {
        for(SIPTransport s: transportList) {
            s.close();
        }
    }

    public void destroy() {

    }
}

