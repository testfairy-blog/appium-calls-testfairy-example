const webdriverio = require('webdriverio');
const androidOptions = require('../../helpers/caps').androidOptions;
const app = require('../../helpers/apps').androidApiDemos;
const assert = require('chai').assert;

androidOptions.capabilities.app = app;

/**
 * Starts recording a TestFaiy session.
 * 
 * @param client wdio client
 * @param appToken TestFairy app token can be found at https://app.testfairy.com/settings
 */
async function begin(client, appToken) {
  client.startActivity()
  const args = "begin,,," + appToken
  await client.execute('mobile: startService', {
    intent: '--es "args" "' + args + '" com.example.appiumcallstestfairy/.TestFairyService',
  });
}

/**
 * This helps us simulate a long running operation usually found in tests.
 */
async function wait() {
  await new Promise(function(resolve) {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

/**
 * Sends a string event to currently recorded session. It will show up in the session timeline.
 * Multiple sessions that has the same event can be searched at https://app.testfairy.com/sessions
 * 
 * @param client wdio client
 * @param event Some string value to represent a significant event happening during tests
 */
async function addEvent(client, event) {
  const args = "addEvent,,," + event
  await client.execute('mobile: startService', {
    intent: '--es "args" "' + args + '" com.example.appiumcallstestfairy/.TestFairyService',
  });
}

/**
 * Stops recording a TestFairy session.
 * 
 * @param client wdio client
 */
async function stop(client) {
  const args = "stop"
  await client.execute('mobile: startService', {
    intent: '--es "args" "' + args + '" com.example.appiumcallstestfairy/.TestFairyService',
  });
}

// Test suite
describe('Create TestFairy session', function () {
  let client;

  before(async function () {
    client = await webdriverio.remote(androidOptions);
  });

  it('should create and destroy a session', async function () {
    const res = await client.status();
    assert.isObject(res.build);

    const current_package = await client.getCurrentPackage();
    assert.equal(current_package, 'com.example.appiumcallstestfairy');

    console.log("Starting a TestFairy session");

    await begin(client, "SDK-XXXXXXX"); // TestFairy app token can be found at https://app.testfairy.com/settings
    await wait();
    await addEvent(client, "Waited a few seconds, this will show up in session timeline");
    await wait();
    await stop(client);
    await wait();

    console.log("Ending TestFairy session");

    const delete_session = await client.deleteSession();
    assert.isNull(delete_session);
  });
});
