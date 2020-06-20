import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {Text} from 'react-native-paper';

//Theme
import { global } from '../styles';

//Styles
import { view, padding, title, subtitle } from '../styles';

//Components
import { SolidButton } from '../components/buttons/solidButton';
import { OutlinedButton } from '../components/buttons/outlinedButton'
import { SmallButton } from '../components/buttons/smallButton'

export function Demo() {
  return(
    <PaperProvider theme={global}>
      <View style={styles.view}>
        <Text style={styles.title}>Title</Text>
        <Text style={styles.subtitle}>Subtitle</Text>
        <Text style={styles.padding}>Regular Text</Text>

        <SolidButton color='#EC5454' text="Filled" style={styles.padding}></SolidButton>
        <OutlinedButton color='#32CA81' text="Unfilled" style={styles.padding}></OutlinedButton>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <SmallButton color='#EC5454' text="Small"></SmallButton>
          <SmallButton color='#32CA81' text="Small"></SmallButton>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  view: {
    ...view
  }, 
  title: {
    ...title
  },
  subtitle: {
    ...subtitle
  }, 
})