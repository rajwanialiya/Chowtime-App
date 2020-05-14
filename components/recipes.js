import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { StyleSheet, View, FlatList } from 'react-native';
import { Text, ActivityIndicator, Chip } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';

//Theme
import { global } from '../styles';

//Styles
import { view } from '../styles'
import { title } from '../styles'
import { subtitle } from '../styles'
import { chip } from '../styles'

export function Recipes() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const foodItems = ['chicken', 'tomato', 'apple', 'lemonsssssss', 'chicken', 'tomato', 'apple', 'lemonsssssss', 'chicken', 'tomato', 'apple', 'lemonsssssss'] // REPLACE AFTER
  const appKey = '4e12a9394efa795c901712637778f43c'
  const appID = 'd0721604'
  const base = 'https://api.edamam.com/search'

  const url = base 
    + '?q=' + foodItems.join(", ") 
    + '&app_id=' + appID 
    + '&app_key=' + appKey


  if (isLoading) {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json.hits))
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
          <Text style={styles.title}> Recipes </Text>
          <Text style={styles.subtitle}> Your Ingredients </Text>
          <FlatList
            contentContainerStyle={{flexWrap:'wrap', flex: 0}}
            style={styles.row}
            horizontal={true}
            scrollEnabled={false}
            data={foodItems}
            renderItem={({ item }) => (
              <Text style={styles.chip}>{item}</Text>
            )}
          />

          {/* Recipes */}
          <Text style={styles.subtitle}> Recipes</Text>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Text>{ item.recipe.calories }</Text>
            )}
        />
          {/* <Carousel
              layout={'default'}
              // activeSlideOffset={2}
              sliderWidth={200}
              itemWidth={100}
              inactiveSlideScale={0.98}

              data={data}
              renderItem={({ item }) => (
                <Text>{item.recipe.calories}</Text>
              )}
            /> */}
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    ...view
  }, 
  viewCenter: {
    ...view,
    justifyContent: 'center'
  }, 
  title: {
    ...title
  }, 
  subtitle: {
    ...subtitle
  }, 
  row: {
    flexDirection: 'column',
    flexGrow: 0,
    marginVertical: 8,
  }, 
  chip: {
    ...chip
  }
})
