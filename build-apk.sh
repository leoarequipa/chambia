#!/bin/bash
export JAVA_HOME=$HOME/jdk-21
export PATH=$JAVA_HOME/bin:$PATH
cd /home/leono/src/chambia/android
./gradlew assembleDebug
