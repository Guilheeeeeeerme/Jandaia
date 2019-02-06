set JAVA_HOME=C:\Program Files\Java\jdk1.8.0_201
SET PATH=%PATH%;C:\Program Files\Java\jdk1.8.0_201\bin
SET PATH=%PATH%;C:\Users\Guilherme\AppData\Local\Android\Sdk\build-tools\28.0.3

REM ionic cordova build --release android
REM ionic cordova build ios --verbose

ionic cordova run android
exit;

REM del /q /s Jandaia.keystore
del /q /s jandaia.apk
del /q /s ..\jandaia.apk

cls
echo 'Keytool !!!'
pause

REM keytool.exe ^
REM -genkey -v ^
REM -keystore Jandaia.keystore ^
REM -alias Jandaia ^
REM -keyalg RSA ^
REM -keysize 2048 ^
REM -validity 10000 ^
REM -dname "CN=Guilherme Ferreira, OU=Development, O=Jandaia, L=Itajub , ST=Minas Gerais, C=BR"

cls
echo 'jarsigner !!!'
pause

jarsigner.exe ^
-verbose ^
-sigalg SHA1withRSA ^
-digestalg SHA1 ^
-keystore Jandaia.keystore "C:\Users\Guilherme\Dropbox\Jandaia\Jandaia\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" Jandaia

cls
echo 'zipalign !!!'
pause

zipalign.exe ^
-v 4 "C:\Users\Guilherme\Dropbox\Jandaia\Jandaia\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" ..\jandaia.apk