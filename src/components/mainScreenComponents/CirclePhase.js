import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BG_COLOR_COMPONENTS, COLOR_MAIN, windowHeight, windowWidth } from '../../Constants';
import AppText from '../../components/AppText';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate
} from 'react-native-reanimated';
import { connect } from 'react-redux';
import AnimatedText from './AnimatedText';

const RADIUS = windowHeight * .4;

const CirclePhase = ({ time }) => {
  const timeAnimation = useSharedValue(new Date().getHours() * 60 + new Date().getMinutes());
  const [hours, setHours] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const fallingSleepDeg = time;

  useEffect(() => {
    const timerID = setInterval(() => {
      timeAnimation.value =( new Date().getHours() * 60 + new Date().getMinutes());
      setHours(new Date().getHours());
      setMinutes(new Date().getMinutes());
    }
    ,200);
    return () => clearInterval(timerID);
  },[]);  
  

  const renderClock = () => {
    
    const hoursStr = hours < 10 ? `0${hours}` : hours;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    const time = { value: `${hoursStr}:${minutesStr}`}
    return (
      <Animated.View style={[styles.text, rotateText]}>
          <AppText style={{
          margin: 15
        }}>
          {hoursStr}:{minutesStr}
        </AppText>
      </Animated.View>
    );
  };

  const rotateCircle = useAnimatedStyle(() => {
    const rotate = interpolate(
      timeAnimation.value + fallingSleepDeg,
      [0, 720],
      [0, 360]
    )
    return {
      transform: [{
        rotate: rotate + 'deg'
      }]
    }
  });

  const rotateMarker = useAnimatedStyle(() => {
    const rotate = interpolate(
      - fallingSleepDeg,
      [0, 720],
      [0, 360]
    )
    return {
      transform: [{
        rotate: rotate + 'deg'
      }]
    }
  });

  const rotateText = useAnimatedStyle(() => {
    console.log(timeAnimation.value)
    const rotate = interpolate(
      timeAnimation.value,
      [0, 720],
      [0, 360]
    )
    return {
      transform: [{
        rotate: - rotate + 'deg'
      }]
    }
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, rotateCircle]}>
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

        <Animated.View style={[styles.clockCircle, rotateMarker]}>
          <View style={styles.clockMarker} />
          <View style={styles.clockInner}>
            {renderClock()}
          </View>
        </Animated.View>
      </Animated.View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  marker: {
    height: 15,
    width: 3,
    backgroundColor: COLOR_MAIN,
    position: 'absolute',
    top: 0,
  },
  circle: {
    width: RADIUS,
    height: RADIUS,
    borderWidth: 2,
    borderColor: COLOR_MAIN,
    borderRadius: windowHeight * .2,
    justifyContent: 'center',
    alignItems: 'center',
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

  clockMarker: {
    height: 15,
    width: 3,
    backgroundColor: COLOR_MAIN,
    position: 'absolute',
    top: 0,
  },
  clockCircle: {
    borderRadius: (RADIUS * .85) / 2,
    height: RADIUS * .85,
    width: RADIUS * .85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockInner: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: (RADIUS * .75 / 2),
    height: RADIUS * .75,
    width: RADIUS * .75,

  },
  text: {
    margin: 15,
  },
});


const mapStateToProps = (state) => {
  return {
    time: state.fallAsleepTime,
  };
}

export default connect(mapStateToProps, {})(CirclePhase);