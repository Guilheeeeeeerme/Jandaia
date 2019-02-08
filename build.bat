set JAVA_HOME=C:\Program Files\Java\jdk1.8.0_201
SET PATH=%PATH%;C:\Program Files\Java\jdk1.8.0_201\bin
SET PATH=%PATH%;C:\Users\Guilherme\AppData\Local\Android\Sdk\build-tools\28.0.3

REM npm install
REM ionic cordova prepare

REM ionic cordova build --release android
REM exit

REM ionic cordova build ios --verbose

ionic cordova run android
exit

REM del /q /s Jandaia.keystore
del /q /s "C:\Users\Guilherme\Dropbox\Jandaia\jandaia.apk"

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
REM -dname "cn=Guilherme Ferreira, ou=Development, o=Jandaia, l=Itajuba , st=Minas Gerais, c=BR"

cls
echo 'jarsigner !!!'
pause

jarsigner.exe ^
-verbose ^
-sigalg SHA1withRSA ^
-digestalg SHA1 ^
-keystore Jandaia.keystore "C:\Users\Guilherme\Desktop\Jandaia\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" Jandaia

cls
echo 'zipalign !!!'
pause

zipalign.exe ^
-v 4 "C:\Users\Guilherme\Desktop\Jandaia\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" "C:\Users\Guilherme\Dropbox\Jandaia\jandaia.apk"