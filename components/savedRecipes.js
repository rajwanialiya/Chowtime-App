import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

//Components
import { StyleSheet, View, FlatList, ScrollView, Dimensions, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';

//Styles & Theme
import { global, view, title, subtitle } from '../styles'
import { green } from '../styles'

export function savedRecipes() {
  const [isLoading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  // if (isLoading) {
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((json) => setRecipes(json))
    //   .catch((error) => console.error('oh no')) //figure out how to display error 
    //   .finally(() => setLoading(false));

  //   return (
  //       <View style={styles.viewCenter}>
  //         <ActivityIndicator 
  //           color={green}
  //           size='large'
  //         />
  //       </View>
  //     )
  // } else {
    return (
      <PaperProvider theme={global}>
        <View style={styles.view}>
          <ScrollView showsVerticalScrollIndicator={true}>
            <Text style={styles.title}>Saved</Text>
          </ScrollView>
        </View>
      </PaperProvider>
    )
  }
// }

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
