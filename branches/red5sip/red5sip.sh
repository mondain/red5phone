#!/bin/sh

if [ -z "$RED5SIP_HOME" ]; then
  export RED5SIP_HOME=`pwd`;
fi


JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:bin/java::")
LIB_DIR=$RED5SIP_HOME/lib
LOGS_DIR=$RED5SIP_HOME/log
SETTINGS_FILE=$RED5SIP_HOME/settings.properties
CLASSPATH=$(echo $LIB_DIR/*.jar | sed 's/ /:/g')

echo "Starting Red5SIP"
exec $JAVA_HOME/bin/java -Dlogs=$LOGS_DIR -cp $CLASSPATH org.red5.sip.app.Main $SETTINGS_FILE

