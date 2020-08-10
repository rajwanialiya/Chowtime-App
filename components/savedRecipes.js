import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Provider as PaperProvider, Text, Button } from 'react-native-paper';

//Components
import { StyleSheet, View, FlatList, Dimensions, ImageBackground } from 'react-native';
import { SolidButton } from './buttons/solidButton'
import { MaterialIcons } from '@expo/vector-icons'; 

//Styles & Theme
import { global, view, title, subtitle, green, padding, flexView } from '../styles';

export function savedRecipes() {
  const [empty, setEmpty] = useState(true)
  const [isSet, set] = useState(false)
  const [favs, setFavs] = useState([]);
  const isFocused = useIsFocused()

  useEffect(() => {
    getFavs()
  } , [isFocused])

  async function getFavs() {
    try {
      const value = await AsyncStorage.getItem('favRecipes');
      if (JSON.parse(value) && JSON.parse(value).length > 0) {
        await setFavs(JSON.parse(value))
        setEmpty(false)
      } else {
        setEmpty(true)
      }
      set(true)
    } catch(e) {
      // error reading value
    }
  }

  function _renderItem({item}) {
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
                <SolidButton color={green} text="Explore" onPress={() => console.log(item.navigate)}></SolidButton>
                <Button mode="text" color="white" onPress={() => removeItem(item.title)}>Remove</Button>
            </View>
        </ImageBackground>
      </View>
    )
  }
  
  async function removeItem(title) {
    let updatedFavs = []
    favs.forEach((recipe) => {
      if (recipe.title !== title) {
        updatedFavs.push(recipe)
      }
    }) 
    await AsyncStorage.setItem('favRecipes', JSON.stringify(updatedFavs))
    getFavs()
  }

  if (empty && isSet) { 
    return (
      <PaperProvider theme={global}>
        <View style={styles.view}>
            <Text style={styles.title}>Saved</Text>
            <View style={[styles.viewCenter, styles.padding]}>
              <View style={styles.viewCenter}>
                <MaterialIcons style={styles.emptyIcon} name='favorite-border' color={green} size={60} /> 
                <Text style={styles.emptySub}>ADD RECIPES TO YOUR FAVOURITES</Text>
                <Text style={styles.emptyText}>You haven't added any recipes to your favourites yet. Get started by snapping some pics of the items in your fridge!</Text>
              </View>
              <SolidButton color={green} text="Get Recipes" onPress={() => navigation.navigate('oneRecipe', {item:item})} />
            </View>
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
            decelerationRate={0}
            snapToInterval={Dimensions.get('window').width - 52 + 18}
            snapToAlignment={"center"}
            horizontal={true}
            scrollEnabled={true}
            data={favs}
            // keyExtractor={item => item.id.toString()}
            renderItem={(item) => _renderItem(item)}
          />
        </View>
      </PaperProvider>
    )
  }
}

const styles = StyleSheet.create({
  emptySub: {
    paddingVertical: 20,
    fontFamily: 'Poppins-Medium',
    fontSize: 16
  },
  emptyIcon: {
    paddingTop: 20,
  },
  view: {
    ...view
  }, 
  viewCenter: {
    ...view,
    alignItems: 'center', 
    flexGrow: 1
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

