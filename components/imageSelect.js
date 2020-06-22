import * as React from 'react';
import  { useState, useEffect, useRef } from 'react';
import Fab from '@material-ui/core/Fab';
import { Button, Image, Text, View , StyleSheet, Dimensions} from 'react-native';
import { global, view,text, title, subtitle, chip, coloredSection } from '../styles'
import FloatingButton from './FloatingButton';
import { Provider as PaperProvider } from 'react-native-paper';

export function ImageSelect({navigation}) {
    const [open, setOpen] = useState(false);
    
    const [image, setImage] = useState(null);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
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
        <Text style={styles.title} >Capture</Text>
        <Text style={styles.subtitle} >Your fridge</Text>
        <Text style={styles.text} >Let's start by adding a picture of your fridge.</Text>
        <FloatingButton style={{bottom: 80, right: 60} }/>
      </View>
    </PaperProvider>
    );
    }


    const styles = StyleSheet.create({
      container: {

        flex:1,
        alignItems: "center"
      },
      text: {
        ...text
      },
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
          backgroundColor: global.colors.green, 
          borderRadius: 10,
        }
      })