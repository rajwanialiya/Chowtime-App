import { DefaultTheme } from 'react-native-paper'

//App Colours
export const green='#27B671'
export const red= '#EC5454'
export const white= '#FFFFFF'
export const black='#000000'
export const grey='#F0F3F4'
export const darkGrey='#949494'
export const medGrey = '#b9bcbd'

//Theme
export const global = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    primary: green,
    background: white,
    surface: white,
    backdrop: white,
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
  backgroundColor: green,
  color: white,
  paddingTop: 75,
  fontFamily: 'Poppins-SemiBold',
  fontSize: 35,
  justifyContent: 'flex-start',
  marginBottom: 20,
  paddingHorizontal: 18
}

export const subtitle = {
  color: black,
  fontFamily: 'Poppins-SemiBold',
  fontSize: 25,
  justifyContent: 'flex-start',
  marginBottom: 4,
  paddingHorizontal: 18
}

export const text = {
  color: darkGrey,
  fontSize: 14,
  fontFamily: 'Poppins-Regular',
  justifyContent: 'flex-start',
  paddingHorizontal: 18,

}
//Other
export const chip = {
  fontSize: 16,
  backgroundColor: grey, 
  color: darkGrey, 
  borderRadius: 10, 
  paddingHorizontal: 12, 
  paddingVertical: 5,
  marginBottom: 8,
  justifyContent: 'center', 
  alignItems: 'center'
};

export const view = {
  paddingBottom: 0,
  fontFamily: 'Poppins-Regular',
  flex: 1,
  backgroundColor: white
};

export const flexView = {
  flexGrow: 1,
  justifyContent: 'space-between'
};

export const spaceBetweenView = {
  ...view, 
  justifyContent: 'space-between'
};

export const padding = {
  paddingHorizontal: 18
};

export const lastItem = {
  marginBottom: 20
};
//Small button icons are size={26}
//Large button icons are size={36}
