package org.red5.server.webapp.sip;


import org.zoolu.sip.address.NameAddress;
import org.zoolu.sip.message.Message;


/** Listener of RegisterAgent */
public interface SIPRegisterAgentListener
{
   /** When a UA has been successfully (un)registered. */
   public void onUaRegistrationSuccess(SIPRegisterAgent ra, NameAddress target, NameAddress contact, String result);

   /** When a UA failed on (un)registering. */
   public void onUaRegistrationFailure(SIPRegisterAgent ra, NameAddress target, NameAddress contact, String result);

}
