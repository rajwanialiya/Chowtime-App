import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { padding } from '../../styles'

export function OutlinedButton(props) {
  return (
    <Button 
      mode='text'
      color={props.color}
      uppercase={false}
      labelStyle={{
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        margin: 0,
        padding: 4
      }}
      style={[styles.button, styles.padding, {borderColor:props.color}]}
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
    borderWidth: 2
  },
  padding: {
    ...padding
  }
})