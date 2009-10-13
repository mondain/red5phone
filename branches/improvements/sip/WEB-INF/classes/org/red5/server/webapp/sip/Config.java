package org.red5.server.webapp.sip;

import java.io.File;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;


public class Config {

	private String codecsPrecedence;

	private static Config singletonConfig;

	private Config() {
		
		String appPath = System.getProperty( "user.dir" );		
		String configFile = appPath + File.separator + "webapps"
				+ File.separator + "sip" + File.separator + "red5phone.xml";
        
        try {
	        DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
	        DocumentBuilder docBuilder = docBuilderFactory.newDocumentBuilder();
	        Document doc = docBuilder.parse (new File(configFile));
	        
	        Element tagCodecsPrecedence = (Element) doc.getElementsByTagName("codecsPrecedence").item(0);
	        codecsPrecedence = tagCodecsPrecedence.getTextContent();
	        
	        System.out.println(String.format("Read config file: %s", configFile));
	        
        }catch (Throwable t) {
        	t.printStackTrace ();
        }
	}

	public static Config getInstance() {

		if (singletonConfig == null) {

			singletonConfig = new Config();
		}
		
		return singletonConfig;
	}

	public String getCodecsPrecedence() {
		return codecsPrecedence;
	}

}
