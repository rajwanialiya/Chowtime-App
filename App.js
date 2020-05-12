import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import * as Font from 'expo-font';

import { TabNav } from './components/nav'
import { AppLoading} from 'expo';

// import { loadFonts } from './styles';
import { view } from './styles';
import { font } from './styles'

const loadFonts = () => Font.loadAsync({
  'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
  'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
  'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
})
// .then(() => setFontsLoaded(true));

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

const styles = StyleSheet.create({
  view: {
    ...view
  },
  navContainer: {
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 24
  }
});
