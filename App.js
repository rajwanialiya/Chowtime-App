import React, { useState } from 'react';
import * as Font from 'expo-font';

//Components
import { TabNav } from './components/nav'
import { AppLoading } from 'expo';

const loadFonts = () => Font.loadAsync({
  'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
  'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
  'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
  'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
  'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
})

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  if (fontsLoaded) {
    return (
      <TabNav></TabNav>
    );  
  } else {
    return(
      <AppLoading 
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }
}
