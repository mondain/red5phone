#!/bin/sh

if [ -z "$RED5SIP_HOME" ]; then
  export RED5SIP_HOME=`pwd`;
fi


JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:bin/java::")
LOGS_DIR=$RED5SIP_HOME/log
SETTINGS_FILE=$RED5SIP_HOME/settings.properties

echo "Starting Red5SIP"
exec $JAVA_HOME/bin/java -Dlogs=$LOGS_DIR -cp ".:$RED5SIP_HOME/lib/*:$RED5SIP_HOME/out/lib/*" org.red5.sip.app.Main $SETTINGS_FILE

