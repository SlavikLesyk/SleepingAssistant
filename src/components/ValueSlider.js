import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions
} from 'react-native';
import Animated, { 
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue, 
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const sliderWidth = windowWidth * .7;sliderWidth;
const knobWidth = sliderWidth * .08;

function ValueSlider() {
  const translateX = useSharedValue(0);
  const isSliding = useSharedValue(false);

  const clamp = (value, lowerBound, upperBound) => {
    'worklet';
    return Math.min(Math.max(lowerBound,value),upperBound);
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_,ctx) => {
      ctx.offsetX = translateX.value;
    },
    onActive: (event,ctx) => {
      isSliding.value = true;
      translateX.value = clamp(event.translationX + ctx.offsetX, -sliderWidth * .8 , 0);
    },
    onEnd: () => {
      isSliding.value = false;
      console.log(1 + translateX.value / (sliderWidth *.8))
    }
  });

  const scrollTranlationStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] };
  });

  const progressBackgroundStyle = useAnimatedStyle(() => {
    return { width: -translateX.value };
  });

  const progressStyle = useAnimatedStyle(() => {
    return { width: translateX.value + sliderWidth * 0.8 };
  });

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Animated.View style={[styles.progress, progressStyle]}/>
        <Animated.View style={[styles.progressBackground, progressBackgroundStyle]}/>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.knob, scrollTranlationStyle]} />
        </PanGestureHandler>
      </View>  
      <Text>
        {1 + translateX.value / (sliderWidth *.8)}  
      </Text>  
    </View> 
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  knob:{
    width: knobWidth,
    height: knobWidth,
    borderRadius: knobWidth * .5,
    backgroundColor: 'grey',
    opacity: .8,
    position: 'absolute',
    right: sliderWidth * .1 - knobWidth * .5,
  },
  slider:{
    backgroundColor: 'darkblue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: sliderWidth,
    height: sliderWidth * .16,
  },
  progress:{
    height: 3,
    backgroundColor: 'lime',
  },
  progressBackground:{
    height: 3,
    backgroundColor: 'tomato' ,
  }
});

export default ValueSlider;