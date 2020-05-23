import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

//Components
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, ActivityIndicator, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; 

//Styles & Theme
import { global, noPadding, title, subtitle } from '../styles'

export function oneRecipe() {
// export function oneRecipe(item, apiKey) { FOR TESTING
  const apiKey = 'b556ab3c2afc492591f1fefb19578bb4'// FOR TESTING
  const item = {title: 'Rosemary Chicken', id: '510891'}// FOR TESTING

  const [isLoading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState([]);
  const base='https://api.spoonacular.com/recipes/'

  const url = base 
    + item.id
    + '/information'
    + '?apiKey=' + apiKey

  if (isLoading) {
    fetch(url)
    .then((response) => response.json())
    .then((json) => setRecipe(json))
    .catch((error) => console.error('oh no')) //figure out how to display error 
    .finally(() => setLoading(false));
    
    return (
      <View style={styles.viewCenter}>
        <ActivityIndicator 
          color='#32CA81'
          size='large'
        />
      </View>
    )
  } else {
    return (
      <PaperProvider theme={global}>
        <View style={styles.view}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.row}>
              <Text style={[styles.title, {flex: 3}]}>{item.title}</Text>
              <IconButton icon='keyboard-backspace' color='black' size={36} style={{justifyContent: 'flex-start'}} /> 
              {/* MAKE THIS A BUTTON */}
            </View>
          </ScrollView>
        </View>
      </PaperProvider>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    ...noPadding
  }, 
  viewCenter: {
    ...noPadding,
    justifyContent: 'center'
  }, 
  title: {
    ...title,
    flexWrap: 'wrap',
    marginHorizontal: 16
  }, 
  subtitle: {
    ...subtitle,
    marginHorizontal: 16
  },
  row: {
    flexDirection: 'row'
  }, 
  back: {
    flex: 1, 
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
})