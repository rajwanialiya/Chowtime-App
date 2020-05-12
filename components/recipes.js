import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import { view } from '../styles';

export function Recipes() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const foodItems = ['chicken', 'tomato'] // REPLACE AFTER
  const appKey = '4e12a9394efa795c901712637778f43c'
  const appID = 'd0721604'
  const base = 'https://api.edamam.com/search'

  const url = base 
    + '?q=' + foodItems.join(", ") 
    + '&app_id=' + appID 
    + '&app_key=' + appKey


  if (isLoading) { //IS THIS PROPER??
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json.hits))
      .catch((error) => console.error('oh no')) //figure out how to display error 
      .finally(() => setLoading(false));
  }

  //organize in a carousel, figure out how to save info
  return (
    <View style={ styles.view }>
      <Text style={ styles.view }> hell0o </Text>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Text>{ item.recipe.calories }</Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    ...view
  },
})

