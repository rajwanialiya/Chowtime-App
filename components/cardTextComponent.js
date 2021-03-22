import React, { useRef, useState } from "react";
import { StyleSheet, View, Dimensions, ImageBackground, Text } from "react-native";
import { IconButton} from "react-native-paper";
import { subtitle, text, white, black, darkGrey, elevation, borderRadius } from "../styles";

const windowWidth = "100%";
const windowHeight = Dimensions.get("window").height * 0.35;

let cardWidth = windowWidth;
let cardHeight = windowHeight

export default function CardTextComponent(props) {
  const favIcon = useRef(null)
  const [clicked, setClicked] = useState(false)

  cardWidth = props.width ? props.width : windowWidth;
  cardHeight = props.height ? props.height : windowHeight;

  const addToFavs = () => {
    setClicked(!clicked)
  }

  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        style={styles.imageBackground}
        imageStyle={styles.imageBackgroundContainer}
        source={{ uri: props.imageUri }}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.firstRow}>
            <Text style={styles.title}>{props.title}</Text>
            { props.showFavs ? (
              <IconButton
                onPress={() => addToFavs()}
                icon={clicked ? "heart" : "heart-outline"}
                color="red"
                size={30}
                style={styles.favIcon}
                ref={favIcon}
              />
             ) : null }
          </View>
          <Text style={styles.subtitle}>{props.subtitle}</Text>
          { props.buttonText ? (
            <Text style={styles.textButton}>View &#8250;</Text>
           ) : null }
        </View>
      </ImageBackground>
    </View> 
  );
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    borderRadius: borderRadius
  },
  imageBackground: {
    borderRadius: borderRadius,
    justifyContent: "flex-end",
    height: cardHeight,
    elevation: elevation,
  },
  overlay: {
    height: cardHeight * 0.45,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    padding: 20, 
    position: "absolute",
    justifyContent: "center",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: white,
  },
  firstRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  favIcon: {
    margin: 0,
    position: "absolute",
    right: 0
  },
  title: {
    ...subtitle,
    color: black,
    fontSize: 20
  },
  subtitle: {
    ...text,
    color: darkGrey,
    fontSize: 16
  },
  textButton: {
    fontFamily: "SF-Semibold",
    fontSize: 16,
    color: darkGrey,
    marginTop: 8
  }
});