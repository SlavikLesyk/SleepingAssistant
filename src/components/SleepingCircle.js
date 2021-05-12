import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import { changeFallAsleepTime } from '../actions';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { BG_COLOR_COMPONENTS, COLOR_MAIN } from "../Constants";

function SleepingCircle({ changeFallAsleepTime }) {
  const translateX = useSharedValue(-37);

  const clamp = (value, lowerBound, upperBound) => {
    'worklet';
    return Math.min(Math.max(lowerBound, value), upperBound);
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = clamp(event.translationX + ctx.offsetX, -137, 137);
    },
    onEnd: () => {
    }
  });

  const rotateStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-137, 137], 
      [2, 24],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ rotate: `${rotate}deg` }],
    }
  });

  const stepText = (value) => {
    const step = Math.ceil( (value + 137) / 5 + 5);    
    changeFallAsleepTime(step)
  };

  useDerivedValue(() => {
    runOnJS(stepText)(translateX.value);
  });  

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={styles.control} />
      </PanGestureHandler>
      <View style={styles.outerCircle}>
        <Animated.View style={[styles.megaCircle, rotateStyle]}>
          <View style={styles.dote} />
        </Animated.View>
        <View style={styles.marker} />
      </View>
    </View >
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '20%'
  },
  control: {
    opacity: .2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100
  },
  megaCircle: {
    width: 1500,
    height: 1500,
    borderRadius: 750,
    borderWidth: 2,
    borderColor: COLOR_MAIN,
    alignItems: 'center',
    zIndex: -1
  },
  outerCircle: {
    width: 1500,
    height: 1500,
    borderRadius: 750,
    alignItems: 'center',
    top: 15,
    transform: [{
      rotate: '-12deg'
    }]
  },
  dote: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLOR_MAIN,
    backgroundColor: BG_COLOR_COMPONENTS,
    position: 'absolute',
    top: -12,
  },
  marker: {
    width: 4,
    height: 25,
    backgroundColor: COLOR_MAIN,
    position: "absolute",
    top: 15,
  }
});

export default connect(null, { changeFallAsleepTime })(SleepingCircle);