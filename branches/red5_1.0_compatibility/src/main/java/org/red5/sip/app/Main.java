package org.red5.sip.app;

public class Main {

    public static void main(String[] args) {
        Application main = new Application();
        if(main.init(args)) {
	        try {
	            main.start();
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
        }
    }
}
