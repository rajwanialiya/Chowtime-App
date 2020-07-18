import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Provider as PaperProvider} from 'react-native-paper';

//Components
import { StyleSheet, View, ScrollView, FlatList, Dimensions, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';

//Styles & Theme
import { global, view, title, subtitle, green} from '../styles';

export function savedRecipes({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [favs, setFavs] = useState([]);
  const isFocused = useIsFocused()

  useEffect(() => {
    setLoading(true)
    getFavs()
  } , [isFocused])

  async function getFavs() {
    try {
      const value = await AsyncStorage.getItem('favRecipes');
      setFavs(JSON.parse(value))
    } catch(e) {
      // error reading value
    }
    setLoading(false)
    console.log(favs)
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
    return (
      <PaperProvider theme={global}>
        <View style={styles.view}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={true}>
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
              keyExtractor={item => item.id.toString()}
              renderItem={(item) => _renderItem(item, navigation)}
            />
          </ScrollView>
        </View>
      </PaperProvider>
    )
  }
}

function _renderItem({item}, navigation) {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('oneRecipe', {item:item, apiKey: apiKey})}>
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
  recipesItem: {
    paddingRight:18, 
    flex: 1,
    height: Dimensions.get('window').height
  },
  imageBackground: {
    height: Dimensions.get('window').height, 
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)'
  }, 
  name: {
    ...subtitle,
    color: 'white',
    marginVertical: 20
  },
  recipesContainer: {
    overflow:'scroll',
    paddingHorizontal:16,
    flex: 1
  }, 
})

