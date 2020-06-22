import * as React from 'react';
import { Button, Image, View , StyleSheet, Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Provider as PaperProvider } from 'react-native-paper';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import  { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SimpleLineIcons } from '@expo/vector-icons';
//Styles & Theme
import { global, view, title, subtitle, chip } from '../styles'
//Components
import { SolidButton } from '../components/buttons/solidButton';
import { OutlinedButton } from '../components/buttons/outlinedButton'
import { SmallButton } from '../components/buttons/smallButton'

export function ImageProcess ({ route, navigation }) {
    let {image} = route.params
    let {text} = route.params

    return (
        <PaperProvider theme={global}>
    <View style={styles.view}>
        <Text>{text}</Text>
        
        { <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
      </PaperProvider>
      );
}

const styles = StyleSheet.create({
    view: {
      ...view
    }, 
    viewCenter: {
      ...view,
      justifyContent: 'center'
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