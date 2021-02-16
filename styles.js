import { DefaultTheme } from "react-native-paper";
import { Dimensions } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

//Screen Size
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export const borderRadius = 20;

//App Colours
export const green = "#27B671";
export const red = "#EC5454";
export const white = "#FFFFFF";
export const black = "#000000";
export const grey = "#F0F3F4";
export const darkGrey = "#787878";
export const medGrey = "#949494";

//Theme
export const global = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    primary: green,
    background: white,
    surface: white,
    backdrop: white,
    text: black,
  },
  fonts: {
    regular: {
      fontFamily: "SF-Regular",
    },
    medium: {
      fontFamily: "SF-Medium",
    },
    light: {
      fontFamily: "SF-Light",
    },
    thin: {
      fontFamily: "SF-Thin",
    },
  },
};

//Set Styles differently for smaller devices
// if (windowHeight < 700) {
//   title = {
//     backgroundColor: green,
//     color: white,
//     paddingTop: 48,
//     fontFamily: "Poppins-SemiBold",
//     fontSize: 29,
//     justifyContent: "flex-start",
//     marginBottom: 20,
//     paddingHorizontal: 18,
//   };
//   subtitle = {
//     color: black,
//     fontFamily: "Poppins-SemiBold",
//     fontSize: 20,
//     justifyContent: "flex-start",
//     marginBottom: 4,
//     paddingHorizontal: 18,
//   };
//   text = {
//     color: darkGrey,
//     fontSize: 12,
//     fontFamily: "Poppins-Regular",
//     justifyContent: "flex-start",
//     paddingHorizontal: 18,
//   };
// } else {
export const title = { 
  backgroundColor: white,
  color: black,
  paddingTop: 75,
  fontFamily: "SF-Bold",
  fontSize: 35,
  justifyContent: "flex-start",
  marginBottom: 20,
};

export const subtitle = {
  color: black,
  fontFamily: "SF-Semibold",
  fontSize: 25,
  justifyContent: "flex-start",
  marginBottom: 5
};

export const text = {
  color: darkGrey,
  fontSize: 14,
  fontFamily: "SF-Regular",
  justifyContent: "flex-start",
};
// }

//Other 
//These are small elements so they do not need ot be resized on smaller devices
export const chip = {
  fontSize: 16,
  backgroundColor: grey,
  color: darkGrey,
  borderRadius: 10,
  paddingHorizontal: 12,
  paddingVertical: 5,
  marginBottom: 8,
  justifyContent: "center",
  alignItems: "center",
};

export const view = {
  paddingBottom: 0,
  fontFamily: "SF-Regular",
  flex: 1,
  backgroundColor: white,
};

export const flexView = {
  flexGrow: 1,
  justifyContent: "space-between",
};

export const mainContainer = {
  ...view,
  justifyContent: "space-between",
  paddingHorizontal: 18,
  fontFamily: "SF-Regular",
  flex: 1,
  backgroundColor: white,
};

export const padding = {
  paddingHorizontal: 18,
};

export const lastItem = {
  marginBottom: 20,
};
//Small button icons are size={26}
//Large button icons are size={36}
