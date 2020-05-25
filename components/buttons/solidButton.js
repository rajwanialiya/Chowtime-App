import React from 'react';
import { Button } from 'react-native-paper';

export function SolidButton(props) {
  return (
    <Button 
      mode='contained'
      color={props.color}  
      uppercase={false}
      labelStyle={{
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        color: 'white',
        margin: 0,
        padding: 4
      }}
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: 64,
        minHeight: 36,
        margin: 12
      }}
    >
      {props.text}
    </Button>
  )
}