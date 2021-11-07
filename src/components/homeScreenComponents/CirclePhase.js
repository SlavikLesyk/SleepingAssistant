import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {BG_COLOR_CIRCLES, COLOR_MAIN, windowHeight} from '../../Constants';
import AppText from '../../components/AppText';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import {connect} from 'react-redux';

const RADIUS = windowHeight * 0.4;

const CirclePhase = ({fallAsleepTime}) => {
  const timeAnimation = useSharedValue(
    new Date().getHours() * 60 + new Date().getMinutes(),
  );
  const [hours, setHours] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());

  useEffect(() => {
    const timerID = setInterval(() => {
      timeAnimation.value =
        new Date().getHours() * 60 + new Date().getMinutes();
      setHours(new Date().getHours());
      setMinutes(new Date().getMinutes());
    }, 200);
    return () => clearInterval(timerID);
  }, []);

  const renderClock = () => {
    const hoursStr = hours < 10 ? `0${hours}` : hours;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

    return (
      <Animated.View style={[styles.text, rotateText]}>
        <AppText style={styles.text}>
          {hoursStr}:{minutesStr}
        </AppText>
      </Animated.View>
    );
  };

  const rotateCircle = useAnimatedStyle(() => {
    const rotate = interpolate(
      timeAnimation.value + fallAsleepTime,
      [0, 720],
      [0, 360],
    );
    return {
      transform: [
        {
          rotate: rotate + 'deg',
        },
      ],
    };
  });

  const rotateMarker = useAnimatedStyle(() => {
    const rotate = interpolate(-fallAsleepTime, [0, 720], [0, 360]);
    return {
      transform: [
        {
          rotate: rotate + 'deg',
        },
      ],
    };
  });

  const rotateText = useAnimatedStyle(() => {
    const rotate = interpolate(timeAnimation.value, [0, 720], [0, 360]);
    return {
      transform: [
        {
          rotate: -rotate + 'deg',
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, rotateCircle]}>
        <View style={[styles.circleInnerWrap, styles.circle1]}>
          <View style={[styles.innerCircle, styles.innerCircleSmall]}></View>
        </View>
        <View style={[styles.circleInnerWrap, styles.circle2]}>
          <View style={[styles.innerCircle, styles.firstPhase]}></View>
        </View>
        <View style={[styles.circleInnerWrap, styles.circle3]}>
          <View style={[styles.innerCircle, styles.secondPhase]}></View>
        </View>
        <View style={[styles.circleInnerWrap, styles.circle4]}>
          <View style={[styles.innerCircle, styles.thirdPhase]}></View>
        </View>
        <View style={[styles.circleInnerWrap, styles.circle5]}>
          <View style={[styles.innerCircle, styles.fourthPhase]}></View>
        </View>
        <View style={[styles.circleInnerWrap, styles.circle6]}>
          <View style={styles.innerCircle}></View>
        </View>
        <View style={[styles.circleInnerWrap, styles.circle7]}>
          <View style={[styles.innerCircle, styles.sixthPhase]}></View>
        </View>
        {/* <View style={[styles.circleInnerWrap, styles.circle8]}>
          <View style={[styles.innerCircle, styles.seventhPhase]}></View>
        </View> */}

        <Animated.View style={[styles.clockCircle, rotateMarker]}>
          <View style={styles.clockMarker} />
          <View style={styles.clockInner}>{renderClock()}</View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    height: 15,
    width: 2,
    backgroundColor: COLOR_MAIN,
    position: 'absolute',
    top: 0,
  },
  circle: {
    // opacity: 0.8,
    width: RADIUS,
    height: RADIUS,
    borderWidth: 0.5,
    borderColor: COLOR_MAIN,
    borderRadius: windowHeight * 0.2,
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
    width: windowHeight * 0.02,
    height: windowHeight * 0.02,
    borderColor: COLOR_MAIN,
    borderWidth: 0.5,
    borderRadius: windowHeight * 0.01,
    position: 'absolute',
    backgroundColor: BG_COLOR_CIRCLES,
    left: windowHeight * 0.19,
    top: -windowHeight * 0.01,
  },
  innerCircleSmall: {
    width: windowHeight * 0.01,
    height: windowHeight * 0.01,
    top: -windowHeight * 0.005,
    left: windowHeight * 0.195,
  },
  firstPhase: {
    width: windowHeight * 0.012,
    height: windowHeight * 0.012,
    top: -windowHeight * 0.006,
    left: windowHeight * 0.194,
  },
  secondPhase: {
    width: windowHeight * 0.014,
    height: windowHeight * 0.014,
    top: -windowHeight * 0.007,
    left: windowHeight * 0.193,
  },
  thirdPhase: {
    width: windowHeight * 0.016,
    height: windowHeight * 0.016,
    top: -windowHeight * 0.008,
    left: windowHeight * 0.192,
  },
  fourthPhase: {
    width: windowHeight * 0.018,
    height: windowHeight * 0.018,
    top: -windowHeight * 0.009,
    left: windowHeight * 0.191,
  },
  sixthPhase: {
    width: windowHeight * 0.016,
    height: windowHeight * 0.016,
    top: -windowHeight * 0.008,
    left: windowHeight * 0.191,
  },
  seventhPhase: {
    width: windowHeight * 0.014,
    height: windowHeight * 0.014,
    top: -windowHeight * 0.007,
    left: windowHeight * 0.191,
  },
  circle1: {
    transform: [{rotate: '0deg'}],
  },
  circle2: {
    transform: [{rotate: '45deg'}],
  },
  circle3: {
    transform: [{rotate: '90deg'}],
  },
  circle4: {
    transform: [{rotate: '135deg'}],
  },
  circle5: {
    transform: [{rotate: '180deg'}],
  },
  circle6: {
    transform: [{rotate: '225deg'}],
  },
  circle7: {
    transform: [{rotate: '270deg'}],
  },
  circle8: {
    transform: [{rotate: '315deg'}],
  },

  clockMarker: {
    height: 15,
    width: 2,
    backgroundColor: COLOR_MAIN,
    position: 'absolute',
    top: 0,
  },
  clockCircle: {
    borderRadius: (RADIUS * 0.85) / 2,
    height: RADIUS * 0.85,
    width: RADIUS * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockInner: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: (RADIUS * 0.75) / 2,
    height: RADIUS * 0.75,
    width: RADIUS * 0.75,
  },
  text: {
    margin: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    fallAsleepTime: state.alarms.fallAsleepTime,
  };
}

export default connect(mapStateToProps, {})(CirclePhase);
