import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

//Components
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, FlatList, ScrollView, Dimensions, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { oneRecipe } from '../components/oneRecipe';
import { savedRecipes } from '.../components/savedRecipes';

//Styles & Theme
import { global, view, title, subtitle } from '../styles'
import { green } from '../styles'

const apiKey = 'b556ab3c2afc492591f1fefb19578bb4'

export function savedRecipes() {
  const [isLoading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const foodItems = ['chicken', 'tomato', 'apple', 'tomato', 'apple'] // REPLACE AFTER
  const base='https://api.spoonacular.com/recipes/findByIngredients'

  const url = base 
    + '?ingredients=' + foodItems.join(", ") 
    + '&apiKey=' + apiKey 

  if (isLoading) {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setRecipes(json))
      .catch((error) => console.error('oh no')) //figure out how to display error 
      .finally(() => setLoading(false));

    return (
        <View style={styles.viewCenter}>
          <ActivityIndicator 
            color={green}
            size='large'
          />
        </View>
      )
  } else {
    return (
      <PaperProvider theme={global}>
        <View style={styles.view}>
          <ScrollView showsVerticalScrollIndicator={true}>
            <Text style={styles.title}>Saved</Text>
          </ScrollView>
        </View>
      </PaperProvider>
    )
  }
}

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
