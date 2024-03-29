import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Dimensions, TouchableWithoutFeedback, Image, ImageBackground } from "react-native";
import { Provider as PaperProvider, Text, ActivityIndicator } from "react-native-paper";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import LottieView from "lottie-react-native";

import oneRecipe from "./oneRecipe.js";
import SolidButton from "./buttons/solidButton.js";
import EmptyPage from "./empty.js";
import CardComponent from "./cardComponent.js"

const EmtypPng = require("../assets/empty-recipe.png");
import { apiKeys } from "../config/constants";
import { global, view, title, subtitle, overlay, flexView, green, grey, darkGrey, mainContainer } from "../styles";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Stack = createStackNavigator();
export function RecipesTab() {
  return (
    <Stack.Navigator
      mode="card"
      initialRouteName="Recipes"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Recipes"
        component={Recipes}
        options={{
          gestureDirection: "horizontal",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="oneRecipe"
        component={oneRecipe}
        options={{
          gestureDirection: "horizontal",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
}

function Recipes({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [isError, setError] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  let success = false;
  useEffect(() => {
    if (foodItems.length === 0) {
      setLoading(true);
    }
    if (route.params && route.params.foodItems) {
      
      console.log('loading recipes')
      setFoodItems(route.params.foodItems);
      let currentFoodItems = route.params.foodItems;

      setLoading(true);
      let baseUrl =
        base + "?ingredients=" + currentFoodItems.join(", ") + "&apiKey=";
        console.log(baseUrl)
      getRecipes(baseUrl);
    }
  }, [route.params]);


  const base = "https://api.spoonacular.com/recipes/findByIngredients";

  let index = 0;

  const getRecipes = (url) => {
    fetch(url + apiKeys[index])
      .then(async (response) => {
        console.log('going to log')
        if (response.ok) {
          console.log('this is okay')
          const json = await response.json();
          success = true;
          setRecipes(json);
          setError(false);
        } else {
          console.log('this doesnt work')
          index++;

          if (!index < apiKeys.length) {
            console.log('out of range')
            setError(true);
          }
        }
      })
      .finally(() => {
        console.log('this is success' + success)
        if (success) {
          setLoading(false);
        } else {
          if (index < apiKeys.length) {
            getRecipes(url);
          } else {
            setLoading(false);
          }
        }
      });
  };

  if (foodItems.length === 0) {
    return (
      <PaperProvider theme={global}>
        <View style={styles.mainContainer}>
          <View>
            <Text style={styles.title}>Recipes</Text>
            <CardComponent 
              title="Hamburger" 
              subtitle="hello this is subtitle omg hello this is subtitle omg hello this is subtitle omg" 
              imageUri="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2004/2/25/0/bw2b07_hambugers1.jpg.rend.hgtvcom.616.462.suffix/1558017418187.jpeg"
            />
          </View>
          <SolidButton
            color={green}
            text="Start Cooking"
            onPress={() => navigation.navigate("Camera")}
          />
        </View>
      </PaperProvider>
    );
  } else {
    if (isLoading) {
      return (
        <View style={styles.viewCenter}>
          <LottieView
            style={{ width: windowWidth * 0.75, height: windowWidth * 0.75 }}
            resizeMode="cover"
            source={require("./loading2.json")}
            autoPlay
            loop
          />
          <Text style={[styles.subtitle, { marginVertical: 40 }]}>
            Loading Recipes
          </Text>
        </View>
      );
    } else if (isError) {
      return (
        <PaperProvider theme={global}>
          <View style={styles.mainContainer}>
            <View>
              <Text style={styles.title}>Recipes</Text>
              <EmptyPage
                image={
                  <Image
                    style={styles.emptyImage}
                    source={require("../assets/error.png")}
                  />
                }
                title="OH NO"
                text={["Something went wrong. Please try again."]}
              />
            </View>
          </View>
        </PaperProvider>
      );
    } else {
      return (
        <PaperProvider theme={global}>
          <View style={styles.mainContainer}>
            <Text style={styles.title}>Recipes</Text>

            {/* Your Ingredients */}
            <Text style={styles.subtitle}>Your Ingredients</Text>
            <FlatList
              contentContainerStyle={{ flexWrap: "wrap", flex: 0 }}
              style={styles.row}
              horizontal={true}
              scrollEnabled={false}
              data={foodItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.chipContainer}>
                  <Text style={styles.chip}>{item}</Text>
                </View>
              )}
            />

            {/* Recipes */}
            <Text style={styles.subtitle}>Recipes</Text>
            <View style={styles.flexView}>
              <FlatList
                contentContainerStyle={styles.recipesContainer}
                showsHorizontalScrollIndicator={false}
                snapToInterval={Dimensions.get("window").width - 52 + 18}
                snapToAlignment={"center"}
                decelerationRate={0.8}
                horizontal={true}
                scrollEnabled={true}
                data={recipes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(item) => _renderItem(item, navigation)}
              />
            </View>
          </View>
        </PaperProvider>
      );
    }
  }
  function _renderItem({ item }, navigation) {
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("oneRecipe", { item: item })}
      >
        <View style={styles.recipesItem}>
          <ImageBackground
            style={styles.imageBackground}
            source={{ uri: item.image }}
            resizeMode="cover"
          >
            <View style={styles.overlay} />
            <Text style={styles.name}>{item.title}</Text>
            <Text style={[styles.name, styles.ingredientCount]}>
              Your Ingredients: {item.usedIngredientCount}
            </Text>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  emptyImage: {
    marginTop: 0,
    resizeMode: "contain",
    padding: 10,
    width: "80%",
    height: "70%",
  },
  view: {
    ...view,
  },
  viewCenter: {
    ...view,
    justifyContent: "center",
    alignItems: "center",
  },
  flexView: {
    ...flexView,
  },
  mainContainer: {
    ...mainContainer,
  },
  title: {
    ...title,
  },
  subtitle: {
    ...subtitle,
  },
  name: {
    ...subtitle,
    color: "white",
    marginVertical: 20,
  },
  chipContainer: {
    backgroundColor: grey,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 10,
    marginVertical: 5,
    borderRadius: 7,
  },
  chip: {
    fontSize: 16,
    color: darkGrey,
  },
  row: {
    flexDirection: "column",
    flexGrow: 0,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  recipesContainer: {
    overflow: "scroll",
    paddingHorizontal: 16,
  },
  recipesItem: {
    paddingRight: 18,
    marginBottom: 20,
  },
  imageBackground: {
    ...flexView,
    width: Dimensions.get("window").width - 52,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: overlay,
  },
  ingredientCount: {
    fontSize: 18,
  },
});
