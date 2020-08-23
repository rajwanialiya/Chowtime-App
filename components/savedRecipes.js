import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Dimensions, ImageBackground } from 'react-native';
import { Provider as PaperProvider, Text, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons'; 

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
      setError(true)
    }
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
        <View style={styles.viewSpaceBetween}>
          <View>
            <Text style={styles.title}>Saved</Text>
            <EmptyPage 
              image={<MaterialIcons style={styles.emptyIcon} name='favorite-border' color={green} size={100} />} 
              title="Save your Favs." 
              text={[
                "You haven't added any recipes to your favourites yet. Get started by snapping some pics of the items in your fridge!"
              ]}/>
          </View>
          <SolidButton color={green} text="Get Recipes" onPress={() => navigation.navigate('oneRecipe', {item:item})} />
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
            renderItem={(item) => _renderItem(item, navigation)}
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
  view: {
    ...view,
  }, 
  viewCenter: {
    ...view,
    alignItems: 'center', 
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
