![http://red5phone.googlecode.com/files/red5phone.jpg](http://red5phone.googlecode.com/files/red5phone.jpg)

**SIP Application for [Red5 1.0](https://code.google.com/p/red5/)
http://red5phone.googlecode.com/svn/branches/red5_1.0_compatibility**

You would need to upgrade to Flash Player 11.0 to use this version. It supports only the G711 ulaw codec available in Flash Player 11.0. Nellymoser encoding/decoding has been removed.

Older versions are still available here <br />
http://red5phone.googlecode.com/files/sip_r54.zip.<br />
http://red5phone.googlecode.com/files/sip_r53.zip<br />

**New project** "red5sip" is available as a branch at "https://red5phone.googlecode.com/svn"
See http://incubator.apache.org/openmeetings/red5sip-integration.html and https://cwiki.apache.org/OPENMEETINGS/red5sip.html for details

Unzip and move the sip folder to webapps.

**You will need to install Red5 server 0.9.1** Run red5phone application with http://your_red5_server:5080/sip


To checkout SVN use http://red5phone.googlecode.com/svn/branches/improvements/sip/


---


![http://red5phone.googlecode.com/files/flashphone4.jpg](http://red5phone.googlecode.com/files/flashphone4.jpg)


---


Changelog

[R63](https://code.google.com/p/red5phone/source/detail?r=63)

---

Repackaged to avoid confusion and to allow sharing between standalone and red5 app versions. Created Maven pom. Made compatible with Red5 server 1.0.

[R54](https://code.google.com/p/red5phone/source/detail?r=54)

---

Removed Nellymoser codec and now only supports G711 (ulaw) for now. Flex client has been modified. The laszlo versions may not work. They were not modified, recompiled or tested.

[R53](https://code.google.com/p/red5phone/source/detail?r=53)

---

Flex softphone compiled for Flash Player 10.3 to use Enhanced Microphone with no echo

[R47](https://code.google.com/p/red5phone/source/detail?r=47)

---

Updated Asao codec. Decoder and encoder both working ok. Bandwidth is now 8k in both directions.

[R42](https://code.google.com/p/red5phone/source/detail?r=42)

---

Fixed audio delay by adding timestamp using OS clock.

[R40](https://code.google.com/p/red5phone/source/detail?r=40)

---

Compatible with 0.9.1. Fixed [issue 89](https://code.google.com/p/red5phone/issues/detail?id=89).


[R30](https://code.google.com/p/red5phone/source/detail?r=30)-[R39](https://code.google.com/p/red5phone/source/detail?r=39)

---

Improvements by Rafael

[R29](https://code.google.com/p/red5phone/source/detail?r=29)

---

Incoming call failt falt fixed by Marcin Balcer

[R28](https://code.google.com/p/red5phone/source/detail?r=28)

---

Timestamp fix by Rafael on RTPSender
Ignore non-audio RTP packets for RTMP audio by Naoki

Transfer feature by  Lior

Blind transfer button to be used as followed:

> a. register to your proxy
> b. make a call or get a call (than the transfer button will show up after call is answered)
> c. change the text of the dialed number to the number you want to transfer the call too
> d. press transfer button.


Conference feature using transfer by Dele

> a. set your conference number
> b. call person. click on conference button to put caller in conference
> c. do that for all participants and click on conference icon to join confeence


[R27](https://code.google.com/p/red5phone/source/detail?r=27)

---

**Dele Olajide**
Made red5phone compatible with Red5 server 0.8.0

**Lior Herman**
Added outbound proxy settings in flex object, to solve realm problems.

Fixed DTMF. Tested with UK PSTN and works ok.
Added Nellymoser encoder from Joseph Artsimovich (jart@users.sourceforge.net).


**Mauro Brasil, Rafael and UOL (www.uol.co.br) contributions**

Cleaned up the code

Implemented multi-codec support for Red5phone (PCMU, PCMA, iLBC and G.729). G.729 requires payment of royalities and license rights if used.

Adjustments to support different packetization were made as well.

**Prabhu Tamilarasan contributions**

Normalize function to improve volume

**Lior Herman contributions**

Red5phone show busy or rejected message for busy outgoing calls.

Openlaszlo and Javascript API made compatible with latest chages to Red5phone
Add Dial external command to Flex to dial from a link.

Used UID (unique identifier) in Flex instead of the username value for binding the sipprovider object in Mjsip. Now you can use same sip account to register from multiple remote locations.

Changed registration of red5phone using phone@sip\_provider.getViaAddress() instead of phone@realm

Mjsip now uses Outboundproxy = Proxy like that all sip headers using realm, but the message is send to the proxy ip.

Process of OPTIONS messages in Mjsip some sbc’s using to check call keep alive.

Fix authentication header for REG and INVITE to use cnounce value when proxy send qop= auth in 401 or 407 message.

Fix red5phone application close for complete unregister before sipprovider.halt is execute.

Fix the microphone.init in Flex to not be bind to the REGISTER SUCCESS message as it can be many SUCCESS messages coming during a call and mic need to be init only once.

Fix Cancel message for Invite (call) that have not been answered yet. When you want hangup a call before the remote user answered Mjsip send wrong Cseq in Cancel message.
Fixed NullException error when application is closed in provider.halt() its try to close a null tcp\_socket and get Null exception back. Fix is in org.zoolu.net.TcpServer.java in the end of the file.

**Janny\_buh contribution**

Patch all sip Register message using same Call-ID header and increment Cseq as recommended by RFC3261.