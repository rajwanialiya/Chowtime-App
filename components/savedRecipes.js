import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Provider as PaperProvider} from 'react-native-paper';

//Components
import { StyleSheet, View, ScrollView, FlatList, Dimensions, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { SolidButton } from './buttons/solidButton'

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
            <View>
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
            </View>
          </ScrollView>
        </View>
      </PaperProvider>
    )
  }
}

function _renderItem({item}, navigation) {
  return (
    <ScrollView>
      <View style={styles.recipesItem}>
        <ImageBackground
          style={styles.imageBackground}
          source={{uri: item.image}}
          resizeMode='cover'
        >
            <View style={styles.overlay} />
            <Text style={styles.name}>{item.title}</Text>
            <View>
                <Text style={styles.info}>Ready in {item.readyInMinutes} mins</Text>
                <SolidButton color={green} text="Explore" onPress={() => navigation.navigate('oneRecipe', {item:item})}></SolidButton>
            </View>
        </ImageBackground>
      </View>
    </ScrollView>
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
  recipesItem: {
    paddingRight:18, 
    height: 500
  },
  imageBackground: {
    height: 500,
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
    backgroundColor: 'rgba(0,0,0,0.4)'
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

