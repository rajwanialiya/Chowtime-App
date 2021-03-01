import React from 'react';
import { StyleSheet, View, Dimensions, ImageBackground, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { subtitle, text, white, borderRadius, elevation, overlay } from "../styles";

const windowWidth = "100%";
const windowHeight = Dimensions.get("window").height * 0.5;

export default function CardComponent(props) {
  let cardWidth = props.width ? props.width : windowWidth;
  let cardHeight = props.height ? props.height : windowHeight;

  return (
    <View>
      <TouchableOpacity activeOpacity={props.onPress ? 0.8 : 1} onPress={props.onPress ? () => props.onPress() : null}>
        <ImageBackground
          style={[styles.imageBackground, {height: cardHeight, width: cardWidth}]}
          imageStyle={styles.imageContainer}
          source={{ uri: props.imageUri }}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          { props.emptyPageCard ? props.emptyPageCard : 
          <View>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.subtitle}>{props.subtitle}</Text>
          </View>
          }
        </ImageBackground>
      </TouchableOpacity>
    </View> 
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: borderRadius,
  },
  imageBackground: {
    borderRadius: borderRadius,
    padding: 20,
    justifyContent: "flex-end",
    elevation: elevation,
  },
  overlay: {
    borderRadius: borderRadius,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: overlay,
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