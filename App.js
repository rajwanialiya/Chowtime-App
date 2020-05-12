import * as React from 'react';
import { Platform, StyleSheet, Text, View, AppRegistry, Button } from 'react-native';
import { withNavigationFocus } from 'react-navigation'
//Stack Navigation
import { createStackNavigator } from '@react-navigation/stack';
//Tab Navigation
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Components
import  CameraScreen  from './components/camera'; 
import {ImageSelect}  from './components/camera'; 

const Tab = createBottomTabNavigator();
const CameraNavigator = createStackNavigator();
const RecipeNavigator = createStackNavigator();
const SavedNavigator = createStackNavigator();


const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Camera') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            } else if (route.name === 'Recipes') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if (route.name === 'Saved') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            //PUT RIKIN'S PICS HERE
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}

        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Camera" component={CameraStack} />
        <Tab.Screen name="Recipes" component={RecipeStack} />
        <Tab.Screen name="Saved" component={SavedStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
// import React, { useState, useEffect } from 'react';
// import { Text, View, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';

// //Tab Navigation
// import { Ionicons } from '@expo/vector-icons';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();
// export default function App() {
//   return (
// <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'Camera') {
//               iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
//             } else if (route.name === 'Recipes') {
//               iconName = focused ? 'ios-list-box' : 'ios-list';
//             } else if (route.name === 'Saved') {
//               iconName = focused ? 'ios-list-box' : 'ios-list';
//             } else {
//               iconName = focused ? 'ios-list-box' : 'ios-list';
//             }

//             //PUT RIKIN'S PICS HERE
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}

//         tabBarOptions={{
//           activeTintColor: 'tomato',
//           inactiveTintColor: 'gray',
//         }}
//       >
//         <Tab.Screen name="Camera" component={CameraScreen} />
//         <Tab.Screen name="Recipes" component={RecipeScreen} />
//         <Tab.Screen name="Saved" component={SavedScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
// // function CameraScreen() {
// //   return (
// //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //       <Camera/>
// //     </View>
// //   );
// // }

function CameraStack() {
  return (
  
    <CameraNavigator.Navigator>
      <CameraNavigator.Screen name="Upload" component={ImageSelect} />
      <CameraNavigator.Screen name="Camera" component={CameraScreen} />
    </CameraNavigator.Navigator>
  
  );
}


function Upload({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ImagePickerExample />
    </View>
  );
}
function RecipeStack({navigation}) {
  return (
    <RecipeNavigator.Navigator>
      <RecipeNavigator.Screen name="Recipe Home" component={RecipeScreen} />
    </RecipeNavigator.Navigator>
  );
}
function RecipeScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Recipes!!!</Text>
    </View>
  );
}

function SavedStack({navigation}) {
  return (
    <SavedNavigator.Navigator>
      <SavedNavigator.Screen name="Saved Home" component={SavedScreen} />
    </SavedNavigator.Navigator>
  );
}
function SavedScreen({navigation}) {
  return ( 
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  ); 
}

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#F5FCFF',
// //   },
// //   welcome: {
// //     fontSize: 20,
// //     textAlign: 'center',
// //     margin: 10,
// //   },
// //   instructions: {
// //     textAlign: 'center',
// //     color: '#333333',
// //     marginBottom: 5,
// //   },
// // });

// // AppRegistry.registerComponent('Chowtime', () => App);

/*This is an example of Image Picker in React Native*/
// import React from 'react';
// import { StyleSheet, Text, View, Button, Image } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       filePath: {},
//     };
//   }
//   chooseFile = () => {
//     var options = {
//       title: 'Select Image',
//       customButtons: [
//         { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
//       ],
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };
//     ImagePicker.showImagePicker(options, response => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         alert(response.customButton);
//       } else {
//         let source = response;
//         // You can also display the image using data:
//         // let source = { uri: 'data:image/jpeg;base64,' + response.data };
//         this.setState({
//           filePath: source,
//         });
//       }
//     });
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.container}>
//           {/*<Image 
//           source={{ uri: this.state.filePath.path}} 
//           style={{width: 100, height: 100}} />*/}
//           <Image
//             source={{
//               uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
//             }}
//             style={{ width: 100, height: 100 }}
//           />
//           <Image
//             source={{ uri: this.state.filePath.uri }}
//             style={{ width: 250, height: 250 }}
//           />
//           <Text style={{ alignItems: 'center' }}>
//             {this.state.filePath.uri}
//           </Text>
//           <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
//         </View>
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });