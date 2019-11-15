# ITMS-90338: Non-public API usage

https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/209#issuecomment-509600208

I had the same error this morning with an app I've published a few days ago for the last time.
After adding some bug fixes, this morning, I wasn't able to upload again the app.

I've solved with:

cordova plugin rm cordova-plugin-ionic-webview
rm -rf node_modules
cordova plugin add cordova-plugin-ionic-webview@4.1.0
npm install
ionic cordova build ios --prod 

I can confirm that @4.1.1 doesn't work.

I've removed the plugin: cordova.plugins.diagnostic because non used, but I don't think that was causing the problem.

## problema node-sass

sudo npm install --save-dev --unsafe-perm node-sass

# 2 ITMS-90683: Missing Purpose String in Info.plist 
Vai ser gerado um arquivo 'platforms\ios\Jandaia\Jandaia-Info.plist' depois de rodar 'ionic cordova build ios --prod'

Adicione Isso: 

<key>NSCalendarsUsageDescription</key>
<string>This app need to access your calendar events</string>




