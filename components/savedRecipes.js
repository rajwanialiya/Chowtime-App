import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Dimensions, ImageBackground, AsyncStorage, Image } from 'react-native';
import { Provider as PaperProvider, Text, Button, ActivityIndicator } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { oneRecipe } from './oneRecipe.js';
import EmptyPage  from './empty'; 
import { SolidButton } from './buttons/solidButton'

import { global, view, title, subtitle, green, padding, flexView } from '../styles';

const Stack = createStackNavigator();
export function SavedTab() {
  return (
      <Stack.Navigator
        mode='card'
        initialRouteName="savedRecipes"
        screenOptions={{
          headerShown: false,
        }}
      >
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

function savedRecipes({navigation}) {
  const [empty, setEmpty] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const [isSet, set] = useState(false)
  const [favs, setFavs] = useState([]);
  const isFocused = useIsFocused()

  useEffect(() => {
    getFavs()
  }, [isFocused])

  // useEffect(() => { 
  //   setLoading(false) 
  //   console.log("local")
  //   console.log(favs)
  //   // if (favs.length >= 0) {
  //   //   setEmpty(true)
  //   // }
  // }, [favs]) 


  async function getFavs() {
    // setLoading(true)
    try {
      const value = await AsyncStorage.getItem('favRecipes');
      const parsedValue = await JSON.parse(value)
      if (parsedValue && parsedValue.length > 0) {
        setFavs(parsedValue)
        setEmpty(false)
      } else {
        setEmpty(true)
      }
      set(true)
    } catch(e) {
      console.log(e)
      // setError(true)
    }
    setLoading(false)
  }

  function _renderItem({item}, navigation) {
    return (
      <View style={[styles.recipesItem, styles.flexView]}>
        <ImageBackground
          style={styles.imageBackground}
          source={{uri: item.image}}
          resizeMode='cover'
        >
          <View style={styles.overlay} />
          <Text style={styles.name}>{item.title}</Text>
          <View>
              <SolidButton color={green} text="Explore" onPress={() => navigation.navigate('oneRecipe', {item:item, fromSavedPage: true})}></SolidButton>
              <Button mode="text" color="white" onPress={() => removeItem(item.title)}>Remove</Button>
          </View>
        </ImageBackground>
      </View>
    )
  }
  
  async function removeItem (title) {
    setLoading(true)
    let updatedFavs = []
    favs.forEach((recipe) => {
      if (recipe.title !== title) {
        updatedFavs.push(recipe)
      }
    }) 
    await AsyncStorage.setItem('favRecipes', JSON.stringify(updatedFavs))
    setFavs(updatedFavs)
  }

  if (isLoading) {
    return (
      <View style={styles.viewCenter}>
        <ActivityIndicator 
          color={green}
          size='large'
        />
      </View>
    )
  } else {
    if (empty && isSet) { 
      return (
        <PaperProvider theme={global}>
          <View style={styles.viewSpaceBetween}>
            <View>
              <Text style={styles.title}>Saved</Text>
              <EmptyPage 
                image={<Image style={styles.emptyIcon} source={require("../assets/empty-faves.png")} />} 
                title="Save your Favs." 
                text={[
                  "You haven't added any recipes to your favourites yet. Get started by snapping some pics of the items in your fridge!"
                ]}/>
            </View>
            <SolidButton color={green} text="Get Recipes" onPress={() => navigation.navigate("Camera")} />
          </View>
        </PaperProvider>
      )
    } else {
      return (
        <PaperProvider theme={global}>
          <View style={styles.view}>
            <Text style={styles.title}>Saved</Text>
            <FlatList
              contentContainerStyle={styles.recipesContainer}
              showsHorizontalScrollIndicator={false}
              snapToInterval={Dimensions.get('window').width - 52 + 18}
              snapToAlignment={"center"}
              decelerationRate={0.8}
              horizontal={true}
              scrollEnabled={true}
              data={favs}
              // keyExtractor={item => item.id.toString()}
              renderItem={(item) => _renderItem(item, navigation)}
            />
          </View>
        </PaperProvider>
      )
    }
  }
}

const styles = StyleSheet.create({
  emptySub: {
    paddingVertical: 20,
    fontFamily: 'Poppins-Medium',
    fontSize: 16
  },
  view: {
    ...view,
  }, 
  viewCenter: {
    ...view,
    alignItems: 'center', 
    justifyContent: 'center',
    flexGrow: 1
  }, 
  viewSpaceBetween: {
    ...view, 
    justifyContent: 'space-between'
  },
  flexView: {
    ...flexView
  },
  padding: {
    ...padding
  },
  title: {
    ...title,
  }, 
  recipesItem: {
    paddingRight:18, 
    marginBottom: 20
  },
  imageBackground: {
    ...flexView,
    width:Dimensions.get('window').width - 52, 
    borderRadius: 10, 
    overflow:'hidden',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
    justifyContent:'space-between',
    padding: 20
  }, 
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)'
  }, 
  name: {
    ...subtitle,
    color: 'white',
    margin: 0,
    paddingHorizontal: 0
  },
  recipesContainer: {
    overflow:'scroll',
    paddingHorizontal:16,
  }, 
  info: {
    ...subtitle,
    color: 'white',
    marginVertical: 0,
    paddingHorizontal: 0,
    fontSize: 18,
    textAlignVertical: 'center'
  }
})

