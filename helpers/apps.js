const path = require('path');

if (process.env.SAUCE_LABS) {
  exports.androidApiDemos = 'http://appium.github.io/appium/assets/ApiDemos-debug.apk';
} else {
  exports.androidApiDemos = path.resolve('apps/app-debug.apk');
}
