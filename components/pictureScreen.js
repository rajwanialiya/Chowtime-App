import * as React from "react";
import { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  AsyncStorage,
  setParams,
} from "react-native";
import {
  global,
  view,
  title,
  subtitle,
  chip,
  coloredSection,
  text,
  green, grey, darkGrey, mainContainer
} from "../styles";

import FloatingButton from "./FloatingButton";
import SmallButton from "./buttons/smallButton";
import EmptyIcon from "./empty";

import { Provider as PaperProvider } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign, Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { EmptyXml } from "../assets/emptyxml";
import { SvgXml } from "react-native-svg";
import LottieView from "lottie-react-native";
import {clarifaiKey} from '../config/constants'

const Clarifai = require("clarifai");
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
//Provide dynamic sizing based on screen height
//iPhone 8 height is under 700 so we use this as benchmark for smaller devices
let stepTextSize = 12;
let sectionWidth = 50;
let stepSize = 35;
let iconSize = 20;
if (windowHeight < 700) {
  stepTextSize = 9;
  sectionWidth = 40;
  stepSize = 29;
  iconSize = 16;
}
export function PictureScreen(props) {
  const app = new Clarifai.App({ apiKey: clarifaiKey });

  const intialList = [];

  const DATA = [
    {
      id: "bd7ac",
      title: "First Item",
      quantity: 1,
    },
    {
      id: "3ac68",
      title: "Second Item",
      quantity: 1,
    },
    {
      id: "58694",
      title: "Third Item",
      quantity: 1,
    },
  ];
  const [image, setImage] = useState("");
  const [pictureList, setPictureList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [subtitle, setSubtitle] = useState("Images");
  const [description, setDescription] = useState(
    "Let's start by adding pictures of food"
  );
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rawIngredients, setRawIngredents] = useState([]);
  const [emptyTitle, setEmptyTitle] = useState("Get Your Recipes.");
  const [emptyText, setEmptyText] = useState([
    "1. Take Pictures of Food",
    "2. Confirm the ingredients",
    "3. Get your suggestions!",
  ]);

  let step = "1";
  let title = "Capture";

  if (props.route && props.route.params && props.route.params.step) {
    step = props.route.params.step;
    if (step == "2") {
      title = "Analyze";
    } else if (step == "3") {
      title = "Review";
    }
  }

  const [annotatedImages, setAnnotatedImages] = useState([]);
  useEffect(() => {
    _retrieveData();
    BackHandler.addEventListener("hardwareBackPress", () => {
      props.navigation.goBack();
      return true;
    });
  }, []);

  const runClarifai = async (img) => {
    const base64Img = await FileSystem.readAsStringAsync(img, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const response = await app.models.predict(Clarifai.FOOD_MODEL, {
      base64: base64Img,
    });
    const fullList = response.outputs[0].data.concepts;
    const ingredients = [];
    const whiteList = ["vegetable", "pasture", "sweet", "juice", "cake"];
    for (var i = 0; i < 7; i++) {
      if (fullList[i].value > 0.93 && !whiteList.includes(fullList[i].name)) {
        ingredients.push(fullList[i].name);
      }
    }
    return ingredients;
  };

  const removeImage = async (id) => {
    const newList = pictureList.filter((picture) => picture.id != id);
    if (newList.length > 0) setShowNext(true);
    else setShowNext(false);
    setPictureList(newList);
    await AsyncStorage.setItem("@Images", JSON.stringify(newList));
  };

  const removeIngredient = async (imageId, ingredientName) => {
    const newAnnotatedImages = [];

    annotatedImages.forEach((img) => {
      const newImage = img;
      if (img.id == imageId) {
        const ingredients = img.ingredients;
        const newIngredientList = [];
        ingredients.forEach((ingredient) => {
          if (ingredient != ingredientName) {
            newIngredientList.push(ingredient);
          }
        });
        newImage.ingredients = newIngredientList;
      }
      if (newImage.ingredients.length > 0) newAnnotatedImages.push(newImage);
    });
    if (!newAnnotatedImages.length > 0) setShowNext(false);
    setAnnotatedImages(newAnnotatedImages);
  };

  const updateQuantity = async (id, increment) => {
    const newList = [];
    for (var i = 0; i < ingredients.length; i++) {
      const newIngredient = {
        id: ingredients[i].id,
        title: ingredients[i].title,
        quantity: ingredients[i].quantity,
      };
      if (ingredients[i].id == id) {
        if (increment) {
          newIngredient.quantity += 1;
        } else {
          newIngredient.quantity -= 1;
        }
      }
      if (newIngredient.quantity > 0) newList.push(newIngredient);
    }
    setIngredients(newList);
  };

  const handleNext = async (step) => {
    if (step == "1") {
      props.navigation.push("PictureScreen", {
        step: "2",
      });
    } else if (step == "2") {
      const ingredientList = [];
      for (var i = 0; i < annotatedImages.length; i++) {
        const ingredients = annotatedImages[i].ingredients;
        for (var j = 0; j < ingredients.length; j++) {
          if (!ingredientList.includes(ingredients[j]))
            ingredientList.push(ingredients[j]);
        }
      }
      props.navigation.push("PictureScreen", {
        step: "3",
        ingredientList: ingredientList,
      });
    } else if (step == "3") {
      await AsyncStorage.setItem("@Images", "");

      console.log(rawIngredients)
      props.navigation.reset({
        index: 0,
        routes: [{ name: "PictureScreen" }],
      });
      props.navigation.navigate("Recipes", {
        screen: "Recipes",
        params: { foodItems: rawIngredients },
      });
    }
  };

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  _retrieveData = async () => {
    try {
      if (step == "2") {
        setSubtitle("Finding Ingredients");
        setDescription(
          "Hold tight! We're finding ingredients in your pictures!"
        );
      } else if (step == "3") {
        setSubtitle("Review Ingredients");
        setDescription("One last step before we can get your recipes!");
      }

      try {
        let listOfPictures;
        if (step == "1" || step == "2") {
          const value = await AsyncStorage.getItem("@Images");

          if (value !== null) {
            listOfPictures = JSON.parse(value);

            if (listOfPictures.length > 0 && step != "2") setShowNext(true);
            else setShowNext(false);

            setPictureList(listOfPictures);
          } else {
            console.log("We have no data");
          }
        }
        if (step == "2") {
          const newAnnotatedList = [];
          const ingredientList = [];
          setEmptyTitle("No Ingredients Found");
          setEmptyText([
            "Aweh, we didn't have any luck. Try adding so more pics",
          ]);
          for (var i = 0; i < listOfPictures.length; i++) {
            const ingredients = runClarifai(listOfPictures[i].uri);
            ingredientList.push(ingredients);
          }
          await Promise.all(ingredientList);
          for (var i = 0; i < listOfPictures.length; i++) {
            const ingredients = ingredientList[i]._55;

            if (ingredients.length > 0) {
              newAnnotatedList.push({
                id: listOfPictures[i].id,
                uri: listOfPictures[i].uri,
                ingredients: ingredients,
              });
            }
          }
          if (listOfPictures.length > 0) {
            setSubtitle("Ingredients Found");
            setDescription(
              "Sweet! Now just review your ingredients and click 'Next'"
            );
            setShowNext(true);
          } else {
            setShowNext(false);
          }
          setLoading(false);
          setAnnotatedImages(newAnnotatedList);
        } else if (step == "3") {
          if (props.route.params.ingredientList) {
            const newIngredientList = [];
            const ingredientList = props.route.params.ingredientList;
            setRawIngredents(ingredientList);

            for (var i = 0; i < ingredientList.length; i++) {
              const newIngredient = {
                id: makeid(7),
                title: ingredientList[i],
                quantity: 1,
              };
              newIngredientList.push(newIngredient);
            }
            setIngredients(newIngredientList);
            setShowNext(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PaperProvider theme={global}>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.view}>
          {(step == "1" && pictureList.length > 0) ||
          (step == "2" && (annotatedImages.length > 0 || loading)) ||
          (step == "3" && ingredients.length > 0) ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={[styles.scroll]}
            >
              <Text style={styles.subtitle}>{subtitle}</Text>

              <Text style={styles.text}>{description}</Text>

              <View style={styles.scrollableContent}>
                {(() => {
                  if (step == "1") {
                    return (
                      <View style={styles.viewCenter}>
                        {pictureList.map((picture, index) => (
                          <View
                            key={picture.id}
                            style={[styles.horizontalStack]}
                          >
                            <Image
                              style={styles.image}
                              source={{
                                uri: picture.uri,
                              }}
                            />
                            <TouchableWithoutFeedback
                              onPress={async () =>
                                await removeImage(picture.id)
                              }
                            >
                              <View style={styles.close}>
                                <AntDesign
                                  name="close"
                                  size={24}
                                  color="#FFF"
                                />
                              </View>
                            </TouchableWithoutFeedback>
                          </View>
                        ))}
                      </View>
                    );
                  } else if (step == "2") {
                    return (
                      <View style={[styles.viewCenter]}>
                        {loading && (
                          <View style={styles.lottieContainer}>
                            <LottieView
                              style={{ width: "100%", height: "100%" }}
                              resizeMode="cover"
                              source={require("./loading2.json")}
                              autoPlay
                              loop
                            />
                          </View>
                        )}
                        {annotatedImages.map((annotatedImage, index) => (
                          <View key={annotatedImage.id} style={{ flex: 1 }}>
                            <Image
                              style={[
                                styles.image,
                                { marginBottom: 0, right: 0 },
                              ]}
                              source={{
                                uri: annotatedImage.uri,
                              }}
                            />

                            <View style={styles.annotatedIngredients}>
                              {annotatedImage.ingredients.map(
                                (ingredient, index) => (
                                  <View
                                    key={index}
                                    style={styles.ingredientTabContainer}
                                  >
                                    <View style={styles.ingredientTab}>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          color: darkGrey,
                                        }}
                                      >
                                        {ingredient}
                                      </Text>
                                    </View>
                                    <TouchableWithoutFeedback
                                      onPress={async () =>
                                        await removeIngredient(
                                          annotatedImage.id,
                                          ingredient
                                        )
                                      }
                                    >
                                      <View style={styles.ingredientClose}>
                                        <AntDesign
                                          name="close"
                                          size={15}
                                          color="#FFF"
                                        />
                                      </View>
                                    </TouchableWithoutFeedback>
                                  </View>
                                )
                              )}
                            </View>
                          </View>
                        ))}
                      </View>
                    );
                  } else if (step == "3") {
                    return (
                      <FlatList
                        style={styles.list}
                        data={ingredients}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item, index }) => (
                          <View style={styles.ingredient}>
                            <Text style={styles.ingredientName}>
                              {item.title}
                            </Text>
                            <View style={styles.quantityView}>
                              <TouchableWithoutFeedback
                                onPress={() => updateQuantity(item.id, false)}
                              >
                                <View style={styles.add_subtract}>
                                  <AntDesign
                                    name="minus"
                                    size={20}
                                    color="#32CA81"
                                  />
                                </View>
                              </TouchableWithoutFeedback>

                              <Text
                                style={[
                                  styles.ingredientName,
                                  { paddingLeft: 0 },
                                ]}
                              >
                                {item.quantity}
                              </Text>

                              <TouchableWithoutFeedback
                                onPress={() => updateQuantity(item.id, true)}
                              >
                                <View style={styles.add_subtract}>
                                  <AntDesign
                                    name="plus"
                                    size={20}
                                    color="#32CA81"
                                  />
                                </View>
                              </TouchableWithoutFeedback>
                            </View>
                          </View>
                        )}
                      />
                    );
                  }
                })()}
              </View>
              <View style={{ alignItems: "center", paddingBottom: 25 }}>
                {showNext && (
                  <SmallButton onPress={() => handleNext(step)} color={green} text="Next"/>
                  // <TouchableOpacity onPress={() => handleNext(step)}>
                  //   <View style={styles.button}>
                  //     <Text style={[{ color: "white", fontSize: 20 }]}>
                  //       Next
                  //     </Text>
                  //   </View>
                  // </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          ) : (
            <View style={{ marginTop: 20 }}>
              <EmptyIcon
                setWidth="100%"
                setHeight="55%"
                // image={<SvgXml xml={EmptyXml} width="100%" height="100%" />}
                imageUri={"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2004/2/25/0/bw2b07_hambugers1.jpg.rend.hgtvcom.616.462.suffix/1558017418187.jpeg"}
                title={emptyTitle}
                text={emptyText}
              />
            </View>
          )}
          <FloatingButton
            navigation={props.navigation}
            step={step}
            style={{ bottom: 80, right: 60 }}
          />
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    ...text,
    // paddingHorizontal: 0,
  },
  view: {
    ...view,
  },
  viewCenter: {
    ...view,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    ...title,
    marginBottom: 0,
  },
  mainContainer: {
    ...mainContainer
  },
  close: {
    backgroundColor: "grey",
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  add_subtract: {
    backgroundColor: "white",
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  coloredSection: {
    ...coloredSection,
  },
  subtitle: {
    ...subtitle,
    // paddingHorizontal: 0,
  },
  scroll: {
    width: "100%",
    paddingTop: 10,
  },
  stepSection: {
    alignItems: "center",
    width: sectionWidth,
    paddingHorizontal: 5,
  },
  steps: {
    backgroundColor: "black",
    height: stepSize,
    width: stepSize,
    borderRadius: stepSize / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  steptext: {
    color: "black",
    fontSize: stepTextSize,
    fontFamily: "SF-Regular",
    fontWeight: "700",
    paddingVertical: 5,
  },
  horizontalStack: {
    flexDirection: "row",
  },
  name: {
    ...subtitle,
    color: "white",
    margin: 20,
  },
  chip: {
    ...chip,
    marginRight: 8,
  },
  row: {
    flexDirection: "column",
    flexGrow: 0,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image: {
    width: Dimensions.get("window").width - 18 * 2,
    height: Dimensions.get("window").width - 18 * 2,
    position: "relative",
    right: -15,
    paddingHorizontal: 25,
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 10,
  },
  touchableOpacity: {
    alignItems: "center",
    margin: 18,
    backgroundColor: global.colors.green,
    borderRadius: 10,
  },
  blackBackground: {
    backgroundColor: "black",
  },
  whiteBackground: {
    backgroundColor: "white",
  },
  list: {
    width: "100%",
    marginTop: 12,
  },
  ingredient: {
    ...chip,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: grey,
    borderRadius: 10,
    marginBottom: 8,
    alignItems: "center",
    paddingHorizontal: 0,
    marginLeft: 0,
  },
  ingredientName: {
    fontSize: 16,
    color: darkGrey,
    paddingLeft: 15,
    paddingVertical: 4,
  },
  ingredientAmount: {
    fontSize: 16,
    color: green,
    paddingRight: 6,
  },
  stepView: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 15,
    paddingRight: 20,
  },
  scrollableContent: {
    ...view,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 18,
  },
  annotatedIngredients: {
    width: Dimensions.get("window").width - 18 * 2,
    backgroundColor: "#F0F3F4",
    position: "relative",
    top: -20,
    borderRadius: 10,
    padding: 5,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  quantityView: {
    width: "30%",
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 8,
  },
  lottieContainer: {
    flex: 1,
    width: "100%",
    height: windowHeight * 0.5,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    paddingTop: 40,
  },
  ingredientTabContainer: {
    flexDirection: "row",
    marginRight: -9,
  },
  ingredientTab: {
    backgroundColor: "white",
    padding: 10,
    margin: 5,
    borderRadius: 7,
  },
  ingredientClose: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    position: "relative",
    right: 10,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
});
