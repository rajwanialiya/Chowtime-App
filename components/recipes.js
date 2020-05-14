import React, { useState } from 'react';
import { ActivityIndicator, FlatList} from 'react-native';
import { global } from '../styles'
import { Button, Text, ThemeProvider, View } from 'react-native-elements';

export function Recipes() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const foodItems = ['chicken', 'tomato', 'apple', 'lemon'] // REPLACE AFTER
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
    
      return <ActivityIndicator/>
  } else {
    return (
      <ThemeProvider theme={global}>
          <Button title="Button"/>
          <Text> hell0o </Text>
          {isLoading ? <ActivityIndicator/> : (
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <Text>{ item.recipe.calories }</Text>
              )}
            />
          )}
      </ThemeProvider>
    );
  }
}


