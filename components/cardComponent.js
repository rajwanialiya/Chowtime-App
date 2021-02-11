import * as React from "react";
import { StyleSheet, View, FlatList, Dimensions, ImageBackground, TouchableWithoutFeedback, Image, Text } from "react-native";
import { global, view, title, subtitle, chip, flexView, green, grey, darkGrey, spaceBetweenView } from "../styles";

//Added dynamic padding for smaller devices so elements do not overlap
//Screen Size
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
let textSize = 16
let cardVerticalPadding = 45
if (windowHeight < 700) {
  textSize = 12
  cardVerticalPadding = 25
}

export default function CardComponent(props) {
  let width = "100%";
  let height = "60%";

  return (
    <View style={styles.recipesItem}>
      <ImageBackground
        style={styles.imageBackground}
        source={{ uri: props.imageUri }}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <Text style={styles.name}>{props.title}</Text>
        <Text style={styles.name}>{props.subtitle}</Text>
        {/* <Text style={[styles.name, styles.ingredientCount]}>
          Your Ingredients: {item.usedIngredientCount}
        </Text> */}
      </ImageBackground>
    </View> 
  );
}

const styles = StyleSheet.create({
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
});