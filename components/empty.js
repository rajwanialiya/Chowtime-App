import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { subtitle, text, green } from "../styles";

import SolidButton from "./buttons/solidButton";
import CardComponent from "./cardComponent";

export default function EmptyPage(props) {
  return (
    <CardComponent 
      imageUri={props.imageUri}
      emptyPageCard={
        <View style={styles.cardContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>{props.subtitle}</Text>
          <View style={styles.buttonContainer}>
            <SolidButton 
              color={green}
              text={"Add Ingredients"}
              onPress={props.onPress}
            />
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  title: {
    ...subtitle,
    color: "white"
  },
  subtitle: {
    ...text,
    color: "white",
    fontSize: 18
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0
  }
});
