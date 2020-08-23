import * as React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { subtitle, text, grey } from "../styles";

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
      <View style={{ width: width, height: height, alignItems: "center" }}>
        {props.image}
      </View>
      <View style={styles.textSection}>
        <Text style={styles.subtitle}>{props.title}</Text>
        <View>
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
    paddingVertical: 50,
    paddingHorizontal: 25,
    margin: 25,
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  text: {
    ...text,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  subtitle: {
    ...subtitle,
    paddingVertical: 15,
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
  },
});
