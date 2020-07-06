import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Provider as PaperProvider } from 'react-native-paper';

//Components
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

//Styles & Theme
import { global, view, title, subtitle} from '../styles';

export function savedRecipes() {
  const [saved, setSaved] = useState('');

  async function getSaved() {
      try {
        const value = await AsyncStorage.getItem('savedRecipes');
        setSaved(JSON.parse(value));
      } catch(e) {
        // error reading value
      }
      // console.log("called")
  }
  
  useEffect(() => {
    // getSaved();
  })

  return (
    <PaperProvider theme={global}>
      <View style={styles.view}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <Text style={styles.title}>Saved</Text>
          <Text>visible: {saved.title}</Text>
        </ScrollView>
      </View>
    </PaperProvider>
  )
}
// }

const styles = StyleSheet.create({
  view: {
    ...view,
  }, 
  viewCenter: {
    ...view,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  title: {
    ...title,
  }, 
  subtitle: {
    ...subtitle,
  }
})
