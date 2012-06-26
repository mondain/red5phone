package org.red5.sip.net.rtmp;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.mina.core.RuntimeIoException;
import org.apache.mina.core.buffer.IoBuffer;
import org.openmeetings.app.persistence.beans.recording.RoomClient;
import org.red5.client.net.rtmp.ClientExceptionHandler;
import org.red5.client.net.rtmp.INetStreamEventHandler;
import org.red5.client.net.rtmp.RTMPClient;
import org.red5.io.utils.ObjectMap;
import org.red5.server.api.service.IPendingServiceCall;
import org.red5.server.api.service.IPendingServiceCallback;
import org.red5.server.net.rtmp.RTMPConnection;
import org.red5.server.net.rtmp.codec.RTMP;
import org.red5.server.net.rtmp.event.AudioData;
import org.red5.server.net.rtmp.event.Notify;
import org.red5.server.net.rtmp.status.StatusCodes;
import org.red5.server.stream.message.RTMPMessage;
import org.red5.sip.IMediaReceiver;
import org.red5.sip.IMediaSender;
import org.red5.sip.ISipNumberListener;
import org.red5.sip.app.PlayNetStream;
import org.red5.sip.net.rtp.RTPStreamMultiplexingSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RTMPRoomClient extends RTMPClient implements INetStreamEventHandler, ClientExceptionHandler, IPendingServiceCallback, IMediaReceiver {

    private static final Logger log = LoggerFactory.getLogger(RTMPRoomClient.class);
    private static final int MAX_RETRY_NUMBER = 100;
    private static final int UPDATE_MS = 10000;

    private List<Integer> broadcastIds = new ArrayList<Integer>();
    private Map<Long,Integer> clientStreamMap = new HashMap<Long, Integer>();
    private String publicSID = null;
    private long broadCastId = -1;
    private RTMPConnection conn;
    private IMediaSender sender;
    private IoBuffer buffer;
    private int kt = 0;
    private int publishStreamId = -1;
    private boolean reconnect = true;
    private int retryNumber = 0;
    private boolean micMuted = false;
    private boolean silence = true;
    private String sipNumber = null;
    private ISipNumberListener sipNumberListener = null;
    private long lastSendActivityMS = 0L;
    private Thread updateThread = new Thread(new Runnable() {
        public void run() {
            while(true) {
                try {
                    Thread.sleep(UPDATE_MS);
                    updateSipTransport();
                } catch (InterruptedException e) {
                    log.debug("updateThread was interrupted", e);
                    return;
                }
            }
        }
    });

    protected enum ServiceMethod {
        connect,
        listRoomBroadcast,
        getBroadCastId,
        getPublicSID,
        createStream,
        setUserAVSettings,
        setSipTransport,
        updateSipTransport,
        sendMessage,
        getSipNumber
    }

    private final String roomId;
    private final String context;
    private final String host;

    @Override
    public void connectionOpened( RTMPConnection conn, RTMP state ) {
        log.debug("RTMP Connection opened");
        super.connectionOpened( conn, state );
        this.conn = conn;
        retryNumber = 0;
        updateThread.start();
    }

    @Override
    public void connectionClosed( RTMPConnection conn, RTMP state ) {
        log.debug( "RTMP Connection closed" );
        super.connectionClosed( conn, state );
        if(reconnect && ++retryNumber < MAX_RETRY_NUMBER) {
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                log.error("Reconnection pause was interrupted", e);
            }
            log.debug( "Try reconnect..." );
            this.start();
        } else {
            if(updateThread.isAlive()) {
                updateThread.interrupt();
            }
        }
    }

    public RTMPRoomClient(String host, String context, String roomId) {
        super();
        this.roomId = roomId;
        this.context = context;
        this.host = host;
        this.setServiceProvider(this);
        this.setExceptionHandler(this);
    }

    public RTMPRoomClient(String host, String context, int roomId) {
    	this(host, context, roomId + "");
    }

    public void start() {
        log.debug( "Connecting. Host: {}, Port: {}, Context: {}, RoomID: {}", new String[]{host, "1935", context, roomId} );
        connect(host, 1935, context + "/" + roomId, this);
    }

    public void setSipNumberListener(ISipNumberListener sipNumberListener) {
        this.sipNumberListener = sipNumberListener;
    }

    @Override
    public void handleException(Throwable throwable) {
        log.error("Exception was: {}", throwable.getStackTrace());
        if(throwable instanceof RuntimeIoException) {
            if(reconnect && ++retryNumber < MAX_RETRY_NUMBER) {
                try {
                    Thread.sleep(3000);
                } catch (InterruptedException e) {
                    log.error("Reconnection pause was interrupted", e);
                }
                this.start();
            } else {
                if(updateThread.isAlive()) {
                    updateThread.interrupt();
                }
            }
        }

    }

    public void init() {
        getPublicSID();
    }

    public void stop() {
        disconnect();
    }

    public void stopStream() {

        System.out.println( "RoomClient stopStream" );

        try {
            disconnect();
        }
        catch ( Exception e ) {
            log.error( "RoomClient stopStream exception " + e );
        }

    }

    public void setSender(IMediaSender sender) {
        this.sender = sender;
    }

    protected void getPublicSID() {
        invoke("getPublicSID", this);
    }

    protected void getBroadCastId() {
        invoke("getBroadCastId", this);
    }

    protected void listBroadcastIds() {
        invoke("listRoomBroadcast", this);
    }

    private void createPlayStream( long broadCastId ) {

        log.debug( "create play stream" );
        IPendingServiceCallback wrapper = new CreatePlayStreamCallBack(broadCastId);
        invoke( "createStream", null, wrapper );
    }

    private class CreatePlayStreamCallBack implements IPendingServiceCallback {

        private long broadCastId;

        public CreatePlayStreamCallBack(long broadCastId) {
            this.broadCastId = broadCastId;
        }

        public void resultReceived(IPendingServiceCall call) {

            Integer streamIdInt = (Integer) call.getResult();

            if (conn != null && streamIdInt != null) {
                clientStreamMap.put(broadCastId, streamIdInt);
                PlayNetStream stream = new PlayNetStream(sender);
                stream.setConnection(conn);
                stream.setStreamId(streamIdInt.intValue());
                conn.addClientStream(stream);
                play(streamIdInt, "" + broadCastId, -2000, -1000);
            }
        }

    }

    protected void setSipTransport() {
    	if (StringUtils.isNumeric(roomId)) {
            conn.invoke("setSipTransport", new Object[]{Long.valueOf(roomId), publicSID, ""+broadCastId}, this);   		
    	} else {
            conn.invoke("setSipTransport", new Object[]{roomId, publicSID, ""+broadCastId}, this);    		
    	}
    }

    protected void setUserAVSettings() {
        String[] remoteMessage = new String[3];
        remoteMessage[0] = "avsettings";
        remoteMessage[1] = "0";
        remoteMessage[2] = "av";
        conn.invoke("setUserAVSettings", new Object[]{"av", remoteMessage, 120, 90}, this);
    }

    protected void getSipNumber() {
    	if (StringUtils.isNumeric(roomId)) {
            conn.invoke("getSipNumber", new Object[]{Integer.valueOf(roomId).longValue()}, this);    		
    	} else {
    		conn.invoke("getSipNumber", new Object[]{roomId}, this);
    	}
    }

    protected void startStreaming() {
        //red5 -> SIP
        //createPlayStream(56);
        for(long broadCastId: broadcastIds) {
            if(broadCastId != this.broadCastId) {
                createPlayStream(broadCastId);
            }
        }
    }

    protected void updateSipTransport() {
        conn.invoke("updateSipTransport", this);
    }
    /******************************************************************************************************************/
    /** Serive provider methods */
    /******************************************************************************************************************/

    public void sendSyncCompleteFlag(Object param) {

    }

    public void roomDisconnect(RoomClient client) {
        log.debug("roomDisconnect:" + client.getPublicSID());
    }

    public void sendImagesSyncCompleteFlag(Object message) {
        log.debug("sendImagesSyncCompleteFlag:" + message.toString());
    }

    public void receiveExclusiveAudioFlag(RoomClient client) {
        log.debug("receiveExclusiveAudioFlag:" + client.getPublicSID());
        this.micMuted = !client.getPublicSID().equals(this.publicSID);
        log.info("Mic switched: " + this.micMuted);
    }

    public void receiveMicMuteSwitched(RoomClient client) {
        log.debug("receiveMicMuteSwitched:" + client.getPublicSID());
        if(client.getPublicSID().equals(this.publicSID)) {
            log.info("Mic switched: " + client.getMicMuted());
            this.micMuted = client.getMicMuted();
        }
    }

    public void sendVarsToMessage(Object message) {
        log.debug("sendVarsToMessage:" + message.toString());
    }

    public void sendVarsToMessageWithClient(Object message) {
        if(message instanceof Map) {
            try {
                Map map = Map.class.cast(message);
                if("kick".equals(map.get(0)) || "kick".equals(Map.class.cast(map.get("message")).get(0))) {
                    log.info("Kicked by moderator. Reconnect");
                    this.conn.close();
                }
            } catch (Exception ignored) {}
        }
        log.debug("sendVarsToMessageWithClient:" + message.toString());
    }

    public void addNewUser(RoomClient client) {
        log.debug("addNewUser:" + client.getPublicSID());
    }

    public void closeStream(RoomClient client) {
        log.debug("closeStream:" + client.getBroadCastID());
        Integer streamId = clientStreamMap.get(client.getBroadCastID());
        if(streamId != null) {
            if(sender instanceof RTPStreamMultiplexingSender) {
                ((RTPStreamMultiplexingSender) sender).streamRemoved();
            }
            clientStreamMap.remove(client.getBroadCastID());
            conn.removeClientStream(streamId);
        }
    }

    public void newStream(RoomClient client) {
        log.debug("newStream:" + client.getBroadCastID());
        createPlayStream(client.getBroadCastID());
    }

    /******************************************************************************************************************/

    public void resultReceived(IPendingServiceCall call) {
        log.info( "service call result: " + call );
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
                this.getSipNumber();
                break;
            case listRoomBroadcast:
                log.info("listRoomBroadcast");
                if(call.getResult() instanceof Collection)
                this.broadcastIds.addAll((Collection<Integer>)call.getResult());
                this.startStreaming();
                break;
            case getBroadCastId:
                log.info("getBroadCastId");
                this.broadCastId = ((Number)call.getResult()).intValue();
                this.setUserAVSettings();
                break;
            case getPublicSID:
                log.info("getPublicSID");
                this.publicSID = (String)call.getResult();
                this.getBroadCastId();
                this.listBroadcastIds();
                break;
            case createStream:
                log.info("createStream");
                publishStreamId = (Integer) call.getResult();
                publish(publishStreamId, "" + broadCastId, "live", this);
                this.setSipTransport();
                break;
            case setUserAVSettings:
                log.info("setUserAVSettings");
                //SIP -> red5
                createStream(this);
                break;
            case setSipTransport:
                log.info("setSipTransport");
                break;
            case updateSipTransport:
                log.info("updateSipTransport");
                break;
            case getSipNumber:
                log.info("getSipNumber");
                if(call.getResult() instanceof String) {
                    sipNumber = (String) call.getResult();
                    if(sipNumberListener != null) {
                        sipNumberListener.onSipNumber(sipNumber);
                    }
                } else {
                    log.error("getSipNumber invalid result: " + call.getResult());
                }
                break;
        }
    }

    public void soundActivity() {
        Object[] message = new Object[] {"audioActivity", !silence, this.publicSID};
	  	conn.invoke("sendMessage", message, this);
    }

    public void onStatus(Object obj)  {
        log.debug("onStatus: " + obj.toString());
    }

    public void onStreamEvent(Notify notify) {
        log.debug( "onStreamEvent " + notify );

        ObjectMap map = (ObjectMap) notify.getCall().getArguments()[ 0 ];
        String code = (String) map.get( "code" );

        if ( StatusCodes.NS_PUBLISH_START.equals( code ) ) {
            log.debug( "onStreamEvent Publish start" );
        }
    }


    public void pushAudio(byte[] audio, long ts, int codec ) throws IOException {

        if(micMuted) {
            return;
        }

        boolean silence = true;
        for (byte anAudio : audio) {
            if (anAudio != -1 && anAudio != -2 && anAudio != 126) {
                silence = false;
                break;
            }
        }
        if(silence != this.silence && lastSendActivityMS + 500 < System.currentTimeMillis()) {
            lastSendActivityMS = System.currentTimeMillis();
            this.silence = silence;
            soundActivity();
        }

        if(silence) {
            return;
        }

        if( publishStreamId == -1) {
            return;
        }
        if ( buffer == null ) {
            buffer = IoBuffer.allocate( 1024 );
            buffer.setAutoExpand( true );
        }

        buffer.clear();

        buffer.put( (byte) codec ); // first byte 2 mono 5500; 6 mono 11025; 22
        // mono 11025 adpcm 82 nellymoser 8000 178
        // speex 8000
        buffer.put( audio );

        buffer.flip();

        AudioData audioData = new AudioData( buffer );
        audioData.setTimestamp( (int) ts );

        kt++;
        if ( kt < 10 ) {
            log.debug( "+++ " + audioData );
        }

        RTMPMessage rtmpMsg = RTMPMessage.build(audioData);
        publishStreamData( publishStreamId, rtmpMsg );
    }
}
