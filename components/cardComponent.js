import * as React from "react";
import { StyleSheet, View, Dimensions, ImageBackground, Text } from "react-native";
import { subtitle, text, white, borderRadius } from "../styles";

const windowWidth = "100%";
const windowHeight = Dimensions.get("window").height * 0.5;

let cardWidth = windowWidth;
let cardHeight = windowHeight

export default function CardComponent(props) {
  cardWidth = props.width ? props.width : windowWidth;
  cardHeight = props.height ? props.height : windowHeight;

  return (
    <View>
      <ImageBackground
        style={styles.imageBackground}
        imageStyle={styles.imageContainer}
        source={{ uri: props.imageUri }}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </ImageBackground>
    </View> 
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: borderRadius,
  },
  imageBackground: {
    height: cardHeight,
    borderRadius: borderRadius,
    padding: 20,
    justifyContent: "flex-end",
    elevation: 15,
  },
  overlay: {
    height: cardHeight,
    borderRadius: borderRadius,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  title: {
    ...subtitle,
    color: white,
    fontSize: 30
  },
  subtitle: {
    ...text,
    color: white,
    fontSize: 18
  }
});