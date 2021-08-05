package com.example.appiumcallstestfairy;

import android.app.Service;
import android.content.Intent;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.Nullable;

import com.testfairy.TestFairy;

import org.json.JSONArray;
import org.json.JSONException;

import java.nio.charset.StandardCharsets;

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
			try {
				final String args = extras.getString("args");
				final JSONArray argsArray = new JSONArray(new String(Base64.decode(args, Base64.DEFAULT), StandardCharsets.UTF_8));

				switch (argsArray.getString(0)) {
					case "begin":
						begin(argsArray.getString(1));
						break;
					case "addEvent":
						addEvent(argsArray.getString(1));
						break;
					case "stop":
						stop();
						break;
					default:
						break;
				}
			} catch (JSONException t) {
				Log.w("TestFairyService", "Can't invoke TestFairy", t);
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
