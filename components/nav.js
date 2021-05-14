import React from "react";
import { StyleSheet } from "react-native";

//Tab Navigation
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

//Components
import CameraScreen from "./camera";
// import LiveCameraScreen from "./liveCameraScreen";
import { RecipesTab } from "./recipes";
import {SavedTab} from './savedRecipes'
//Style
import { view } from "../styles";

const Tab = createMaterialBottomTabNavigator();

export function TabNav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        shifting={false}
        labeled={false}
        initialRouteName="Camera"
        activeColor="#32CA81"
        barStyle={styles.navContainer}
        screenOptions={{
          headerShown: false,
        }}
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="Camera"
          // component={LiveCameraScreen}
          component={CameraScreen}

          options={{
            tabBarLabel: "Camera",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="camera-alt" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Recipes"
          component={RecipesScreen}
          options={{
            tabBarLabel: "Recipes",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="restaurant-menu" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Saved'
          component={SavedScreen}
          options={{
            shifting: true,
            tabBarLabel: 'Saved',
            tabBarIcon: ({color}) => (
              <MaterialIcons name='favorite' color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


function RecipesScreen(props) {
  return (
    <RecipesTab style={styles.view}></RecipesTab>
  );
}

function SavedScreen() {
  return ( 
    <SavedTab style={styles.view}></SavedTab>
  ); 
}

const styles = StyleSheet.create({
  view: {
    ...view,
  },
  navContainer: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
        height: 15,
        width: 1
    }
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 24,
  },
});
