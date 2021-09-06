import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  windowWidth,
  COLOR_MAIN,
  COLOR_SECONDARY,
  BG_COLOR_COMPONENTS,
} from '../../Constants';

const KNOB_WIDTH = 20;
const sliderWidth = windowWidth * 0.7;

const VolumeBar = ({onChangeVolume}) => {
  const translateX = useSharedValue(sliderWidth - KNOB_WIDTH);
  const isSliding = useSharedValue(false);

  const clamp = (value, lowerBound, upperBound) => {
    'worklet';
    return Math.min(Math.max(lowerBound, value), upperBound);
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
    },
    onActive: (event, ctx) => {
      isSliding.value = true;
      translateX.value = clamp(
        event.translationX + ctx.offsetX,
        0,
        sliderWidth - KNOB_WIDTH,
      );
    },
    onEnd: () => {
      isSliding.value = false;
      runOnJS(onChangeVolume)(Math.pow(translateX.value / (sliderWidth - KNOB_WIDTH),2));
    },
  });

  const scrollTranslationStyle = useAnimatedStyle(() => {
    return {transform: [{translateX: translateX.value}]};
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value + KNOB_WIDTH,
    };
  });
  const controlTranslationStyle = useAnimatedStyle(() => {
    return {transform: [{translateX: translateX.value}]};
  });

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Animated.View style={[styles.progress, progressStyle]} />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={[styles.controlZone, controlTranslationStyle]}
          />
        </PanGestureHandler>
        <Animated.View style={[styles.knob, scrollTranslationStyle]} />
      </View>
    </View>
  );
};

export default VolumeBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    height: KNOB_WIDTH * 0.1,
    width: sliderWidth,
    borderRadius: KNOB_WIDTH / 2,
    backgroundColor: BG_COLOR_COMPONENTS,
    justifyContent: 'center',
  },
  progress: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLOR_MAIN,
    borderRadius: KNOB_WIDTH / 2,
  },
  knob: {
    height: KNOB_WIDTH,
    width: KNOB_WIDTH,
    borderRadius: KNOB_WIDTH / 2,
    backgroundColor: COLOR_MAIN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlZone: {
    width: 0.3 * windowWidth,
    height: 0.15 * windowWidth,
    left: -0.15 * windowWidth + KNOB_WIDTH / 2,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 100,
  },
});
