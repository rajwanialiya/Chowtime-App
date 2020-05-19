import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

//Tab Navigation
import { MaterialIcons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Components
import CameraScreen from './camera'; 
import { Recipes } from './recipes';
import { Demo } from './demo';

//Style
import { view } from '../styles';

const Tab = createMaterialBottomTabNavigator();

export function TabNav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        shifting={true}
        initialRouteName='Camera'
        activeColor='#32CA81'
        barStyle={styles.navContainer}
      >
        <Tab.Screen
          name='Camera'
          component={CameraScreen}
          options={{
            tabBarLabel: 'Camera', 
            tabBarIcon: ({color}) => (
              <MaterialIcons name='camera-alt' color={color} size={26} /> 
            ),
          }}
        />
        <Tab.Screen
          name='Recipes'
          component={RecipesScreen}
          options= {{
            tabBarLabel: 'Recipes',
            tabBarIcon: ({color}) => (
              <MaterialIcons name='restaurant-menu' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Profile'
          component={SavedScreen}
          options={{
            shifting: true,
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}) => (
              <MaterialIcons name='favorite' color={color} size={26} />
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
    <Recipes style={styles.view}></Recipes>
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
    paddingTop: 10,
    paddingBottom: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 24
  }
});
