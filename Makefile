
export JAVA_HOME = C:\Program Files\Java\jdk1.8.0_181
export PATH := $(PATH);C:\Program Files\Java\jdk1.8.0_181\bin
export PATH := $(PATH);C:\Users\Guilherme\AppData\Local\Android\Sdk\build-tools\29.0.2

# set-path:
# 	SET JAVA_HOME=C:\Program Files\Java\jdk1.8.0_181
# 	SET PATH=%PATH%;C:\Program Files\Java\jdk1.8.0_181\bin
# 	SET PATH=%PATH%;C:\Users\Guilherme\AppData\Local\Android\Sdk\build-tools\28.0.3
	
setup:
	npm install
	ionic cordova prepare

run-app:
	ionic cordova run android

build-apk:
	ionic cordova build --release android

generate-apk:
	del /q /s "C:\Users\Guilherme\Dropbox\Jandaia2\jandaia.apk" || true
	jarsigner.exe -verbose \
		-sigalg SHA1withRSA \
		-digestalg SHA1 \
		-keystore Jandaia.keystore "C:\Users\Guilherme\Desktop\Jandaia\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" Jandaia
	zipalign.exe \
		-v 4 "C:\Users\Guilherme\Desktop\Jandaia\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk" "C:\Users\Guilherme\Dropbox\Jandaia2\jandaia.apk"

build-final: build-apk generate-apk

# keytool.exe ^
# -genkey -v ^
# -keystore Jandaia.keystore ^
# -alias Jandaia ^
# -keyalg RSA ^
# -keysize 2048 ^
# -validity 10000 ^
# -dname "cn=Guilherme Ferreira, ou=Development, o=Jandaia, l=Itajuba , st=Minas Gerais, c=BR"