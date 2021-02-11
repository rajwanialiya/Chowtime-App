import React from 'react';
import { Button } from 'react-native-paper';

export default function SmallButton(props) {
  return (
    <Button 
      mode='contained'
      color={props.color}
      onPress={props.onPress}
      uppercase={false}
      labelStyle={{
        fontFamily: 'SF-Regular',
        fontSize: 20,
        color: 'white',
        margin: 0,
        padding: 0
      }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 0,
        borderRadius: 10,
        marginBottom: 4
      }}
    >
      {props.text}
    </Button>
  )
}