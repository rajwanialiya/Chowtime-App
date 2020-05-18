import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { StyleSheet, View, FlatList, ScrollView, Dimensions, ImageBackground} from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';

//Styles & Theme
import { global, noPadding, title, subtitle, chip } from '../styles'

export function Recipes() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const foodItems = ['chicken', 'tomato', 'apple', 'tomato', 'apple'] // REPLACE AFTER
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}> Recipes </Text>
            
            {/* Your Ingredients */}
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
            <View>
              <FlatList
                contentContainerStyle={{overflow:'scroll', paddingHorizontal:16}}
                decelerationRate={0}
                snapToInterval={Dimensions.get('window').width - 52 + 18} //your element width
                snapToAlignment={"center"}
                horizontal={true}
                scrollEnabled={true}
                data={data}
                keyExtractor={item => item.recipe.label}
                // renderItem={_renderItem}
                renderItem={({ item }) => (
                  <View style={{paddingRight:18}}>
                    <ImageBackground
                      style={{height:360, width:Dimensions.get('window').width - 52, borderRadius: 10, overflow:'hidden'}}
                      source={{uri: item.recipe.image}}
                      resizeMode='cover'
                    />
                    <Text style={styles.chip}>{item.recipe.calories}</Text>
                  </View>
                )}
              />
            </View>
            {/* <Carousel
              layout={'default'}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width - 32}
              inactiveSlideScale={1}
              slideStyle={{
                paddingHorizontal: 8,
              }}

              data={data}
              keyExtractor={item => item.recipe.label}
              renderItem={_renderItem}
              /> */}
          </ScrollView>
        </View>
      </PaperProvider>
    );
  }
}

// , shadowOffset:{  width: 10,  height: 10,  },
//                 shadowColor: 'black',
                // shadowOpacity: 1.0,

function _renderItem({item,index}){
  // const {height, width} = Dimensions.get('screen');
  return (
      <View>
        {/* <Image style={{height: 350}} resizeMode='cover' source={{uri: item.recipe.image}}/> */}
        <Text>{item.recipe.calories}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  view: {
    ...noPadding
  }, 
  viewCenter: {
    ...noPadding,
    justifyContent: 'center'
  }, 
  title: {
    ...title,
    marginHorizontal: 16
  }, 
  subtitle: {
    ...subtitle,
    marginHorizontal: 16
  }, 
  chip: {
    ...chip
  }, 
  row: {
    flexDirection: 'column',
    flexGrow: 0,
    marginVertical: 8,
    marginHorizontal: 16
  }
})
