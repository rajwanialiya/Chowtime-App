import * as React from 'react';
import { Button, Image, View , StyleSheet, Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Provider as PaperProvider } from 'react-native-paper';
import { makeStyles } from '@material-ui/core/styles';
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
import { global, view, title, subtitle, chip, coloredSection } from '../styles'
import { green } from '../styles'
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';

//Components

import { FloatingAction } from "react-native-floating-action";
import Fab from '@material-ui/core/Fab';
import { SpeedDial } from '@material-ui/lab';
import { SpeedDialIcon } from '@material-ui/lab';
import { SpeedDialAction } from '@material-ui/lab';
import { ImageProcess } from './imageProcess';
import { ImageSelect } from './imageSelect';
import { CameraScreen } from './cameraScreen';
import { PicturePage } from './picturePage';
import { Test } from './test';
import EmptyIcon from '../empty'


const CameraNavigator = createStackNavigator();

export default function CameraStack() {
    return (
    
      <CameraNavigator.Navigator screenOptions={{
        headerShown: false
      }}>

        
        {/* <CameraNavigator.Screen name="Upload" component={ImageSelect} /> */}
        <CameraNavigator.Screen name="PicturePage" component={PicturePage} />
        <CameraNavigator.Screen name="Test" component={Test} />
        <CameraNavigator.Screen name="ImageProcess" component={ImageProcess} />
        <CameraNavigator.Screen name="CameraCapture" component={CameraScreen} options={{ tabBarVisible: false }} />
      </CameraNavigator.Navigator>
    
    );
  }
