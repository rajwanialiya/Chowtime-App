import * as React from 'react';
import  { useState, useEffect, useRef } from 'react';
import { useIsFocused} from '@react-navigation/native';
import { Button, Image, View , StyleSheet, Dimensions, Text, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import { SimpleLineIcons } from '@expo/vector-icons';
export function CameraScreen({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const isFocused = useIsFocused();
    React.useLayoutEffect(() => {
      navigation.setOptions({ tabBarVisible:false });
    }, [navigation]);
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null ) {
      return <View />;
    }
    else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.view}>
      { isFocused && <Camera style={{ flex: 1 }} type={type} ref={ref => {
      this.camera = ref;
    }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: "center",
              alignItems: "center",
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {takePicture()
                // setType(
                //   type === Camera.Constants.Type.back
                //     ? Camera.Constants.Type.front
                //     : Camera.Constants.Type.back
                // );
  
              }}>
                
                <SimpleLineIcons name="camera" size={42} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>}
      </View>
    );
  }