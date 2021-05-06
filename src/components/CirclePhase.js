import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { BG_COLOR_COMPONENTS, COLOR_MAIN, windowHeight } from '../Constants';
import CircleRotation from './CircleRotation';



const CirclePhase = (props) => {
  const [rotation, setRotation] = useState(0);
  const [hours, setHours] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());

  useEffect(() => {
    const timerID = setInterval( () => tick(), 500 );
    return function cleanup() {
        clearInterval(timerID);
      };
  });

  const tick = () => {
    setRotation((new Date().getHours() * 60 + new Date().getMinutes() + props.fallAsleepTime) / 2);
    setHours(new Date().getHours());
    setMinutes(new Date().getMinutes());  
  };

  return (
    <View style={[styles.circle, { transform: [{ rotate:  rotation + 'deg'}] }]}>
      <View style={[styles.circleInnerWrap, styles.circle1]}>
        <View style={[styles.innerCircle, styles.innerCircleSmall]}></View>
      </View>
      <View style={[styles.circleInnerWrap, styles.circle2]}>
        <View style={styles.innerCircle}></View>
      </View>
      <View style={[styles.circleInnerWrap, styles.circle3]}>
        <View style={styles.innerCircle}></View>
      </View>
      <View style={[styles.circleInnerWrap, styles.circle4]}>
        <View style={styles.innerCircle}></View>
      </View>
      <View style={[styles.circleInnerWrap, styles.circle5]}>
        <View style={styles.innerCircle}></View>
      </View>
      <View style={[styles.circleInnerWrap, styles.circle6]}>
        <View style={styles.innerCircle}></View>
      </View>
      <View style={[styles.circleInnerWrap, styles.circle7]}>
        <View style={styles.innerCircle}></View>
      </View>
      <View style={[styles.circleInnerWrap, styles.circle8]}>
        <View style={styles.innerCircle}></View>
      </View>      
       
        <CircleRotation hours={hours} minutes={minutes} rotation={rotation} />
    </View>
  )
}

const styles = StyleSheet.create({
  circle: {
    width: windowHeight * .4,
    height: windowHeight * .4,
    borderWidth: 2,
    borderColor: COLOR_MAIN,
    borderRadius: windowHeight * .2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato'
  },
  circleInnerWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  innerCircle: {
    width: windowHeight * .03,
    height: windowHeight * .03,
    borderColor: COLOR_MAIN,
    borderWidth: 2,
    borderRadius: windowHeight * .015,
    position: 'absolute',
    backgroundColor: BG_COLOR_COMPONENTS,
    left: windowHeight * .185 + 1,
    top: -windowHeight * .015
  },
  innerCircleSmall: {
    width: windowHeight * .02,
    height: windowHeight * .02,
    top: -windowHeight * .01,
    left: windowHeight * .19

  },
  circle1: {
    transform: [{ rotate: '0deg' }],
  },
  circle2: {
    transform: [{ rotate: '45deg' }]
  },
  circle3: {
    transform: [{ rotate: '90deg' }]
  },
  circle4: {
    transform: [{ rotate: '135deg' }]
  },
  circle5: {
    transform: [{ rotate: '180deg' }]
  },
  circle6: {
    transform: [{ rotate: '225deg' }]
  },
  circle7: {
    transform: [{ rotate: '270deg' }]
  },
  circle8: {
    transform: [{ rotate: '315deg' }]
  },

})

export default CirclePhase;