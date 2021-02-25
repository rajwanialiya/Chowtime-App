import React, { useState, useEffect } from "react";
import {StyleSheet,
  View,
  FlatList,
  Dimensions,
  ImageBackground,
  AsyncStorage,
  Image,
  BackHandler,
} from "react-native";
import {
  Provider as PaperProvider,
  Text,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";


import { oneRecipe } from "./oneRecipe.js";
import CardTextComponent from './cardTextComponent';
import {
  global,
  view,
  title,
  subtitle,
  green,
  padding,
  mainContainer,
  flexView
} from "../styles";
import CardComponent from "./cardComponent.js";

const Stack = createStackNavigator();
export function SavedTab() {
  return (
    <Stack.Navigator
      mode="card"
      initialRouteName="savedRecipes"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="oneRecipe"
        component={oneRecipe}
        options={{
          gestureDirection: "horizontal",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="savedRecipes"
        component={savedRecipes}
        options={{
          gestureDirection: "horizontal",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
}

function savedRecipes({ navigation }) {
  const [empty, setEmpty] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [isSet, set] = useState(false);
  const [favs, setFavs] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getFavs();
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });
  }, [isFocused]);

  async function getFavs() {
    try {
      const value = await AsyncStorage.getItem("favRecipes");
      const parsedValue = JSON.parse(value);
      if (parsedValue && parsedValue !== null && parsedValue.length > 0) {
        await setFavs(parsedValue);
        setEmpty(false);
      } else {
        setEmpty(true);
      }
      set(true);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  }

  function _renderItem({ item }, navigation) {
    return (
      <View>
        <CardComponent 
          imageUri={item.image}
          height={200}
          title={item.title}
          subtitle={`${item.extendedIngredients.length} ingredients · ${item.readyInMinutes ? item.readyInMinutes : 30} mins`}
          onPress={() =>
            navigation.navigate("oneRecipe", {
              item: item,
              fromSavedPage: true,
            })
          }
        />
      
            {/* <Button
              mode="text"
              color="white"
              onPress={() => removeItem(item.title)}
            >
              Remove
            </Button> */}
      </View>
    );
  }

  async function removeItem(title) {
    setLoading(true);
    let updatedFavs = [];
    favs.forEach((recipe) => {
      if (recipe.title !== title) {
        updatedFavs.push(recipe);
      }
    });

    await AsyncStorage.setItem("favRecipes", JSON.stringify(updatedFavs));
    await getFavs();
  }

  if (isLoading) {
    return (
      <View style={styles.viewCenter}>
        <ActivityIndicator color={green} size="large" />
      </View>
    );
  } else {
    if (empty && isSet) {
      return (
        <PaperProvider theme={global}>
          <View style={styles.mainContainer}>
            <View>
              <Text style={styles.title}>Saved</Text>
            </View>
            <SolidButton
              color={green}
              text="Get Recipes"
              onPress={() => navigation.navigate("Camera")}
            />
          </View>
        </PaperProvider>
      );
    } else {
      return (
        <PaperProvider theme={global}>
          <View style={styles.mainContainer}>
            <Text style={styles.title}>Saved</Text>
            <FlatList
              contentContainerStyle={styles.recipesContainer}
              showsHorizontalScrollIndicator={false}
              snapToAlignment={"center"}
              scrollEnabled={true}
              data={favs}
              renderItem={(item) => _renderItem(item, navigation)}
            />
          </View>
        </PaperProvider>
      );
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...mainContainer,
  },
  title: {
    ...title,
  },
  recipesItem: {
    paddingRight: 18,
    marginBottom: 20,
  }
});
