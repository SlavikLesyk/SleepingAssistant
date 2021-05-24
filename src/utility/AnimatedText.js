import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { TextInput } from 'react-native-gesture-handler';
import { COLOR_MAIN } from '../Constants';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const AnimatedTextSpinner= ({ text, style }) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
    }
  })

  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      value={text.value}
      animatedProps={animatedProps}
      style={[styles.input, style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    fontFamily: 'zekton',
    color: COLOR_MAIN,
    padding: 0,
    fontSize: 18,
    letterSpacing: 5
  }
});

export default AnimatedTextSpinner;