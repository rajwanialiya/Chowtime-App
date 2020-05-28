import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {Text} from 'react-native-paper';

//Theme
import { global } from '../styles';

//Styles
import { view } from '../styles'
import { title } from '../styles'
import { subtitle } from '../styles'
import { green, red } from '../styles'

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
        <Text>Regular Text</Text>

        <SolidButton color={red} text="Filled"></SolidButton>
        <OutlinedButton color={green} text="Unfilled"></OutlinedButton>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <SmallButton color={green} text="Small"></SmallButton>
          <SmallButton color={red} text="Small"></SmallButton>
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
  }
})