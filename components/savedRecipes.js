import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Provider as PaperProvider} from 'react-native-paper';

//Components
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';

//Styles & Theme
import { global, view, title, subtitle, green} from '../styles';

export function savedRecipes() {
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
          <ScrollView showsVerticalScrollIndicator={true}>
            <Text style={styles.title}>Saved</Text>
            <FlatList
              style={styles.list}
              data={favs}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                // <View style={styles.ingredient}>
                //   <Text style={styles.ingredientName}>{item.name}</Text>
                //   <Text style={styles.ingredientAmount}>{item.measures.us.amount} {item.measures.us.unitShort}</Text>
                // </View>
              )}
            />
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

