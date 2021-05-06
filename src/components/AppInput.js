import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { COLOR_SECONDARY } from '../Constants';

const AppInput = (props) => {
  return (
    <TextInput
      autCapitalize='none'
      autoCompleteType='off'
      spellCheck={false}
      {...props}
      style={[styles.input, props.style]}
    />
  );
}


const styles = StyleSheet.create({
  input: {
    fontFamily: 'zekton',
    color: COLOR_SECONDARY,
    fontSize: 18,
    letterSpacing: 5,
  }
});

export default AppInput;