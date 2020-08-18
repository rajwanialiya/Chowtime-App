import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import  { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EmptyIcon from '../empty'
import { EmptyXml } from '../emptyxml'
import { SvgXml } from 'react-native-svg';

const CameraNavigator = createStackNavigator();

export default function CameraStack() {
  return (
  
    <CameraNavigator.Navigator>
      <CameraNavigator.Screen name="Upload" component={ImageSelect} />
      <CameraNavigator.Screen name="Camera" component={CameraScreen} />
    </CameraNavigator.Navigator>
  
  );
}
export function ImageSelect({navigation}) {
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  
  pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri );
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'white' , paddingHorizontal:25}}>

    <View style={{width:'100%', height:'70%'}}>
    
    <EmptyIcon setWidth='100%' setHeight='40%' image={<SvgXml xml={EmptyXml} width="100%" height="100%" />} title="Get your recipes." text={['1. Take Pictures of your fridge', '2. Confirm the ingredients','3. Get your suggestions!']}/>

    </View>
    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
  </View>
  );
}


function CameraScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const isFocused = useIsFocused();
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
    <View style={{ flex: 1 }}>
    { isFocused && <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>}
    </View>
  );
}
