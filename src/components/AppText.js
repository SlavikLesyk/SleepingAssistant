import  React  from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLOR_MAIN } from '../Constants';

const AppText = ({ style, children }) => {
  return (
    <Text style={[styles.text, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'zekton',
    color: COLOR_MAIN,
    fontSize: 18,
    letterSpacing: 4
  }
});

export default AppText;