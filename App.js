import * as React from 'react';
import { Platform, StyleSheet, Text, View, AppRegistry } from 'react-native';

//Tab Navigation
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Components
import { Camera } from './components/camera'; 
import { Recipes } from './components/recipes'

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        shifting={true}
        initialRouteName="Camera"
        activeColor="#e91e63"
        barStyle={styles.navContainer}
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

function CameraScreen() {
  return (
    <View style={styles.container}>
      <Camera></Camera>
    </View>
  );
}

function RecipesScreen() {
  return (
    <View style={styles.container}>
      <Recipes></Recipes>
    </View>
  );
}

function SavedScreen() {
  return ( 
    <View style={styles.container}>
      <Text>Settings!</Text>
    </View >
  ); 
}

const styles = StyleSheet.create({
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
