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
import { SimpleLineIcons } from '@expo/vector-icons';

const CameraNavigator = createStackNavigator();

//  export class ImagePickerExample extends React.Component {
//   state = {
//     image: null,
//   };

//   render() {
//     let { image } = this.state;

//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Button title="Pick an image from camera roll" onPress={this._pickImage} />
//         <Button title="Take a picture with Camera" onPress={() => navigation.navigate('Camera Home')} />
//         {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//       </View>
//     );
//   }

//   componentDidMount() {
//     this.getPermissionAsync();
//   }

//   getPermissionAsync = async () => {
//     if (Constants.platform.ios) {
//       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
//     }
//   };

//   _pickImage = async () => {
//     try {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.All,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });
//       if (!result.cancelled) {
//         this.setState({ image: result.uri });
//       }

//       console.log(result);
//     } catch (E) {
//       console.log(E);
//     }
//   };
// }

// function CameraScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Camera/>
//     </View>
//   );
// }

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
  takePicture = async () => {
    if (this.camera) {
        this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };
  
  onPictureSaved = photo => {
    console.log(photo);
    setImage(photo.uri )
  } 
  return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Menu Screen</Text>
    <Button
      title="Take Picture"
      onPress={() => navigation.push('Camera')}
    />
    <Button title="Pick Image" onPress={pickImage} />
    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
  </View>
  );
}


// export function ImagePickerExample ({navigation}) {
//   const [image, setImage] = useState(null);
//   useEffect(() => {
//     (async () => {
//       if (Constants.platform.ios) {
//         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//         if (status !== 'granted') {
//           alert('Sorry, we need camera roll permissions to make this work!');
//         }
//       }
//     })();
//   }, []);
//   pickImage = async () => {
//     try {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.All,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });
//       if (!result.cancelled) {
//         setImage(result.uri );
//       }

//       console.log(result);
//     } catch (E) {
//       console.log(E);
//     }
//   };
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Button title="Pick an image from camera roll" onPress={pickImage} />
//         <Button title="Take a picture with Camera" onPress={() => navigation.push('Camera')} />
//         {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//       </View>
//     );
//     }





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
