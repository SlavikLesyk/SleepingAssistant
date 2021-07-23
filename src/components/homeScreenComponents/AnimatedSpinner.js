import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnimatedText from '../../utility/AnimatedText';
import { windowHeight } from '../../Constants';

export default function AnimatedSpinner({ text, prevText, nextText }) {

  return (
    <View style={styles.container}>
      <AnimatedText text={nextText} style={[styles.textSecondary, styles.textTop]} />
      <AnimatedText text={text} style={styles.textMain} />
      <AnimatedText text={prevText} style={[styles.textSecondary, styles.textBottom]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textMain: {
    fontSize: windowHeight * .1,
  },
  textSecondary: {
    fontSize: windowHeight * .04,
    position: 'absolute',
    opacity: .5
  },
  textTop: {
    top: - windowHeight * .04
  },
  textBottom: {
    bottom: - windowHeight * .04
  }
});
