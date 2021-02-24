import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, ScrollView, StyleSheet, Button, Platform, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as jpeg from 'jpeg-js';
import { useIsFocused } from "@react-navigation/native";

//Permissions
import * as Permissions from 'expo-permissions';

//camera
import { Camera } from 'expo-camera';

//tensorflow
import * as tf from '@tensorflow/tfjs';
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';
import TesseractOcr, { LANG_ENGLISH } from 'react-native-tesseract-ocr';

export default function LiveCameraScreen({navigation}) {
  const isFocused = useIsFocused();
  const [uri, setUri] = useState("")

  useEffect(() => {
    handleCameraStream()
  }, [isFocused]);

  const [run, setRun] = useState(true);
  const [predictionFound, setPredictionFound] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [mobilenetModel, setMobilenetModel] = useState(null);
  const [frameworkReady, setFrameworkReady] = useState(false);

  const TensorCamera = cameraWithTensors(Camera);
  let requestAnimationFrameId = 0;

  //performance hacks (Platform dependent)
  const textureDims = Platform.OS === "ios"? { width: 1080, height: 1920 } : { width: 1600, height: 1200 };
  const tensorDims = { width: 152, height: 200 }; 

  useEffect(() => {
    if(!frameworkReady) {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');

        await tf.ready(); //wait for tf model
        // setMobilenetModel(await loadMobileNetModel()); // load tf model

        setFrameworkReady(true);
      })();
    }
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestAnimationFrameId);
    };
  }, [requestAnimationFrameId]);

  // const loadMobileNetModel = async () => { // TO DO: CHANGE THE MODEL
  //   const model = await mobilenet.load();
  //   return model;
  // }

  //   

/*-----------------------------------------------------------------------
Helper function to handle the camera tensor streams. Here, to keep up reading input streams, we use requestAnimationFrame JS method to keep looping for getting better predictions (until we get one with enough confidence level).
More info on RAF: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
-------------------------------------------------------------------------*/
const handleCameraStream = async (imageAsTensors) => {
  const loop = async () => {
    const tensor = await imageAsTensors.next().value;
    console.log(tensor)
    const height = tensor.shape[0]
    const width = tensor.shape[1]
    const data = new Buffer(
      // concat with an extra alpha channel and slice up to 4 channels to handle 3 and 4 channels tensors
      tf.concat([tensor, tf.ones([height, width, 1]).mul(255)], [-1])
        .slice([0], [height, width, 4])
        .dataSync(),
    )

    const rawImageData = {data, width, height};
    const jpegImageData = jpeg.encode(rawImageData, 100);

    const imgBase64 = tf.util.decodeString(jpegImageData.data, "base64")
    const salt = `${Date.now()}-${Math.floor(Math.random() * 10000)}`
    const uri = FileSystem.documentDirectory + `tensor-${salt}.jpg`;
    await FileSystem.writeAsStringAsync(uri, imgBase64, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log(uri)
    setUri(uri)
    // return {uri, width, height}
  };
  // requestAnimationFrameId = requestAnimationFrame(loop);
  !uri ? setTimeout(() => loop(), 4000) : null;
}


  //TO DO: USE TO RESET
  const loadNewTranslation = () => {
    setPredictionFound(false);
  }


  const renderCameraView = () => {
    return <View>
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
            </View>;
  }

  return (
    <View>
      <View>
        { frameworkReady ? renderCameraView() : <Text>Loading</Text> }
        <Text>Image</Text>
        {uri ? <Image style={styles.image} source={{uri: uri}}/> : null}

        {/* <Canvas id="canvas"></Canvas> */}
      </View>  
    </View>
  );
}


const styles = StyleSheet.create({
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
