
ifeq ($(OS),Windows_NT)
	JAVA_HOME := $(PROGRAMFILES)\Java\jdk1.8.0_181
	PATH := $(PATH);$(PROGRAMFILES)\Java\jdk1.8.0_181\bin
	PATH := $(PATH);$(APPDATA)\..\Local\Android\Sdk\build-tools\29.0.2

	WORSPACE := $(CURDIR)
	APK_DIR := $(WORSPACE)\platforms\android\app\build\outputs\apk\release
	TARGET_DIR := $(WORSPACE)\final
else
	ANDROID_HOME := /home/guilherme/Android/Sdk
	PATH := $(PATH):$(ANDROID_HOME)/tools:$(ANDROID_HOME)/platform-tools
	PATH := $(PATH):$(ANDROID_HOME)/build-tools/29.0.2

	WORSPACE := $(CURDIR)
	APK_DIR := $(WORSPACE)/platforms/android/app/build/outputs/apk/release
	TARGET_DIR := $(WORSPACE)/final
endif
	
setup:
	npm install
	ionic cordova prepare

run-app:
	ionic cordova run android

build-apk:
	mkdir $(APK_DIR) || exit 0
	mkdir $(TARGET_DIR) || exit 0
	cp google-services.json $(WORSPACE)/platforms/android/app/ || exit 0
	ionic cordova build --release android

generate-apk:
	del /q /s "$(TARGET_DIR)/jandaia.apk" || true
	jarsigner -verbose \
		-sigalg SHA1withRSA \
		-digestalg SHA1 \
		-keystore Jandaia.keystore "$(APK_DIR)/app-release-unsigned.apk" Jandaia
	zipalign \
		-v 4 "$(APK_DIR)/app-release-unsigned.apk" "$(TARGET_DIR)/jandaia.apk"

build-final: build-apk generate-apk

# keytool.exe ^
# -genkey -v ^
# -keystore Jandaia.keystore ^
# -alias Jandaia ^
# -keyalg RSA ^
# -keysize 2048 ^
# -validity 10000 ^
# -dname "cn=Guilherme Ferreira, ou=Development, o=Jandaia, l=Itajuba , st=Minas Gerais, c=BR"