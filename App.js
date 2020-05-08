import * as React from 'react';
import { Platform, StyleSheet, Text, View, AppRegistry } from 'react-native';

//Tab Navigation
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Components
import { Camera } from './components/camera'; 
import { Recipes } from './components/recipes'

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

            //PUT RIKIN'S PICS HERE
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

function CameraScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Camera></Camera>
    </View>
  );
}

function RecipeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Recipes></Recipes>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Chowtime', () => App);