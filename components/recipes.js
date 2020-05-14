import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Text, ActivityIndicator, Chip } from 'react-native-paper';

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

  const foodItems = ['chicken', 'tomato', 'apple', 'lemonsssssss'] // REPLACE AFTER
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
        <View style={styles.view}>
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

          {/* Your Ingredients */}
          <Text style={styles.subtitle}> Your Ingredients </Text>
          <FlatList
            style={styles.row}
            // numColumns={2}
            horizontal={true}
            scrollEnabled={false}
            data={foodItems}
            renderItem={({ item }) => (
              <Text style={styles.chip}>{item}</Text>
            )}
          />

          {/* Recipes */}
          <Text style={styles.subtitle}> Recipes </Text>
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    ...view,
    justifyContent:'center'
  }, 
  title: {
    ...title
  }, 
  subtitle: {
    ...subtitle
  }, 
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // flex: 1,
    marginTop: 8,
  }, 
  chip: {
    ...chip,
    // flexWrap: 'wrap',
    // flex: 1
    // flex: 3
  }
})
