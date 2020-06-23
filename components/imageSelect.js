import * as React from 'react';
import  { useState, useEffect, useRef } from 'react';
import Fab from '@material-ui/core/Fab';
import { Button, Image, Text, View , StyleSheet, Dimensions} from 'react-native';
import { global, view,text, title, subtitle, chip, coloredSection } from '../styles'
import FloatingButton from './FloatingButton';
import { Provider as PaperProvider } from 'react-native-paper';

export function ImageSelect(props) {
 
    const [reset, setReset] = useState(false);
    const [open, setOpen] = useState(false);
    const [subtitle, setSubtitle] = useState(null);
    const [images,setImages] = useState([]);
    try {
      setSubtitle(props.route.params.subtitle);
      if(subtitle) setReset(true);
     }
     catch {}

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

    
    for (let i = 0; i < 10; i++) {
      images.push({
          name: "Hello",
          country: "World"
      });
  }


    return (
      <PaperProvider theme={global}>
      <View style={styles.view}>
        <Text style={styles.title} >Capture</Text>
        <Text style={styles.subtitle} >{subtitle? subtitle : "Your fridge"}</Text>
        <Text style={styles.text} >Let's start by adding a picture of your fridge.</Text>
        <View>
        {images.map((image, index) => (
        <Text>Hello, {image.name} from {image.country}!</Text>
    ))}
        </View>
        <FloatingButton navigation={props.navigation} reset={reset} style={{bottom: 80, right: 60} }/>
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