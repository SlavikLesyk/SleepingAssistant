import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  cancelAnimation,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { windowHeight } from '../../Constants';

export default function AnimationGesture({ translateX, onChangeValue }) {

  const clamp = (value, lowerBound, upperBound) => {
    'worklet';
    return Math.min(Math.max(lowerBound, value), upperBound);
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      cancelAnimation(translateX);
      ctx.offsetX = translateX.value;
    },
    onActive: (event, ctx) => {
      onChangeValue(clamp(event.translationX + ctx.offsetX, -137, 137));
    },
    onEnd: () => {
    }
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={styles.controlArea} />
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight * .5,
  },
  controlArea: {
    height: windowHeight * .2,

  }
});
