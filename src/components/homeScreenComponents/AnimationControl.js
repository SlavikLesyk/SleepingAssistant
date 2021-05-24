import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  withDecay,
  cancelAnimation,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { windowHeight } from '../../Constants';

export default function AnimationGesture({ translateY, onChangeValue }) {

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      cancelAnimation(translateY);
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      onChangeValue(event.translationY + ctx.offsetY);
    },
    onEnd: (event, ctx) => {
      onChangeValue(withDecay({
        velocity: event.velocityY
      }));
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
    height: windowHeight * .45,
  }
});
