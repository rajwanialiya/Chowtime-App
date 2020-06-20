import * as React from 'react';
import { Button, Image, View , StyleSheet, Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Provider as PaperProvider } from 'react-native-paper';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import  { useState, useEffect, useRef } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SimpleLineIcons } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from 'react-native-vector-icons/FontAwesome';
//Styles & Theme
import { global, noPadding, title, subtitle, chip } from '../styles'
//Components
import { SolidButton } from '../components/buttons/solidButton';
import { OutlinedButton } from '../components/buttons/outlinedButton'
import { SmallButton } from '../components/buttons/smallButton';
import { ImageProcess } from '../components/imageProcess';
const CameraNavigator = createStackNavigator();

export default function CameraStack() {
  return (
  
    <CameraNavigator.Navigator screenOptions={{
      headerShown: false
    }}>
      <CameraNavigator.Screen name="Upload" component={ImageSelect} />
      <CameraNavigator.Screen name="ImageProcess" component={ImageProcess} />
      <CameraNavigator.Screen name="CameraCapture" component={CameraScreen} options={{ tabBarVisible: false }} />
    </CameraNavigator.Navigator>
  
  );
}
export function ImageSelect({navigation}) {
  const refRBSheet = useRef();
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
        aspect: [16, 9],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri );
        refRBSheet.current.close();
        navigation.navigate('ImageProcess', {
          image: result.uri,
          text: 'anything you want here',
        });
        
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
  ButtonStack = () => {
    return (<PaperProvider theme={global}>
      <SolidButton
            text="Take Picture"
            navigation={navigation}
            onPress={() =>{ navigation.push('CameraCapture'); refRBSheet.current.close() }  }
          />
          <SolidButton text="Pick Image" onPress={() => {pickImage(); } } />
      
      </PaperProvider>);

    
    };
  
  onPictureSaved = photo => {
    console.log(photo);
    setImage(photo.uri )
    navigation.navigate('ImageProcess', {
      image: photo.uri,
      text: 'anything you want here',
    });
  } 
  return (
    <PaperProvider theme={global}>
      <View style={styles.view}>
      
        <Text style={styles.title} >Your Fridge</Text>
      
     
        <Text style={styles.subtitle} >Add an Image</Text>
     
{/* <View style={styles.viewCenter}> */}
<View style={{flex:10}}>
        
      
<TouchableOpacity onPress={() => refRBSheet.current.open()} style={{ alignItems:'center',
        justifyContent: 'center', flex:1,  margin:20, backgroundColor: global.colors.primary, borderRadius: 10, }}>
          <Ionicons name="md-add-circle-outline" size={60} color="white" />
          <Text style={styles.name} color="white">Add an Image</Text>
</TouchableOpacity>


      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
      
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <ButtonStack />
      </RBSheet>
     </View>
     <View style={{flex:3}}></View>
     </View>
     {/* </View> */}
  </PaperProvider>
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

const styles = StyleSheet.create({
  view: {
    ...noPadding
  }, 
  viewCenter: {
    ...noPadding,
    justifyContent: 'center',
    alignItems:'center'
  }, 
  title: {
    ...title,
    marginHorizontal: 16
  }, 
  subtitle: {
    ...subtitle,
    marginHorizontal: 16
  }, 
  name: {
    ...subtitle,
    color: 'white',
    margin: 20
  }, 
  chip: {
    ...chip,
    marginRight: 8
  }, 
  row: {
    flexDirection: 'column',
    flexGrow: 0,
    marginVertical: 8,
    marginHorizontal: 16
  },
  recipesContainer: {
    overflow:'scroll',
    paddingHorizontal:16
  },
  recipesItem: {
    paddingRight:18, 
    height: 380,
  },
  imageBackground: {
    height:360, 
    width:Dimensions.get('window').width - 52, 
    borderRadius: 10, 
    overflow:'hidden',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
    justifyContent:'space-between',
    paddingBottom: 10
  }, 
  overlay: {
    height: 360,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)'
  }, 
  ingredientCount: {
    fontSize: 18
  }
})