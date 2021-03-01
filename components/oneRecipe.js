import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  BackHandler,
  Dimensions,
  FlatList,
  Linking,
  AsyncStorage,
  Image,
} from "react-native";
import {
  Provider as PaperProvider,
  Text,
  ActivityIndicator,
  IconButton,
  Snackbar,
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { apiKeys } from "../config/constants";
import { global, subtitle, padding, white, mainContainer, borderRadius, elevation, chip, overlay, darkGrey, green, title, medGrey } from "../styles";
import { SolidButton } from "./buttons/solidButton";
import EmptyPage from "./empty";

export default function oneRecipe({ route, navigation }) {
  const favIcon = useRef(null)

  const [isLoading, setLoading] = useState(true);
  const [doneCheckingKeys, setDoneCheckingKeys] = useState(false);
  const [isError, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snackBarText, setSnackBarText] = useState("Added to Favourites");
  const [recipe, setRecipe] = useState([]);
  const [favs, setFavs] = useState([]);
  const [clicked, setClicked] = useState(false)

  const base = "https://api.spoonacular.com/recipes/";
  const { item } = route.params;
  let fromSavedPage = route.params.fromSavedPage;

  let index = 0;
  let success = false;

  const url = base + item.id + "/information" + "?apiKey=";

  useEffect(() => {
    setTimeout(function () {
      if (visible) {
        setVisible(false);
      }
    }, 1500);
  }, [visible]);

  useEffect(() => {
    getFavs();
    getRecipes();

    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });
  }, []);

  async function getFavs() {
    try {
      const value = await AsyncStorage.getItem("favRecipes");
      const parsedValue = JSON.parse(value);
      if (parsedValue && parsedValue !== null) {
        await setFavs(parsedValue);
      }
    } catch (e) {
      Promise.reject(e);
      fromSavedPage = true;
    }
  }

  async function saveRecipe(recipe) {
    const value = await AsyncStorage.getItem("favRecipes");
    let currentFavs = JSON.parse(value);
    let added = false;

    if (!currentFavs || currentFavs === null) {
      currentFavs = [];
    }

    currentFavs.forEach((fav) => {
      if (fav.title == recipe.title && currentFavs.length != 0) {
        added = true;
      }
    });

    if (!added) {
      currentFavs.push(recipe);
    } else {
      setSnackBarText("This recipe is already a favourite!");
    }

    try {
      await AsyncStorage.setItem("favRecipes", JSON.stringify(currentFavs));
      setVisible(true);
    } catch (e) {
      Promise.reject(e);
      setSnackBarText("Oh no! Something went wrong.");
      setVisible(true);
    }
    await getFavs();
  }

  const addToFavs = () => {
    setClicked(!clicked)
  }

  const getRecipes = () => {
    if (doneCheckingKeys) return;
    fetch(url + apiKeys[index])
      .then(async (response) => {
        if (response.ok) {
          const json = await response.json();
          success = true;
          setRecipe(json);
          setError(false);
        } else {
          index++;

          if (!index < apiKeys.length) {
            setError(true);
          }
        }
      })
      .finally(() => {
        if (success) {
          setLoading(false);
          setDoneCheckingKeys(true);
        } else {
          if (index < apiKeys.length) {
            getRecipes();
          } else {
            setLoading(false);
            setDoneCheckingKeys(true);
          }
        }
      });
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading Recipe</Text>
      </View>
    );
  } else {
    if (isError) {
      return (
        <PaperProvider theme={global}>
          <Text>Error</Text>
        </PaperProvider>
      );
    } else {
      return (
        <PaperProvider theme={global}>
          <ImageBackground style={styles.header} source={{ uri: recipe.image }} resizeMode="cover">
            <View style={styles.overlay}/>
            <View style={styles.headerContainer}>
              <IconButton
                onPress={() => navigation.goBack()}
                icon="keyboard-backspace"
                color="white"
                size={36}
                style={styles.backIcon}
              />
              <View style={styles.firstRow}>
                <Text style={styles.title}>{recipe.title}</Text>                
                <IconButton
                  onPress={() => addToFavs()}
                  icon={clicked ? "heart" : "heart-outline"}
                  color="white"
                  size={30}
                  style={styles.favIcon}
                  ref={favIcon}
                />
              </View>
            </View>
          </ImageBackground>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainContainer}>
              <View style={styles.row}>
                <View style={[styles.card, styles.first]}>
                  <Text>20</Text>
                  <Text>Hello</Text>
                </View>
                <View style={styles.card}></View>
              </View>
              <View style={styles.row}>
                <View style={[styles.card, styles.first]}></View>
                <View style={styles.card}></View>
              </View>
              <View style={styles.ingredients}>
                <Text style={styles.subtitle}>Ingredients</Text>
                <FlatList
                  data={recipe.extendedIngredients}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <View style={styles.ingredient}>
                      <Text style={styles.ingredientName}>{item.name}</Text>
                      <Text style={styles.ingredientAmount}>
                        {item.measures.us.amount} {item.measures.us.unitShort}
                      </Text>
                    </View>
                  )}
                />
                <Text style={styles.subtitle}>Recipe</Text>
                {(() => {
                  if (recipe.analyzedInstructions.length > 0) {
                    return (
                      <View>
                        <FlatList
                          style={styles.list}
                          data={recipe.analyzedInstructions[0].steps}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item, index }) => (
                            <View style={styles.recipeStep}>
                              <Text style={styles.stepNumber}>{item.number}</Text>
                              <Text style={styles.instructions}>{item.step}</Text>
                            </View>
                          )}
                        />
                      </View>
                    );
                  } else {
                    const url = recipe.sourceUrl;
                    return (
                      <View style={styles.padding}>
                        <View style={styles.recipeStep}>
                          <Text>
                            Please visit the following site to view the full list
                            of steps. Click the link below to get cooking:{" "}
                          </Text>
                        </View>
                        <Text
                          style={styles.link}
                          onPress={() => {
                            Linking.openURL(url);
                          }}
                        >
                          View full recipe &#8250;
                        </Text>
                      </View>
                    );
                  }
                })()}
              </View>
            </View>
          </ScrollView>

        </PaperProvider>
      );
    }
  }
}

const styles = StyleSheet.create({
  // Containers
  mainContainer: {
    ...mainContainer,
    paddingVertical: padding
  },
  headerContainer: {
    paddingVertical: padding,
    justifyContent: "space-between",
    height: "100%",
    paddingTop: 40
  },

  // Containing Elements
  header: {
    width: Dimensions.get("window").width,
    height: 300,
    paddingHorizontal: padding,
  },
  card: {
    flex: 1,
    height: 80,
    borderRadius: borderRadius,
    marginBottom: 10,
    padding: padding,
    backgroundColor: white,
    elevation: elevation
  },
  overlay: {
    height: 300,
    backgroundColor: overlay,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },

  // Rows
  firstRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
  },

  // Text
  title: {
    ...subtitle,
      color: white,
      fontSize: 30,
      maxWidth: 210
  },
  subtitle: {
    ...subtitle,
    fontSize: 25,
    paddingVertical: 10,
  },
  stepNumber: {
    ...subtitle,
    fontSize: 18,
    paddingRight: 15,
    color: medGrey,
  },
  ingredientName: {
    fontSize: 16,
    color: darkGrey,
    paddingLeft: 6,
    paddingVertical: 4,
  },
  ingredientAmount: {
    fontSize: 16,
    color: green,
    paddingRight: 6,
  },

  // Icons
  favIcon: {
    margin: 0,
    position: "absolute",
    right: 0
  },
  backIcon: {
    margin: 0,
    marginLeft: -10
  },

  // Other
  first: {
    marginRight: 10
  },
  ingredient: {
    ...chip,
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 8,
    alignItems: "center",
  },
  recipeStep: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  instructions: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 15,
  },
  link: {
    color: green,
    marginTop: 10,
    marginBottom: 20,
  },
});
