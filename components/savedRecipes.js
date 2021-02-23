import React, { useState, useEffect } from "react";
import {
  StyleSheet,
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
import { SolidButton } from "./buttons/solidButton";
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
      <View style={[styles.recipesItem, styles.flexView]}>
        <ImageBackground
          style={styles.imageBackground}
          source={{ uri: item.image }}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <Text style={styles.name}>{item.title}</Text>
          <View>
            <SolidButton
              color={green}
              text="Explore"
              onPress={() =>
                navigation.navigate("oneRecipe", {
                  item: item,
                  fromSavedPage: true,
                })
              }
            ></SolidButton>
            <Button
              mode="text"
              color="white"
              onPress={() => removeItem(item.title)}
            >
              Remove
            </Button>
          </View>
        </ImageBackground>
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
              {/* <CardTextComponent 
                title = "Raspberry Salad"
                subtitle = "Hello there there are 10 ingredients"
                showFavs
                buttonText = "Hello"
                imageUri="data:image/jpeg;base64,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"
              /> */}
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
          <View style={styles.view}>
            <Text style={styles.title}>Saved</Text>
            <FlatList
              contentContainerStyle={styles.recipesContainer}
              showsHorizontalScrollIndicator={false}
              snapToInterval={Dimensions.get("window").width - 52 + 18}
              snapToAlignment={"center"}
              decelerationRate={0.8}
              horizontal={true}
              scrollEnabled={true}
              data={favs}
              // keyExtractor={item => item.id.toString()}
              renderItem={(item) => _renderItem(item, navigation)}
            />
          </View>
        </PaperProvider>
      );
    }
  }
}

const styles = StyleSheet.create({
  emptyImage: {
    marginTop: 0,
    resizeMode: "contain",
    padding: 10,
    width: "75%",
    height: "75%",
  },
  emptySub: {
    paddingVertical: 20,
    fontFamily: "SF-Medium",
    fontSize: 16,
  },
  view: {
    ...view,
  },
  viewCenter: {
    ...view,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  mainContainer: {
    ...mainContainer,
  },
  flexView: {
    ...flexView,
  },
  padding: {
    ...padding,
  },
  title: {
    ...title,
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
    padding: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  name: {
    ...subtitle,
    color: "white",
    margin: 0,
    paddingHorizontal: 0,
  },
  recipesContainer: {
    overflow: "scroll",
    paddingHorizontal: 16,
  },
  info: {
    ...subtitle,
    color: "white",
    marginVertical: 0,
    paddingHorizontal: 0,
    fontSize: 18,
    textAlignVertical: "center",
  },
});
