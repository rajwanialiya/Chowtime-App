import React from 'react';
import { Button } from 'react-native-paper';

export function SmallButton(props) {
  return (
    <Button 
      mode='contained'
      color={props.color}
      uppercase={false}
      labelStyle={{
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: 'white',
        margin: 0,
        padding: 0
      }}
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: 64,
        minHeight: 30,
        padding: 0,
        margin: 12,
        borderRadius: 30,
      }}
    >
      {props.text}
    </Button>
  )
}