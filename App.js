// import * as React from 'react';
// import { Platform, StyleSheet, Text, View, AppRegistry, Button } from 'react-native';
// import { withNavigationFocus } from 'react-navigation'
// //Stack Navigation
// //Tab Navigation
// import { Ionicons } from '@expo/vector-icons';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// //Components


// const Tab = createBottomTabNavigator();
// const RecipeNavigator = createStackNavigator();
// const SavedNavigator = createStackNavigator();


// const instructions = Platform.select({
//   ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
//   android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
// });

// export default function App() {
//   return (
//     <NavigationContainer>
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
//         <Tab.Screen name="Camera" component={CameraStack} />
//         <Tab.Screen name="Recipes" component={RecipeStack} />
//         <Tab.Screen name="Saved" component={SavedStack} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
// // import React, { useState, useEffect } from 'react';
// // import { Text, View, TouchableOpacity } from 'react-native';
// // import { Camera } from 'expo-camera';

// // //Tab Navigation
// // import { Ionicons } from '@expo/vector-icons';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// // const Tab = createBottomTabNavigator();
// // export default function App() {
// //   return (
// // <NavigationContainer>
// //       <Tab.Navigator
// //         screenOptions={({ route }) => ({
// //           tabBarIcon: ({ focused, color, size }) => {
// //             let iconName;

// //             if (route.name === 'Camera') {
// //               iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
// //             } else if (route.name === 'Recipes') {
// //               iconName = focused ? 'ios-list-box' : 'ios-list';
// //             } else if (route.name === 'Saved') {
// //               iconName = focused ? 'ios-list-box' : 'ios-list';
// //             } else {
// //               iconName = focused ? 'ios-list-box' : 'ios-list';
// //             }

// //             //PUT RIKIN'S PICS HERE
// //             return <Ionicons name={iconName} size={size} color={color} />;
// //           },
// //         })}

// //         tabBarOptions={{
// //           activeTintColor: 'tomato',
// //           inactiveTintColor: 'gray',
// //         }}
// //       >
// //         <Tab.Screen name="Camera" component={CameraScreen} />
// //         <Tab.Screen name="Recipes" component={RecipeScreen} />
// //         <Tab.Screen name="Saved" component={SavedScreen} />
// //       </Tab.Navigator>
// //     </NavigationContainer>
// //   );
// // }



// function Upload({navigation}) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ImagePickerExample />
//     </View>
//   );
// }
// function RecipeStack({navigation}) {
//   return (
//     <RecipeNavigator.Navigator>
//       <RecipeNavigator.Screen name="Recipe Home" component={RecipeScreen} />
//     </RecipeNavigator.Navigator>
//   );
// }
// function RecipeScreen({navigation}) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Recipes!!!</Text>
//     </View>
//   );
// }

// function SavedStack({navigation}) {
//   return (
//     <SavedNavigator.Navigator>
//       <SavedNavigator.Screen name="Saved Home" component={SavedScreen} />
//     </SavedNavigator.Navigator>
//   );
// }
// function SavedScreen({navigation}) {
//   return ( 
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   ); 
// }


import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import * as Font from 'expo-font';

import { TabNav } from './components/nav'
import { AppLoading} from 'expo';

// import { loadFonts } from './styles';
import { view } from './styles';
import { font } from './styles'

const loadFonts = () => Font.loadAsync({
  'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
  'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
  'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
})
// .then(() => setFontsLoaded(true));

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  if (fontsLoaded) {
    return (
      <TabNav></TabNav>
    );  
  } else {
    return(
      <AppLoading 
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }
}

const styles = StyleSheet.create({
  view: {
    ...view
  },
  navContainer: {
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 24
  }
});
