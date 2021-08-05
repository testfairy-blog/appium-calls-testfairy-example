const DEFAULT_ANDROID_DEVICE_NAME = process.env.SAUCE
  ? 'Android GoogleAPI Emulator'
  : 'My Android Device';
const DEFAULT_ANDROID_PLATFORM_VERSION = process.env.SAUCE ? '10' : null;

const androidCaps = {
  platformName: 'Android',
  deviceName: process.env.ANDROID_DEVICE_NAME || DEFAULT_ANDROID_DEVICE_NAME,
  platformVersion:
    process.env.ANDROID_PLATFORM_VERSION || DEFAULT_ANDROID_PLATFORM_VERSION,
  autoGrantPermissions: true,
  noReset: false,
  fullReset: true,
  allowTestPackages: true,
  
  automationName: 'UiAutomator2',
  // automationName: 'Espresso',
  // espressoBuildConfig: '{ "additionalAppDependencies": [ "com.google.android.material:material:1.0.0", "androidx.lifecycle:lifecycle-extensions:2.1.0" ] }',
  
  app: undefined // Will be added in tests
};

const serverConfig = {
  path: '/wd/hub',
  host: process.env.APPIUM_HOST || 'localhost',
  port: process.env.APPIUM_PORT || 4723,
  logLevel: 'info'
};

const androidOptions = Object.assign(
  {
    capabilities: androidCaps,
  },
  serverConfig
);


module.exports = {
  androidOptions
};
