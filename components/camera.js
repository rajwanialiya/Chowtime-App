import * as React from "react";
import { requireNativeComponent, Button, StyleSheet } from "react-native"; 
import { createStackNavigator } from "@react-navigation/stack";
import { CameraScreen } from "./cameraScreen";
import { PictureScreen } from "./pictureScreen";

const CameraNavigator = createStackNavigator();
const Bulb = requireNativeComponent("Bulb")

export default function CameraStack() {
  return (  
    NativeModules.Camera.navigateToExample()

    // <CameraNavigator.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //   }}
    // >
    //   <CameraNavigator.Screen name="PictureScreen" component={PictureScreen} />
    //   <CameraNavigator.Screen
    //     name="CameraCapture"
    //     component={CameraScreen}
    //     options={{ tabBarVisible: false }}
    //   />
    // </CameraNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  top: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  });