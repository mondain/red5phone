package org.red5.server.webapp.sip;

import local.media.AudioClipPlayer;
import org.zoolu.sip.call.*;
import org.zoolu.sip.address.*;
import org.zoolu.sip.provider.SipStack;
import org.zoolu.sip.provider.SipProvider;
import org.zoolu.sip.header.ExpiresHeader;
import org.zoolu.sip.header.ContactHeader;
import org.zoolu.sip.header.CallIdHeader;
import org.zoolu.sip.header.StatusLine;
import org.zoolu.sip.transaction.TransactionClient;
import org.zoolu.sip.transaction.TransactionClientListener;
import org.zoolu.sip.call.*;
import org.zoolu.sip.message.*;
import org.zoolu.sdp.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.zoolu.tools.Parser;
import org.zoolu.tools.Archive;

//import java.util.Iterator;
import java.util.Enumeration;
import java.util.Vector;
import java.io.*;

import local.ua.*;

public class SIPUserAgent extends CallListenerAdapter
{
    protected static Logger log = LoggerFactory.getLogger(SIPUserAgent.class);


   /** UserAgentProfile */
   protected SIPUserAgentProfile user_profile;

   /** SipProvider */
   protected SipProvider sip_provider;

   /** Call */
   //Call call;
   protected ExtendedCall call;

   /** Call transfer */
   protected ExtendedCall call_transfer;

   /** Audio application */
   public SIPAudioLauncher audio_app=null;
   /** Video application */
   protected MediaLauncher video_app=null;

   /** Local sdp */
   protected String local_session=null;

   /** SIPUserAgent listener */
   protected SIPUserAgentListener listener=null;

   /** Media file path */
   final String MEDIA_PATH="media/local/ua/";

   /** On wav file */
   final String CLIP_ON=MEDIA_PATH+"on.wav";
   /** Off wav file */
   final String CLIP_OFF=MEDIA_PATH+"off.wav";
   /** Ring wav file */
   final String CLIP_RING=MEDIA_PATH+"ring.wav";

   /** Ring sound */
   AudioClipPlayer clip_ring;
   /** On sound */
   AudioClipPlayer clip_on;
   /** Off sound */
   AudioClipPlayer clip_off;

	private InputStream inStream;
	private RTMPUser rtmpUser;


   // *********************** Startup Configuration ***********************

   /** UA_IDLE=0 */
   static final String UA_IDLE="IDLE";
   /** UA_INCOMING_CALL=1 */
   static final String UA_INCOMING_CALL="INCOMING_CALL";
   /** UA_OUTGOING_CALL=2 */
   static final String UA_OUTGOING_CALL="OUTGOING_CALL";
   /** UA_ONCALL=3 */
   static final String UA_ONCALL="ONCALL";

   /** Call state
     * <P>UA_IDLE=0, <BR>UA_INCOMING_CALL=1, <BR>UA_OUTGOING_CALL=2, <BR>UA_ONCALL=3 */
   String call_state=UA_IDLE;



   // *************************** Basic methods ***************************

   /** Changes the call state */
   protected void changeStatus(String state)
   {  call_state=state;
      //printLog("state: "+call_state);
   }

   /** Checks the call state */
   protected boolean statusIs(String state)
   {  return call_state.equals(state);
   }

   /** Gets the call state */
   protected String getStatus()
   {  return call_state;
   }

   /** Sets the automatic answer time (default is -1 that means no auto accept mode) */
   public void setAcceptTime(int accept_time)
   {  user_profile.accept_time=accept_time;
   }

   /** Sets the automatic hangup time (default is 0, that corresponds to manual hangup mode) */
   public void setHangupTime(int time)
   {  user_profile.hangup_time=time;
   }

   /** Sets the redirection url (default is null, that is no redircetion) */
   public void setRedirection(String url)
   {  user_profile.redirect_to=url;
   }

   /** Sets the no offer mode for the invite (default is false) */
   public void setNoOfferMode(boolean nooffer)
   {  user_profile.no_offer=nooffer;
   }

   /** Enables audio */
   public void setAudio(boolean enable)
   {  user_profile.audio=enable;
   }

   /** Enables video */
   public void setVideo(boolean enable)
   {  user_profile.video=enable;
   }

   /** Sets the receive only mode */
   public void setReceiveOnlyMode(boolean r_only)
   {  user_profile.recv_only=r_only;
   }

   /** Sets the send only mode */
   public void setSendOnlyMode(boolean s_only)
   {  user_profile.send_only=s_only;
   }

   /** Sets the send tone mode */
   public void setSendToneMode(boolean s_tone)
   {  user_profile.send_tone=s_tone;
   }

   /** Sets the send file */
   public void setSendFile(String file_name)
   {  user_profile.send_file=file_name;
   }

   /** Sets the recv file */
   public void setRecvFile(String file_name)
   {  user_profile.recv_file=file_name;
   }

   /** Gets the local SDP */
   public String getSessionDescriptor()
   {  return local_session;
   }

   /** Sets the local SDP */
   public void setSessionDescriptor(String sdp)
   {  local_session=sdp;
   }

   /** Inits the local SDP (no media spec) */
   public void initSessionDescriptor()
   {  SessionDescriptor sdp=new SessionDescriptor(user_profile.username,sip_provider.getViaAddress());
      local_session=sdp.toString();
   }

   /** Adds a media to the SDP */
   public void addMediaDescriptor(String media, int port, int avp, String codec, int rate)
   {  if (local_session==null) initSessionDescriptor();
      SessionDescriptor sdp=new SessionDescriptor(local_session);
      String attr_param=String.valueOf(avp);
      if (codec!=null) attr_param+=" "+codec+"/"+rate;
      sdp.addMedia(new MediaField(media,port,0,"RTP/AVP",String.valueOf(avp)),new AttributeField("rtpmap",attr_param));
      local_session=sdp.toString();
   }


   // *************************** Public Methods **************************

   /** Costructs a UA with a default media port */
   public SIPUserAgent(SipProvider sip_provider, SIPUserAgentProfile user_profile, SIPUserAgentListener listener, InputStream inStream, RTMPUser rtmpUser)
   {  this.sip_provider=sip_provider;
      this.listener=listener;
      this.user_profile=user_profile;
      this.inStream = inStream;
      this.rtmpUser = rtmpUser;

      // if no contact_url and/or from_url has been set, create it now
      user_profile.initContactAddress(sip_provider);

      // set local sdp
      initSessionDescriptor();
      if (user_profile.audio || !user_profile.video) addMediaDescriptor("audio",user_profile.audio_port,user_profile.audio_avp,user_profile.audio_codec,user_profile.audio_sample_rate);
      if (user_profile.video) addMediaDescriptor("video",user_profile.video_port,user_profile.video_avp,null,0);
   }


   public void call(String target_url)
   {  changeStatus(UA_OUTGOING_CALL);
      call=new ExtendedCall(sip_provider,user_profile.from_url,user_profile.contact_url,user_profile.username,user_profile.realm,user_profile.passwd,this);
      // in case of incomplete url (e.g. only 'user' is present), try to complete it
      target_url=sip_provider.completeNameAddress(target_url).toString();
      if (user_profile.no_offer) call.call(target_url);
      else call.call(target_url,local_session);
   }


   public void setMedia(InputStream inStream, RTMPUser rtmpUser)  {
      this.inStream = inStream;
      this.rtmpUser = rtmpUser;
   }



   /** Waits for an incoming call (acting as UAS). */
   public void listen()
   {  changeStatus(UA_IDLE);
      call=new ExtendedCall(sip_provider,user_profile.from_url,user_profile.contact_url,user_profile.username,user_profile.realm,user_profile.passwd,this);
      call.listen();
   }


   /** Closes an ongoing, incoming, or pending call */
   public void hangup()
   {  if (clip_ring!=null) clip_ring.stop();
      closeMediaApplication();
      if (call!=null) call.hangup();
      changeStatus(UA_IDLE);
   }


   /** Closes an ongoing, incoming, or pending call */
   public void accept()
   {  if (clip_ring!=null) clip_ring.stop();
      if (call!=null) call.accept(local_session);
   }


   /** Redirects an incoming call */
   public void redirect(String redirection)
   {  if (clip_ring!=null) clip_ring.stop();
      if (call!=null) call.redirect(redirection);
   }


   protected void launchMediaApplication()
   {
      // exit if the Media Application is already running
      if (audio_app!=null || video_app!=null)
      {  printLog("DEBUG: media application is already running");
         return;
      }

      if (listener!=null) listener.onUaCallConnected(this);

      SessionDescriptor local_sdp=new SessionDescriptor(call.getLocalSessionDescriptor());
      String local_media_address=(new Parser(local_sdp.getConnection().toString())).skipString().skipString().getString();
      int local_audio_port=0;
      int local_video_port=0;


      // parse local sdp
      for (Enumeration e=local_sdp.getMediaDescriptors().elements(); e.hasMoreElements(); )
      {  MediaField media=((MediaDescriptor)e.nextElement()).getMedia();
         if (media.getMedia().equals("audio"))
            local_audio_port=media.getPort();
         if (media.getMedia().equals("video"))
            local_video_port=media.getPort();
      }
      // parse remote sdp
      SessionDescriptor remote_sdp=new SessionDescriptor(call.getRemoteSessionDescriptor());
      String remote_media_address=(new Parser(remote_sdp.getConnection().toString())).skipString().skipString().getString();
      int remote_audio_port=0;
      int remote_video_port=0;
      for (Enumeration e=remote_sdp.getMediaDescriptors().elements(); e.hasMoreElements(); )
      {  MediaField media=((MediaDescriptor)e.nextElement()).getMedia();
         if (media.getMedia().equals("audio"))
            remote_audio_port=media.getPort();
         if (media.getMedia().equals("video"))
            remote_video_port=media.getPort();
      }

      // select the media direction (send_only, recv_ony, fullduplex)
      int dir=0;
      if (user_profile.recv_only) dir=-1;
      else
      if (user_profile.send_only) dir=1;

      if (user_profile.audio && local_audio_port!=0 && remote_audio_port!=0)
      {  // create an audio_app and start it

         if (audio_app==null) {
           audio_app = new SIPAudioLauncher(local_audio_port, remote_media_address, remote_audio_port, inStream, rtmpUser, user_profile.audio_sample_rate, user_profile.audio_sample_size, user_profile.audio_frame_size);
         }
         audio_app.startMedia();
      }
      if (user_profile.video && local_video_port!=0 && remote_video_port!=0)
      {  // create a video_app and start it

         // else
         if (video_app==null)
         {  printLog("No external video application nor JMF has been provided: Video not started");
            return;
         }
         video_app.startMedia();
      }
   }


   /** Close the Media Application  */
   protected void closeMediaApplication()
   {
 	  printLog("closeMediaApplication");

	  if (audio_app!=null)
      {  audio_app.stopMedia();
         audio_app=null;
      }
      if (video_app!=null)
      {  video_app.stopMedia();
         video_app=null;
      }
   }


   // ********************** Call callback functions **********************

   /** Callback function called when arriving a new INVITE method (incoming call) */
   public void onCallIncoming(Call call, NameAddress callee, NameAddress caller, String sdp, Message invite)
   {  printLog("onCallIncoming()");

      if (call!=this.call) {  printLog("NOT the current call");  return;  }
      printLog("INCOMING");
      //System.out.println("DEBUG: inside SIPUserAgent.onCallIncoming(): sdp=\n"+sdp);
      changeStatus(UA_INCOMING_CALL);
      call.ring();

      if (sdp!=null)
      {  // Create the new SDP
         SessionDescriptor remote_sdp=new SessionDescriptor(sdp);
         SessionDescriptor local_sdp=new SessionDescriptor(local_session);
         SessionDescriptor new_sdp=new SessionDescriptor(remote_sdp.getOrigin(),remote_sdp.getSessionName(),local_sdp.getConnection(),local_sdp.getTime());
         new_sdp.addMediaDescriptors(local_sdp.getMediaDescriptors());
         new_sdp=SdpTools.sdpMediaProduct(new_sdp,remote_sdp.getMediaDescriptors());
         new_sdp=SdpTools.sdpAttirbuteSelection(new_sdp,"rtpmap");
         local_session=new_sdp.toString();
      }
      if (listener!=null) listener.onUaCallIncoming(this,callee,caller);
   }


   /** Callback function called when arriving a new Re-INVITE method (re-inviting/call modify) */
   public void onCallModifying(Call call, String sdp, Message invite)
   {  printLog("onCallModifying()");
      if (call!=this.call) {  printLog("NOT the current call");  return;  }
      printLog("RE-INVITE/MODIFY");
      // to be implemented.
      // currently it simply accepts the session changes (see method onCallModifying() in CallListenerAdapter)
      super.onCallModifying(call,sdp,invite);
   }


   /** Callback function that may be overloaded (extended). Called when arriving a 180 Ringing */
   public void onCallRinging(Call call, Message resp)
   {  printLog("onCallRinging()");
      if (call!=this.call && call!=call_transfer) {  printLog("NOT the current call");  return;  }
      printLog("RINGING");
      // play "on" sound
      if (listener!=null) listener.onUaCallRinging(this);
   }


   /** Callback function called when arriving a 2xx (call accepted) */
   public void onCallAccepted(Call call, String sdp, Message resp)
   {  printLog("onCallAccepted()");
      if (call!=this.call && call!=call_transfer) {  printLog("NOT the current call");  return;  }
      printLog("ACCEPTED/CALL");
      changeStatus(UA_ONCALL);
      if (user_profile.no_offer)
      {  // Create the new SDP
         SessionDescriptor remote_sdp=new SessionDescriptor(sdp);
         SessionDescriptor local_sdp=new SessionDescriptor(local_session);
         SessionDescriptor new_sdp=new SessionDescriptor(remote_sdp.getOrigin(),remote_sdp.getSessionName(),local_sdp.getConnection(),local_sdp.getTime());
         new_sdp.addMediaDescriptors(local_sdp.getMediaDescriptors());
         new_sdp=SdpTools.sdpMediaProduct(new_sdp,remote_sdp.getMediaDescriptors());
         new_sdp=SdpTools.sdpAttirbuteSelection(new_sdp,"rtpmap");


         // update the local SDP
         local_session=new_sdp.toString();
         // answer with the local sdp
         call.ackWithAnswer(local_session);
      }

      launchMediaApplication();

      if (call==call_transfer)
      {  StatusLine status_line=resp.getStatusLine();
         int code=status_line.getCode();
         String reason=status_line.getReason();
         this.call.notify(code,reason);
      }

      if (listener!=null) listener.onUaCallAccepted(this);
   }


   /** Callback function called when arriving an ACK method (call confirmed) */
   public void onCallConfirmed(Call call, String sdp, Message ack)
   {  printLog("onCallConfirmed()");
      if (call!=this.call) {  printLog("NOT the current call");  return;  }
      printLog("CONFIRMED/CALL");
      changeStatus(UA_ONCALL);
      // play "on" sound
      if (clip_on!=null) clip_on.replay();
      launchMediaApplication();
    }


   /** Callback function called when arriving a 2xx (re-invite/modify accepted) */
   public void onCallReInviteAccepted(Call call, String sdp, Message resp)
   {  printLog("onCallReInviteAccepted()");
      if (call!=this.call) {  printLog("NOT the current call");  return;  }
      printLog("RE-INVITE-ACCEPTED/CALL");
   }


   /** Callback function called when arriving a 4xx (re-invite/modify failure) */
   public void onCallReInviteRefused(Call call, String reason, Message resp)
   {  printLog("onCallReInviteRefused()");
      if (call!=this.call) {  printLog("NOT the current call");  return;  }
      printLog("RE-INVITE-REFUSED ("+reason+")/CALL");
      if (listener!=null) listener.onUaCallFailed(this);
   }


   /** Callback function called when arriving a 4xx (call failure) */
   public void onCallRefused(Call call, String reason, Message resp)
   {  printLog("onCallRefused()");

      if (call!=this.call) {  printLog("NOT the current call");  return;  }
      printLog("REFUSED ("+reason+")");
      changeStatus(UA_IDLE);

      if (call==call_transfer)
      {  StatusLine status_line=resp.getStatusLine();
         int code=status_line.getCode();
         //String reason=status_line.getReason();
         this.call.notify(code,reason);
         call_transfer=null;
      }
      if (listener!=null) listener.onUaCallFailed(this);
   }


   /** Callback function called when arriving a 3xx (call redirection) */
   public void onCallRedirection(Call call, String reason, Vector contact_list, Message resp)
   {  printLog("onCallRedirection()");
      if (call!=this.call) {  printLog("NOT the current call");  return;  }
      printLog("REDIRECTION ("+reason+")");
      call.call(((String)contact_list.elementAt(0)));
   }


   /** Callback function that may be overloaded (extended). Called when arriving a CANCEL request */
   public void onCallCanceling(Call call, Message cancel)
   {  printLog("onCallCanceling()");
      if (call!=this.call) {  printLog("NOT the current call");  return;  }
      printLog("CANCEL");
      changeStatus(UA_IDLE);
      if (listener!=null) listener.onUaCallCancelled(this);
   }


   /** Callback function called when arriving a BYE request */
   public void onCallClosing(Call call, Message bye)
   {  printLog("onCallClosing()");
      if (call!=this.call && call!=call_transfer) {  printLog("NOT the current call");  return;  }
      if (call!=call_transfer && call_transfer!=null)
      {  printLog("CLOSE PREVIOUS CALL");
         this.call=call_transfer;
         call_transfer=null;
         return;
      }
      // else
      printLog("CLOSE");
      closeMediaApplication();
      // play "off" sound
      if (clip_off!=null) clip_off.replay();
      if (listener!=null) listener.onUaCallClosed(this);
      changeStatus(UA_IDLE);
   }


   /** Callback function called when arriving a response after a BYE request (call closed) */
   public void onCallClosed(Call call, Message resp)
   {  printLog("onCallClosed()");
      if (call!=this.call) {  printLog("NOT the current call");  return;  }
      printLog("CLOSE/OK");
      if (listener!=null) listener.onUaCallClosed(this);
      changeStatus(UA_IDLE);
   }

   /** Callback function called when the invite expires */
   public void onCallTimeout(Call call)
   {  printLog("onCallTimeout()");
      if (call!=this.call) {  printLog("NOT the current call");  return;  }
      printLog("NOT FOUND/TIMEOUT");
      changeStatus(UA_IDLE);

      if (call==call_transfer)
      {  int code=408;
         String reason="Request Timeout";
         this.call.notify(code,reason);
         call_transfer=null;
      }
      // play "off" sound
      if (clip_off!=null) clip_off.replay();
      if (listener!=null) listener.onUaCallFailed(this);
   }



   // ****************** ExtendedCall callback functions ******************

   /** Callback function called when arriving a new REFER method (transfer request) */
   public void onCallTransfer(ExtendedCall call, NameAddress refer_to, NameAddress refered_by, Message refer)
   {  printLog("onCallTransfer()");
      if (call!=this.call) {  printLog("NOT the current call");  return;  }
      printLog("Transfer to "+refer_to.toString());
      call.acceptTransfer();
      call_transfer=new ExtendedCall(sip_provider,user_profile.from_url,user_profile.contact_url,this);
      call_transfer.call(refer_to.toString(),local_session);
   }

   /** Callback function called when a call transfer is accepted. */
   public void onCallTransferAccepted(ExtendedCall call, Message resp)
   {  printLog("onCallTransferAccepted()");
      if (call!=this.call) {  printLog("NOT the current call");  return;  }
      printLog("Transfer accepted");
   }

   /** Callback function called when a call transfer is refused. */
   public void onCallTransferRefused(ExtendedCall call, String reason, Message resp)
   {  printLog("onCallTransferRefused()");
      if (call!=this.call) {  printLog("NOT the current call");  return;  }
      printLog("Transfer refused");
   }

   /** Callback function called when a call transfer is successfully completed */
   public void onCallTransferSuccess(ExtendedCall call, Message notify)
   {  printLog("onCallTransferSuccess()");
      if (call!=this.call) {  printLog("NOT the current call");  return;  }
      printLog("Transfer successed");
      call.hangup();
      if (listener!=null) listener.onUaCallTrasferred(this);
   }

   /** Callback function called when a call transfer is NOT sucessfully completed */
   public void onCallTransferFailure(ExtendedCall call, String reason, Message notify)
   {  printLog("onCallTransferFailure()");
      if (call!=this.call) {  printLog("NOT the current call");  return;  }
      printLog("Transfer failed");
   }



   private void printLog(String str) {
		log.debug(str);
   }
}
