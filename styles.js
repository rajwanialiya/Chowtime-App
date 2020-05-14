import { DefaultTheme } from 'react-native-paper'

//App Colours
const green='#32CA81'
const red= '#EC5454'
const white= '#FFFFFF'
const black='#000000'

//Theme
export const global = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    primary: green,
    background: red,
    text: black
  },
  fonts: {
    regular: {
      fontFamily: 'Poppins-Regular',
    },
    medium: {
      fontFamily: 'Poppins-Medium',
    },
    light: {
      fontFamily: 'Poppins-Light',
    },
    thin: {
      fontFamily: 'Poppins-Thin',
    }
  },
};

export const view = {
  backgroundColor: white,
  padding: 24,
  paddingBottom: 0,
  paddingTop: 50,
  flex: 1,
  fontFamily: 'Poppins-Regular'
};

//Text
export const title = {
  color: green,
  fontFamily: 'Poppins-SemiBold',
  fontSize: 35,
  justifyContent: 'flex-start',
  marginBottom: 4
}

export const subtitle = {
  color: black,
  fontFamily: 'Poppins-SemiBold',
  fontSize: 25,
  justifyContent: 'flex-start'
}