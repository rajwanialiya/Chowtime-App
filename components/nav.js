import React from 'react';
import { StyleSheet } from 'react-native';

//Tab Navigation
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Components
import CameraScreen from './camera'; 
import { RecipesTab } from './recipes';
import { Demo } from './demo';

//Style
import { view } from '../styles';

const Tab = createMaterialBottomTabNavigator();

export function TabNav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        shifting={true}
        initialRouteName="Camera"
        activeColor="#e91e63"
        barStyle={styles.navContainer}
        screenOptions={{
          headerShown: false
        }}
      >
        <Tab.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            tabBarLabel: "Camera", 
            tabBarIcon: ({color}) => (
              <Ionicons name="ios-camera" color={color} size={26} /> //REPLACE ICON
            ),
          }}
        />
        <Tab.Screen
          name="Recipes"
          component={RecipesScreen}
          options= {{
            tabBarLabel: "Recipes",
            tabBarIcon: ({color}) => (
              <Ionicons name="ios-copy" color={color} size={26} /> //REPLACE ICON
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={SavedScreen}
          options={{
            shifting: true,
            tabBarLabel: "Profile",
            tabBarIcon: ({color}) => (
              <Ionicons name="ios-copy" color={color} size={26} /> //REPLACE ICON
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// function CameraScreen() {
//   return (
//     <View style={styles.view}>
//       <Camera></Camera>
//     </View>
//   );
// }

function RecipesScreen() {
  return (
    <RecipesTab style={styles.view}></RecipesTab>
  );
}

function SavedScreen() {
  return ( 
    <Demo style={styles.view}></Demo>
  ); 
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
