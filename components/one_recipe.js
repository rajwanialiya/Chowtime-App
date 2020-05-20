import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { global, view, title } from '../styles'

export function getId(item, apiKey){
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
            <Text style={styles.title}> {recipe.vegan} </Text>
          </ScrollView>
        </View>
      </PaperProvider>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    ...view
  }, 
  title: {
    ...title
  }
})