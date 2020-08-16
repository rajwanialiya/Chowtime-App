import * as React from 'react';
import  { useState, useEffect, useRef } from 'react';
import { useIsFocused} from '@react-navigation/native';
import { Button, Image, View , StyleSheet, Dimensions, Text, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import { SimpleLineIcons } from '@expo/vector-icons';
import { global, view, title, subtitle, chip, coloredSection } from '../styles'
import { green } from '../styles'
import { AsyncStorage } from 'react-native';


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
      // const sizes = await this.camera.getSupportedRatiosAsync();
      // console.log('LOOK HERE HELLO')
      // console.log(sizes);
      if (this.camera) {
          await this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
      }
      
    };
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    console.log(windowHeight/windowWidth);

    function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }
    onPictureSaved = async (photo) => {
      console.log(photo);
  
  
        var imageList = [];
        var existingImages = false;
        try{
            const value = await AsyncStorage.getItem('@Images');
            console.log('this is value: ')
            console.log(value);
            console.log(value == "null")
            const valueObject = JSON.parse(value)
            // console.log(valueObject.length )
            if (valueObject && valueObject.length != 0 ){
                existingImages = true;
                for (var i = 0; i < valueObject.length ; i++) {
                  imageList.push(valueObject[i])

                }
                
            }
            imageList.unshift({uri:photo.uri, id:makeid(8)})
            await AsyncStorage.setItem(
              '@Images',
              JSON.stringify(imageList)
            );
        }
        catch (error) {
          // Error saving data
          console.log(error)

        }
    
        
        // console.log(result);
        navigation.reset({
          index: 0,
          routes: [{ name: 'PicturePage' }],
        })
        
     

    //   console.log(result);
      
     
  };
    
    
    if (hasPermission === null ) {
      return <View />;
    }
    else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.view}>
        
      { isFocused && <Camera ratio='2:1'  style={{ width:windowWidth, height: windowWidth*2}} type={type} ref={ref => {
      this.camera = ref;
    }}>
          {/* <View
            style={{
              flex:1,
              backgroundColor: 'red',
              paddingBottom: 0,
              justifyContent: "flex-end",
              alignItems: "center",
              // width: windowWidth,
              //   height:100
            }}> */}
              
            
          {/* </View> */}
        </Camera>}
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', alignItems: 'center', paddingBottom:30}}>
          <TouchableOpacity
                
                onPress={() => {takePicture(); 
                  // setType(
                  //   type === Camera.Constants.Type.back
                  //     ? Camera.Constants.Type.front
                  //     : Camera.Constants.Type.back
                  // );
    
                }}>
                  
                  <SimpleLineIcons name="camera" size={42} color="white" />
              </TouchableOpacity>
              </View>
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