package chowtime; // replace com.your-app-name with your app’s name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class CalendarModule extends ReactContextBaseJavaModule {
    CalendarModule(ReactApplicationContext context) {
        super(context);
    }
}

@Override
public String getName() {
    return "CalendarModule";
}

import android.util.Log;

@ReactMethod
public void createCalendarEvent(String name, String location) {
        Log.d("CalendarModule", "Create event called with name: " + name
        + " and location: " + location);
}