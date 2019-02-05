set JAVA_HOME=C:\Program Files\Java\jdk1.8.0_201
SET PATH=%PATH%;C:\Program Files\Java\jdk1.8.0_201\bin
SET PATH=%PATH%;C:\Users\Guilherme\AppData\Local\Android\Sdk\build-tools\28.0.3

REM ionic cordova build --release android
REM ionic cordova build --release android
REM ionic cordova build ios --verbose
REM ionic cordova run android

del Jandaia.keystore
del jandaia.apk

keytool.exe ^
-genkey -v ^
-keystore Jandaia.keystore ^
-alias Jandaia ^
-keyalg RSA ^
-keysize 2048 ^
-validity 10000 ^
-dname "CN=Guilherme Ferreira, OU=Development, O=Jandaia, L=Itajub , ST=Minas Gerais, C=BR"

jarsigner.exe ^
-verbose ^
-sigalg SHA1withRSA ^
-digestalg SHA1 ^
-keystore Jandaia.keystore "C:\Users\Guilherme\Desktop\Jandaia\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" Jandaia

zipalign.exe ^
-v 4 "C:\Users\Guilherme\Desktop\Jandaia\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" jandaia.apk

