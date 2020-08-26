import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CameraScreen } from "./cameraScreen";
import { PictureScreen } from "./pictureScreen";

const CameraNavigator = createStackNavigator();

export default function CameraStack() {
  return (
    <CameraNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CameraNavigator.Screen name="PictureScreen" component={PictureScreen} />
      <CameraNavigator.Screen
        name="CameraCapture"
        component={CameraScreen}
        options={{ tabBarVisible: false }}
      />
    </CameraNavigator.Navigator>
  );
}

