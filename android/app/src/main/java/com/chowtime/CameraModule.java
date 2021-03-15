// package com.chowtime;

// import com.facebook.react.uimanager.SimpleViewManager;
// import com.facebook.react.uimanager.ThemedReactContext;


// public class CameraManager extends SimpleViewManager<BulbView> {

//     @Override
//     public String getName() {
//         return "Camera";
//     }

//     @Override
//     protected CameraView createViewInstance(ThemedReactContext reactContext) {
//         return new CameraView(reactContext);
//     }
// }

package com.chowtime;

import android.content.Intent;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CameraModule extends ReactContextBaseJavaModule {
    CameraModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public void initialize() {
        super.initialize();
    }

    @Override
    public String getName() {
        return "Camera";
    }

    @ReactMethod
    void navigateToExample() {
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, Camera.class);
        context.startActivity(intent);
    }
}