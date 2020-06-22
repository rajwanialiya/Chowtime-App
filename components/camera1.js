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
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
const CameraNavigator = createStackNavigator();

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: 380,
//     transform: 'translateZ(0px)',
//     flexGrow: 1,
//   },
//   speedDial: {
//     position: 'absolute',
//     bottom: theme.spacing(2),
//     right: theme.spacing(2),
//   },
// }));
// // const actions = [
// //   { icon: <FileCopyIcon />, name: 'Copy' },
// //   { icon: <SaveIcon />, name: 'Save' },
// //   { icon: <PrintIcon />, name: 'Print' },
// //   { icon: <ShareIcon />, name: 'Share' },
// //   { icon: <FavoriteIcon />, name: 'Like' },
// // ];
// const actions = [
  
//   {
//     text: "Camera",
//     icon: { uri: 'https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/camera-512.png' },
//     name: "camera_clicked",
//     textStyle: { fontSize: 20 },
//     position: 1,
//     buttonSize: 60
//   //  render: new StackButtons()
//   },
//   {
//     text: "Pictures",
//     icon: { uri: 'https://static.thenounproject.com/png/11204-200.png' },
//     name: "pictures_clicked",
//     position: 2
//   }
// ];

// var Test = () => {
//   return(
//     <PaperProvider theme={global}>
//     <SolidButton
//         text="Take Picture"
     
         
//     />
//     </PaperProvider>

//   )
// }
// export default function CameraStack() {
//   return (
  
//     <CameraNavigator.Navigator screenOptions={{
//       headerShown: false
//     }}>
//       <CameraNavigator.Screen name="Upload" component={ImageSelect} />
//       <CameraNavigator.Screen name="ImageProcess" component={ImageProcess} />
//       <CameraNavigator.Screen name="CameraCapture" component={CameraScreen} options={{ tabBarVisible: false }} />
//     </CameraNavigator.Navigator>
  
//   );
// }
// export function ImageSelect({navigation}) {
//   const [open, setOpen] = React.useState(false);
//   const classes = useStyles();
//   const refRBSheet = useRef();
//   const [image, setImage] = useState(null);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
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
//         aspect: [16, 9],
//         quality: 1,
//       });
//       if (!result.cancelled) {
//         setImage(result.uri );
//         refRBSheet.current.close();
//         navigation.navigate('ImageProcess', {
//           image: result.uri,
//           text: 'anything you want here',
//         });
        
//       }

//       console.log(result);
      
//     } catch (E) {
//       console.log(E);
//     }
//   };
//   takePicture = async () => {
//     if (this.camera) {
//         this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
//     }
//   };

//   Test = () => {
//     return(
//       <PaperProvider theme={global}>
//       <SolidButton
//           text="Take Picture"
       
           
//       />
//       </PaperProvider>

//     )
//   }
//   ButtonStack = () => {
//     return (
//       <PaperProvider theme={global}>
//         <SolidButton
//             text="Take Picture"
//             navigation={navigation}
//             onPress={() =>{ navigation.push('CameraCapture'); refRBSheet.current.close() }  }
//         />
//         <SolidButton text="Pick Image" onPress={() => {pickImage(); } } />
//       </PaperProvider>
//     );
//   };
  
//   onPictureSaved = photo => {
//     console.log(photo);
//     setImage(photo.uri )
//     navigation.navigate('ImageProcess', {
//       image: photo.uri,
//       text: 'anything you want here',
//     });
//   } 
//   return (
//     <View>

//       <Fab color="primary" aria-label="add"></Fab>
//     </View>
//   );
//   }


// // function CameraScreen({navigation}) {
// //   const [hasPermission, setHasPermission] = useState(null);
// //   const [type, setType] = useState(Camera.Constants.Type.back);
// //   const isFocused = useIsFocused();
// //   React.useLayoutEffect(() => {
// //     navigation.setOptions({ tabBarVisible:false });
// //   }, [navigation]);

// //   useEffect(() => {
// //     (async () => {
// //       const { status } = await Camera.requestPermissionsAsync();
// //       setHasPermission(status === 'granted');
// //     })();
// //   }, []);

// //   if (hasPermission === null ) {
// //     return <View />;
// //   }
// //   else if (hasPermission === false) {
// //     return <Text>No access to camera</Text>;
// //   }
// //   return (
// //     <View style={styles.view}>
// //     { isFocused && <Camera style={{ flex: 1 }} type={type} ref={ref => {
// //     this.camera = ref;
// //   }}>
// //         <View
// //           style={{
// //             flex: 1,
// //             backgroundColor: 'transparent',
// //             flexDirection: 'row',
// //             justifyContent: "center",
// //             alignItems: "center",
// //           }}>
// //           <TouchableOpacity
// //             style={{
// //               flex: 0.1,
// //               alignSelf: 'flex-end',
// //               alignItems: 'center',
// //             }}
// //             onPress={() => {takePicture()
// //               // setType(
// //               //   type === Camera.Constants.Type.back
// //               //     ? Camera.Constants.Type.front
// //               //     : Camera.Constants.Type.back
// //               // );

// //             }}>
              
// //               <SimpleLineIcons name="camera" size={42} color="white" />
// //           </TouchableOpacity>
// //         </View>
// //       </Camera>}
// //     </View>
// //   );
// // }

// const styles = StyleSheet.create({
//   view: {
//     ...view
//   }, 
//   viewCenter: {
//     ...view,
//     justifyContent: 'center',
//     alignItems:'center'
//   }, 
//   title: {
//     ...title,
//   }, 
//   coloredSection: {
//     ...coloredSection
//   },
//   subtitle: {
//     ...subtitle,
//   }, 
//   name: {
//     ...subtitle,
//     color: 'white',
//     margin: 20
//   }, 
//   chip: {
//     ...chip,
//     marginRight: 8
//   }, 
//   row: {
//     flexDirection: 'column',
//     flexGrow: 0,
//     marginVertical: 8,
//     marginHorizontal: 16
//   },
//   recipesContainer: {
//     overflow:'scroll',
//     paddingHorizontal:16
//   },
//   recipesItem: {
//     paddingRight:18, 
//     height: 380,
//   },
//   imageBackground: {
//     height:360, 
//     width:Dimensions.get('window').width - 52, 
//     borderRadius: 10, 
//     overflow:'hidden',
//     shadowColor: 'black',
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     elevation: 6,
//     justifyContent:'space-between',
//     paddingBottom: 10
//   }, 
//   overlay: {
//     height: 360,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.4)'
//   }, 
//   ingredientCount: {
//     fontSize: 18
//   }, 
//   touchableOpacity: {
//     alignItems:'center', 
//     margin: 18, 
//     backgroundColor: green, 
//     borderRadius: 10,
//   }
// })