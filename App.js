// import 'react-native-gesture-handler';
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';

// export default function App() {
//   return (
//     <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
//   );
// }

import * as React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

function CameraScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Camera SCREEN WOOH</Text>
    </View>
  );
}

function RecipeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Recipes!!!</Text>
    </View>
  );
}

function SavedScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

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

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Recipes" component={RecipeScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// import * as React from 'react';
// import { Platform, StyleSheet, Text, View } from 'react-native';

// const instructions = Platform.select({
//   ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
//   android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
// });


// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcome}>Welcome to React Native!</Text>
//       <Text style={styles.instructions}>To get started, edit App.js</Text>
//       <Text style={styles.instructions}>{instructions}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

