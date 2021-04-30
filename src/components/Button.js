import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from './AppText'

const Button = ({ children, onPress, style }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <AppText style={style}>{children}</AppText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 0,
    alignSelf: 'center',
    paddingHorizontal: 10,
  }
});

export default Button;
