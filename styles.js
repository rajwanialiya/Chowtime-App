import { DefaultTheme } from 'react-native-paper'

//App Colours
const green='#32CA81'
const red= '#EC5454'
const white= '#FFFFFF'
const black='#000000'
const grey='#F0F3F4'
const darkGrey='#949494'

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
  justifyContent: 'flex-start',
  marginBottom: 4
}

//Other
export const chip = {
  fontSize: 16,
  backgroundColor: grey, 
  color: darkGrey, 
  borderRadius: 10, 
  paddingHorizontal: 12, 
  paddingVertical: 8,
  marginLeft: 8,
  marginBottom: 8,
  justifyContent: 'center', 
  alignItems: 'center'
}

export const view = {
  padding: 24,
  paddingBottom: 0,
  paddingTop: 50,
  fontFamily: 'Poppins-Regular',
  flex: 1,
  backgroundColor: white,
};

export const section = {

}