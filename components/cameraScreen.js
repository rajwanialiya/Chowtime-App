import * as React from "react";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import { SimpleLineIcons } from "@expo/vector-icons";
import { view, title, subtitle, chip, coloredSection } from "../styles";
import { green } from "../styles";
import { AsyncStorage } from "react-native";

export function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const isFocused = useIsFocused();

  React.useLayoutEffect(() => {
    navigation.setOptions({ tabBarVisible: false });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  takePicture = async () => {
    if (this.camera) {
      await this.camera.takePictureAsync({
        onPictureSaved: this.onPictureSaved,
        quality: 0.2,
      });
    }
  };
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  onPictureSaved = async (photo) => {
    console.log(photo);

    var imageList = [];
    var existingImages = false;
    try {
      const value = await AsyncStorage.getItem("@Images");
      console.log("this is value: ");
      console.log(value);
      console.log(value == "null");
      const valueObject = JSON.parse(value);
      if (valueObject && valueObject.length > 0) {
        existingImages = true;
        for (var i = 0; i < valueObject.length; i++) {
          imageList.push(valueObject[i]);
        }
      }
      imageList.unshift({ uri: photo.uri, id: makeid(8) });
      await AsyncStorage.setItem("@Images", JSON.stringify(imageList));
    } catch (error) {
      // Error saving data
      console.log(error);
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "PictureScreen" }],
    });
  };

  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.view}>
      {isFocused && (
        <Camera
          ratio="2:1"
          style={{ width: windowWidth, height: windowWidth * 2 }}
          type={type}
          ref={(ref) => {
            this.camera = ref;
          }}
        ></Camera>
      )}
      <View style={styles.captureButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            takePicture();
          }}
        >
          <SimpleLineIcons name="camera" size={42} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    ...view,
  },
  captureButtonContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 30,
  },
});
