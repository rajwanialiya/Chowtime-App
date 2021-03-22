import * as React from "react";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import * as Permissions from 'expo-permissions';
import * as Device from 'expo-device';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image,} from "react-native";
import { Camera } from "expo-camera";
import { SimpleLineIcons } from "@expo/vector-icons";
import {global, view,
  title, green, red, spaceBetweenView } from "../styles";
import { AsyncStorage, Alert } from "react-native";
import { Provider as PaperProvider, Text, IconButton } from "react-native-paper";
import EmptyPage from "./empty.js";
import { SolidButton } from "./buttons/solidButton.js";
const EmptyPng = require("../assets/empty-recipe.png");

import * as tf from '@tensorflow/tfjs';
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const isFocused = useIsFocused();

  const TensorCamera = cameraWithTensors(Camera);
  let requestAnimationFrameId = 0;

  //performance hacks (Platform dependent)
  const textureDims = Platform.OS === "ios"? { width: 1080, height: 1920 } : { width: 1600, height: 1200 };
  const tensorDims = { width: 152, height: 200 }; 

  React.useLayoutEffect(() => {
    navigation.setOptions({ tabBarVisible: false });
  }, [navigation]);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // takePicture = async () => {
  //   if (this.camera) {
  //     await this.camera.takePictureAsync({
  //       onPictureSaved: this.onPictureSaved,
  //       quality: 0.2,
  //     });
  //   }
  // };
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const handleCameraStream = async (imageAsTensors) => {
    console.log("hi")
    // const loop = async () => {
    //   const tensor = await imageAsTensors.next().value;
    //   const [height, width] = tensor.shape
    //   const data = new Buffer(
    //     // concat with an extra alpha channel and slice up to 4 channels to handle 3 and 4 channels tensors
    //     tf.concat([tensor, tf.ones([height, width, 1]).mul(255)], [-1])
    //       .slice([0], [height, width, 4])
    //       .dataSync(),
    //   )
  
    //   const rawImageData = {data, width, height};
    //   const jpegImageData = jpeg.encode(rawImageData, 200);
  
    //   const imgBase64 = tf.util.decodeString(jpegImageData.data, "base64")
    //   const salt = `${Date.now()}-${Math.floor(Math.random() * 10000)}`
    //   const uri = FileSystem.documentDirectory + `tensor-${salt}.jpg`;
    //   await FileSystem.writeAsStringAsync(uri, imgBase64, {
    //     encoding: FileSystem.EncodingType.Base64,
    //   });
  
    //   console.log("started")
  
    //   const tessOptions = { level: LEVEL_WORD };
    //   console.log(TesseractOcr);
    //   const result = await TesseractOcr.recognize(uri, LANG_ENGLISH, tessOptions);
    //   console.log("finished")
    //   console.log(result)
  
    //   setUri(uri)
    //   // return {uri, width, height}
    // };
    // // requestAnimationFrameId = requestAnimationFrame(loop);
    // !uri ? setTimeout(() => loop(), 2000) : null;
  }

  // function makeid(length) {
  //   var result = "";
  //   var characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   var charactersLength = characters.length;
  //   for (var i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }

  // onPictureSaved = async (photo) => {
  //   var imageList = [];
  //   var existingImages = false;
  //   try {
  //     const value = await AsyncStorage.getItem("@Images");
  //     const valueObject = JSON.parse(value);

  //     if (valueObject && valueObject !== null && valueObject.length > 0) {
  //       existingImages = true;
  //       for (var i = 0; i < valueObject.length; i++) {
  //         imageList.push(valueObject[i]);
  //       }
  //     }
  //     imageList.unshift({ uri: photo.uri, id: makeid(8) });
  //     await AsyncStorage.setItem("@Images", JSON.stringify(imageList));
  //   } catch (error) {
  //     // Error saving data
  //     console.log(error);
  //   }
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: "PictureScreen" }],
  //   });
  // };

  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return (
      <PaperProvider theme={global}>
        <View style={styles.spaceBetweenView}>
          <View>
          <View style={[styles.row, { backgroundColor: green }]}>
                <Text style={styles.title}>Recipe</Text>
                <IconButton
                  onPress={() => navigation.goBack()}
                  icon="keyboard-backspace"
                  color="white"
                  size={36}
                  style={styles.icon}
                />
              </View>
            <EmptyPage
              image={<Image style={styles.emptyImage} source={EmptyPng} />}
              title="Camera Access Needed"
              text={[
                "Chowtime needs the camera to take pictures of food"
              ]}
            />
          </View>
          <SolidButton
            color={green}
            text="Grant Access"
            onPress={async () => {
              if (Device.osName == "iOS" || Device.osName == "iPadOS") {
                Alert.alert(
                  "How To Grant Permissions",
                  "Go to Settings -> ChowTime and enable camera permission.",
                  [
  
                    { text: "OK" }
                  ],
                  { cancelable: false }
                );
              }
              else{
                const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA);
                if (status === 'granted') {
                  setHasPermission(status === "granted");
                } 
              }
            }}
          />
        </View>
      </PaperProvider>
    )
  }
  return (
    <View style={styles.view}>
      {isFocused && (
        // <Camera
        //   ratio="2:1"
        //   style={{ width: windowWidth, height: windowWidth * 2 }}
        //   type={type}
        //   ref={(cam) => {
        //     this.camera = cam;
        //   }}
        // ></Camera>
        <TensorCamera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          zoom={0}
          cameraTextureHeight={textureDims.height}
          cameraTextureWidth={textureDims.width}
          resizeHeight={tensorDims.height}
          resizeWidth={tensorDims.width}
          resizeDepth={3}
          onReady={(imageAsTensors) => handleCameraStream(imageAsTensors)}
          autorender={true}
        />
      )}
      {/* <View style={styles.captureButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            takePicture();
          }}
        >
          <SimpleLineIcons name="camera" size={42} color="white" />
        </TouchableOpacity>
      </View> */}
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
  spaceBetweenView: {
    ...spaceBetweenView,
  },
  row: {
    flexDirection: "row",
  },
  title: {
    ...title,
    flexWrap: "wrap",
    flex: 3,
  },
  icon: {
    marginTop: 75,
  },
  emptyImage: {
    marginTop: 0,
    resizeMode: "contain",
    padding: 10,
    width: "80%",
    height: "70%",
  },
  cameraView: {
    display: 'flex',
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    paddingTop: 10
  },
  camera : {
    // width: 700/2,
    height: 500,
    zIndex: 1,
    borderWidth: 0,
    borderRadius: 0,
  },
  image: {
    height: 400,
    width: 400
  }
});
