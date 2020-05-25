import React from 'react';
import { Button } from 'react-native-paper';

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
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: 64,
        minHeight: 36,
        margin: 12,
        borderWidth: 2,
        borderColor: props.color
      }}
    >
      {props.text}
    </Button>
  )
}