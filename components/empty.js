import * as React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { subtitle, text, grey } from "../styles";
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
export default function EmptyPage(props) {
  let width = "100%";
  let height = "60%";

  if (props.setWidth) {
    width = props.setWidth;
  }

  if (props.setHeight) {
    height = props.setHeight;
  }

  return (
    <View style={styles.card}>
      <View
        style={{
          width: width,
          height: height,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.image}
      </View>
      <View style={styles.textSection}>
        <Text style={styles.subtitle}>{props.title}</Text>
        <View style={{width:'100%', alignItems:'flex-start'}}>
          {props.text &&
            props.text.map((line, index) => (
              <Text style={styles.text} key={index}>
                {line}
              </Text>
            ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 0.5 * Dimensions.get("window").height,
    backgroundColor: grey,
    paddingVertical: cardVerticalPadding,
    paddingHorizontal: 15,
    marginVertical: 25,
    marginHorizontal: 18,
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    textAlign: "left",
  },
  text: {
    ...text,
    fontSize: textSize,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    textAlign: "left",
  },
  subtitle: {
    ...subtitle,
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
  },
});
