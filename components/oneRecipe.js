import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { apiKey } from '../constants';

//Components
import { StyleSheet, ScrollView, View, ImageBackground, Dimensions, FlatList } from 'react-native';
import { Text, ActivityIndicator, IconButton, Snackbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; 

//Styles & Theme
import { global, view, title, subtitle, chip } from '../styles';
import { grey, darkGrey, green } from '../styles';
import { SolidButton } from './buttons/solidButton';

let allFavs = []
export function oneRecipe({route, navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const [prevFavs, setPrevFavs] = useState([]);

  const base='https://api.spoonacular.com/recipes/'
  const { item } = route.params

  const url = base 
    + item.id
    + '/information'
    + '?apiKey=' + apiKey

  useEffect(() => {
    setTimeout(function() { 
      if (visible) {
        setVisible(false);
      }
    }, 1500);
  }, [visible])

  useEffect(() => {
    getFavs()
  }, [])

  async function getFavs() {
    try {
      const value = await AsyncStorage.getItem('favRecipes');
      setPrevFavs(JSON.parse(value))
      if (allFavs.length === 0 && prevFavs.length > 0) {
        allFavs.push(prevFavs)
      }
    } catch(e) {
        // PUT ERROR HERE     
    }
  }

  async function saveRecipe(recipe) {
    allFavs.push(recipe)
    try {
      await AsyncStorage.setItem('favRecipes', JSON.stringify(allFavs));
      setVisible(true);
    } catch (e) {
        // PUT ERROR HERE
    }
    getFavs()
  }

  if (isLoading) {
    fetch(url)
    .then((response) => response.json())
    .then((json) => setRecipe(json))
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
            <View style={[styles.row, {backgroundColor: green}]}>
              <Text style={[styles.title, {flex: 3}]}>{item.title}</Text>
              <IconButton onPress={() => navigation.goBack()} icon='keyboard-backspace' color='white' size={36} style={styles.icon} /> 
            </View>
            <View style={styles.imageContainer}>
              <ImageBackground
                style={styles.imageBackground}
                source={{uri: item.image}}
                resizeMode='cover'
              >
                <View style={styles.overlay}></View>
                <View style={{flexDirection:'row'}}>
                  <MaterialIcons name="access-time" size={36} color="white" />
                  <Text style={styles.time}>{recipe.readyInMinutes} mins</Text>
                </View>
                <View>
                  <FlatList
                    data={recipe.diets}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                      <Text style={styles.info}>{item}</Text>
                    )}
                  />
                </View>
              </ImageBackground>
            </View>
            <Text style={styles.subtitle}>Ingredients</Text>
            <FlatList
              style={styles.list}
              data={recipe.extendedIngredients}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View style={styles.ingredient}>
                  <Text style={styles.ingredientName}>{item.name}</Text>
                  <Text style={styles.ingredientAmount}>{item.measures.us.amount} {item.measures.us.unitShort}</Text>
                </View>
              )}
            />
            <FlatList
              style={styles.list}
              data={recipe.analyzedInstructions[0].steps}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View>
                  <Text style={styles.stepName}>Step {item.number}</Text>
                  <Text style={styles.instructions}>{item.step}</Text>
                </View>
              )}
            />
            <View style={styles.buttonContainer}>
              <SolidButton color={green} flex={1} text="Add to Favourites" onPress={() => {saveRecipe(recipe)}}></SolidButton>
            </View>
          </ScrollView>
          <View style={styles.snackbarView}>
            <Snackbar
              visible={visible}
              duration={1500}
              onDismiss={() => setVisible(false)}
              wrapperStyle={styles.snackbarContainer}
              style={styles.snackbar}
              action={{
                label: 'Undo',
                onPress: () => {}
              }}
            >
              Added to Favourites
            </Snackbar>
          </View>
        </View>
      </PaperProvider>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    ...view
  }, 
  viewCenter: {
    ...view,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  title: {
    ...title,
    flexWrap: 'wrap',
  },
  icon: {
    marginTop: 75,
  },
  subtitle: {
    ...subtitle
  },
  row: {
    flexDirection: 'row'
  }, 
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
    height: 310
  }, 
  overlay: {
    height: 360,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)'
  }, 
  imageBackground: {
    height: 300, 
    width:Dimensions.get('window').width - 32, 
    borderRadius: 10, 
    overflow:'hidden',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
    justifyContent:'space-between',
    padding: 20
  }, 
  time: {
    ...subtitle,
    color: 'white',
  },
  info: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 18
  },
  list: {
    marginHorizontal: 16,
    marginTop: 12
  },
  ingredient: {
    ...chip,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: grey, 
    borderRadius: 10, 
    marginBottom: 8,
    alignItems: 'center'
  }, 
  ingredientName: {
    fontSize: 16,
    color: darkGrey, 
    paddingLeft: 6, 
    paddingVertical: 4,
  }, 
  ingredientAmount: {
    fontSize: 16,
    color: green, 
    paddingRight: 6, 
  }, 
  stepName: {
    ...subtitle, 
    fontSize: 22,
    marginVertical: 12, 
    paddingHorizontal: 0
  }, 
  buttonContainer: {
    justifyContent: 'center',
    marginVertical: 40,
    flexDirection: 'row',
  },
  snackbarView: {
    position: 'relative',
    justifyContent:'center',
    marginHorizontal: 10,
  },
  snackbarContainer: {
    backgroundColor: '#303030',
    padding: 0,
    borderRadius: 10,
    color: 'white',
    marginVertical: 10
  }, 
  snackbar: {
    backgroundColor: '#303030',
    margin: 0
  }
})