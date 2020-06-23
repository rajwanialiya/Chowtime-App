import * as React from 'react';
import  { useState, useEffect, useRef } from 'react';
import { useIsFocused} from '@react-navigation/native';
import { Button, Image, View , StyleSheet, Dimensions, Text, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import { SimpleLineIcons } from '@expo/vector-icons';
import { global, view, title, subtitle, chip, coloredSection } from '../styles'
import { green } from '../styles'

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
    takePicture = async () => {
      if (this.camera) {
          this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
      }
    };
  
    
    onPictureSaved = photo => {
      // console.log(photo);
  
      navigation.navigate('Upload', {
        image: photo.uri,
        subtitle:"Images",
      });
    } 
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
    ...view
  }, 
  viewCenter: {
    ...view,
    justifyContent: 'center',
    alignItems:'center'
  }, 
  title: {
    ...title,
  }, 
  coloredSection: {
    ...coloredSection
  },
  subtitle: {
    ...subtitle,
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
  }, 
  touchableOpacity: {
    alignItems:'center', 
    margin: 18, 
    backgroundColor: green, 
    borderRadius: 10,
  }
})