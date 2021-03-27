import  React  from 'react';
import { TextInput, StyleSheet } from 'react-native';

import { COLOR_SECONDARY } from '../Constants';

const AppInput = (props) => {  
  return (
    <TextInput 
      autCapitalize='none'
      autoCompleteType=  'off'
      { ...props} 
      style={[styles.input, props.style]}
    />
  );
}


const styles = StyleSheet.create({
  input: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'zekton',
    color: COLOR_SECONDARY,
    fontSize: 18,
    letterSpacing: 5,
  }
});

export default AppInput;