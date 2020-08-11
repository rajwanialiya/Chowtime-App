import * as React from 'react';
import  { useState, useEffect, useRef } from 'react';
import { useIsFocused} from '@react-navigation/native';
import { Button, Image, View , StyleSheet, Dimensions, Text, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import { SimpleLineIcons } from '@expo/vector-icons';
import { global, view, title, subtitle, chip, coloredSection, text } from '../styles'
import { green } from '../styles'
import FloatingButton from './FloatingButton';
import { Provider as PaperProvider } from 'react-native-paper';
export  function Test(props) {
    console.log(props.route);
    // console.log(props);
    // const [image,setImage] = useState(null);
    if (props.route.params) {
        // setImage(props.route.params.image);
        console.log(props.route.params.image);
    }
  
    
    return (
        <PaperProvider theme={global}>
        <View style={styles.view}>
          <Text style={styles.title} >Capture</Text>
          {/* <Text style={styles.subtitle} >{subtitle? subtitle : "Your fridge"}</Text> */}
          <Text style={styles.text} >Let's start by adding a picture of your fridge.</Text>
          <Image
        style={styles.image}
        source={{
          uri: props.route.params.image
        }}
      />

 
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
      image: {
        width: 106,
        height: 158,
      },
      touchableOpacity: {
        alignItems:'center', 
        margin: 18, 
        backgroundColor: global.colors.green, 
        borderRadius: 10,
      }
      
    })