package com.example.appiumcallstestfairy;

import android.app.Service;
import android.content.Intent;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;

import com.testfairy.TestFairy;

public class TestFairyService extends Service {

	@Nullable
	@Override
	public IBinder onBind(Intent intent) {
		return null;
	}

	@Override
	public int onStartCommand(Intent intent, int flags, int startId) {
		Bundle extras = intent.getExtras();
		if (extras != null && extras.containsKey("args")) {
			String args = extras.getString("args");
			String[] splitArgs = args.split(",,,");

			switch (splitArgs[0]) {
				case "begin":
					begin(splitArgs[1]);
					break;
				case "addEvent":
					addEvent(splitArgs[1]);
					break;
				case "stop":
					stop();
					break;
				default:
					break;
			}
		}

		stopSelf();

		return super.onStartCommand(intent, flags, startId);
	}

	private void begin(String appToken) {
		TestFairy.begin(getApplicationContext(), appToken);

		Log.d("TestFairyService", "TestFairy started recording a session");
	}

	private void addEvent(String event) {
		TestFairy.addEvent(event);

		Log.d("TestFairyService", "Sent '" + event + "' to TestFairy");
	}

	private void stop() {
		final String url = TestFairy.getSessionUrl();
		TestFairy.stop();

		Log.d("TestFairyService", "TestFairy stopped recording a session: " + url);
	}
}
