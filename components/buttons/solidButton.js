import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function SolidButton(props) {
  return (
    <Button 
      mode='contained'
      color={props.color}  
      onPress={props.onPress}
      uppercase={false}
      labelStyle={styles.label}
      style={styles.button}
    >
      {props.text}
    </Button>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'SF-Medium',
    fontSize: 18,
    color: 'white',
    margin: 0,
    padding: 0
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: 64,
    minHeight: 36,
    marginVertical: 12,
    borderRadius: 25
  },
})