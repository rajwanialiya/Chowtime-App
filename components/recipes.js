import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { apiKey } from '../constants'

//Components
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { StyleSheet, View, FlatList, ScrollView, Dimensions, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Text, ActivityIndicator, Button } from 'react-native-paper';
import { oneRecipe } from './oneRecipe.js';
import { savedRecipes } from './savedRecipes.js';

//Styles & Theme
import { global, view, title, subtitle, chip } from '../styles'
import { green } from '../styles'

const Stack = createStackNavigator();
export function RecipesTab() {
  return (
      <Stack.Navigator
        mode='card'
        initialRouteName="Recipes"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Recipes" 
          component={Recipes}
          options={{
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS
          }}
        />
        <Stack.Screen
          name="oneRecipe" 
          component={oneRecipe}
          options={{
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS
          }}
        />
        <Stack.Screen
          name="savedRecipes" 
          component={savedRecipes}
          options={{
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS
          }}
        />
      </Stack.Navigator>
  );
}

function Recipes({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({ tabBarVisible:false });
  }, [navigation]);

  const foodItems = ['chicken', 'tomato', 'apple']
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Recipes</Text>
            
            {/* Your Ingredients */}
            <Text style={styles.subtitle}>Your Ingredients</Text>
            <FlatList
              contentContainerStyle={{flexWrap:'wrap', flex: 0}}
              style={styles.row}
              horizontal={true}
              scrollEnabled={false}
              data={foodItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <Text style={styles.chip}>{item}</Text>
              )}
            />

            {/* Recipes */}
            <Text style={styles.subtitle}>Recipes</Text>
            <View>
              <FlatList
                contentContainerStyle={styles.recipesContainer}
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                snapToInterval={Dimensions.get('window').width - 52 + 18}
                snapToAlignment={"center"}
                horizontal={true}
                scrollEnabled={true}
                data={recipes}
                keyExtractor={item => item.id.toString()}
                renderItem={(item) => _renderItem(item, navigation)}
              />
            </View>
          </ScrollView>
        </View>
      </PaperProvider>
    )
  }
}

function _renderItem({item}, navigation) {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('oneRecipe', {item:item})}>
      <View style={styles.recipesItem}>
        <ImageBackground
          style={styles.imageBackground}
          source={{uri: item.image}}
          resizeMode='cover'
        >
            <View style={styles.overlay} />
            <Text style={styles.name}>{item.title}</Text>
            <Text style={[styles.name, styles.ingredientCount]}>Your Ingredients: {item.usedIngredientCount}</Text>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )
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
  }, 
  name: {
    ...subtitle,
    color: 'white',
    marginVertical: 20
  }, 
  chip: {
    ...chip,
    marginRight: 8
  }, 
  row: {
    flexDirection: 'column',
    flexGrow: 0,
    marginVertical: 8,
    marginHorizontal: 16
  },
  recipesContainer: {
    overflow:'scroll',
    paddingHorizontal:16
  },
  recipesItem: {
    paddingRight:18, 
    height: 380,
  },
  imageBackground: {
    height:360, 
    width:Dimensions.get('window').width - 52, 
    borderRadius: 10, 
    overflow:'hidden',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
    justifyContent:'space-between',
    paddingBottom: 10
  }, 
  overlay: {
    height: 360,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)'
  }, 
  ingredientCount: {
    fontSize: 18
  }
})
