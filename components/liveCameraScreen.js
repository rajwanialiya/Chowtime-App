import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, ScrollView, StyleSheet, Button, Platform } from 'react-native';
import Constants from 'expo-constants';
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
const handleCameraStream = (imageAsTensors) => {
  const loop = async () => {
    const nextImageTensor = await imageAsTensors.next().value;
    console.log(nextImageTensor)
    await tf.node.encodePng(nextImageTensor)
    requestAnimationFrameId = requestAnimationFrame(loop);
  };
  loop();
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
  }
});
