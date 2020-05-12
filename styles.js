import React from 'react';
import { useFonts } from '@use-expo/font';

let globalFont = '';

export function loadFonts() {
  let [fontsLoaded] = useFonts({
    'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    globalFont = 'Poppins-Regular'
  }
};

export const view = {
  backgroundColor: 'green',
  margin: 24, 
  fontSize: 18,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  fontFamily: globalFont
};