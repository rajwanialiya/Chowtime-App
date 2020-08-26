import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { padding } from '../../styles'

export function SolidButton(props) {
  return (
    <Button 
      mode='contained'
      color={props.color}  
      onPress={props.onPress}
      uppercase={false}
      labelStyle={{
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        color: 'white',
        margin: 0,
        padding: 0
      }}
      style={[styles.button, styles.padding, {flex:props.flex}]}
    >
      {props.text}
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: 64,
    minHeight: 36,
    margin: 12,
    marginHorizontal: 18,
    // borderWidth: 2,
  },
  padding: {
    ...padding
  }

})