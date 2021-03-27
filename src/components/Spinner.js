import React, {useState} from 'react';
import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withDecay,
  cancelAnimation,
  useDerivedValue
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import AnimatedText from './AnimatedText';
import { windowHeight } from '../Constants'; 

export default function({ numbers = 24, alignItems = 'center'}) {  
  
  const translateY = useSharedValue(0);
  const isSpinning = false;
  const oneStepValue = 80;

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_,ctx) => {
      cancelAnimation(translateY);
      ctx.offsetY = translateY.value;
    },
    onActive: (event,ctx) => {
      translateY.value = event.translationY + ctx.offsetY;
    },
    onEnd: (event, ctx) => {
      translateY.value = withDecay({
        velocity: event.velocityY
      });
    }
  });
  
  const currentText = useDerivedValue(() => {
    let lap = Math.ceil(translateY.value / (oneStepValue * numbers));
    let step = Math.ceil(translateY.value / oneStepValue);

    step = Math.abs(step - lap * numbers);

     return step < 10 ? `0${step}` : String(step);
  });

  const nextText = useDerivedValue(() => {
    let step = Math.ceil((translateY.value + oneStepValue) / oneStepValue);
    let lap = Math.ceil((translateY.value + oneStepValue) / (oneStepValue * numbers));

    console.log(lap)
    step = Math.abs(step - lap * numbers);

     return step < 10 ? `0${step}` : String(step)
  })

  const prevText = useDerivedValue(() => {
    let step = Math.ceil((translateY.value - oneStepValue) / oneStepValue);
    let lap = Math.ceil((translateY.value - oneStepValue) / (oneStepValue * numbers));

    console.log(lap)
    step = Math.abs(step - lap * numbers);

     return step < 10 ? `0${step}` : String(step)
  })

  return (
    <View style={[styles.spinner, { alignItems: alignItems}]}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={styles.controlArea} /> 
      </PanGestureHandler>
      <View style={styles.wheal}>
        <AnimatedText text={nextText} style={[styles.textSecondary, styles.textTop]}/>
        <AnimatedText text={currentText} style={styles.textMain}/>
        <AnimatedText text={prevText} style={[styles.textSecondary, styles.textBottom]}/>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  controlArea:{
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 100
  },
  wheal:{
    justifyContent: 'center',
    alignItems : 'center'
  },
  textMain: {
    fontSize: windowHeight * .1,
  },
  textSecondary: {
    fontSize: windowHeight * .04,
    position: 'absolute'
  },
  textTop: {
    top: - windowHeight * .04
  },
  textBottom: {
    bottom: - windowHeight * .04
  }
});

