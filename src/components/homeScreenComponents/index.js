import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  cancelAnimation,
  interpolate,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BG_COLOR_COMPONENTS, COLOR_MAIN, windowHeight} from '../../Constants';
import AnimationControl from './AnimationControl';
import AnimatedSpinner from './AnimatedSpinner';
import AnimatedText from '../../utility/AnimatedText';
import Button from '../Button';
import CirclePhase from './CirclePhase';
import AppText from '../AppText';

const ONE_STEP_VALUE = 80;
const MINUTES = 60;
const HOURS = 24;

function HomeComponents({navigation}) {
  const [fallAsleepTime, setFallAsleepTime] = useState(null);
  const minutesAnimation = useSharedValue(0);
  const hoursAnimation = useSharedValue(-7 * ONE_STEP_VALUE);

  const getFallAsleepTime = async () => {
    try {
      const value = await AsyncStorage.getItem('fallAsleepTime');
      if (value !== null) {
        setFallAsleepTime(Number(value));
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(fallAsleepTime);
  useEffect(() => {
    getFallAsleepTime();
    console.log(fallAsleepTime);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFallAsleepTime();
      console.log('focused');
      console.log(fallAsleepTime);
    });

    return unsubscribe;
  }, [navigation]);

  const onChangeMinutes = value => {
    'worklet';
    minutesAnimation.value = value;
  };

  const onChangeHours = value => {
    'worklet';
    hoursAnimation.value = value;
  };

  const hoursText = useDerivedValue(() => {
    let lapM = Math.ceil(minutesAnimation.value / (ONE_STEP_VALUE * MINUTES));
    let lap = Math.ceil(
      (hoursAnimation.value + lapM * ONE_STEP_VALUE) / (ONE_STEP_VALUE * HOURS),
    );
    let step = Math.ceil(
      (hoursAnimation.value + lapM * ONE_STEP_VALUE) / ONE_STEP_VALUE,
    );

    step = Math.abs(step - lap * HOURS);
    return step < 10 ? `0${step}` : String(step);
  });

  const minutesText = useDerivedValue(() => {
    let lap = Math.ceil(minutesAnimation.value / (ONE_STEP_VALUE * MINUTES));
    let step = Math.ceil(minutesAnimation.value / ONE_STEP_VALUE);

    step = Math.abs(step - lap * MINUTES);

    return step < 10 ? `0${step}` : String(step);
  });

  const nextHoursText = useDerivedValue(() => {
    let lapM = Math.ceil(minutesAnimation.value / (ONE_STEP_VALUE * MINUTES));
    let step = Math.ceil(
      (hoursAnimation.value + lapM * ONE_STEP_VALUE + ONE_STEP_VALUE) /
        ONE_STEP_VALUE,
    );
    let lap = Math.ceil(
      (hoursAnimation.value + lapM * ONE_STEP_VALUE + ONE_STEP_VALUE) /
        (ONE_STEP_VALUE * HOURS),
    );

    step = Math.abs(step - lap * HOURS);

    return step < 10 ? `0${step}` : String(step);
  });

  const prevHoursText = useDerivedValue(() => {
    let lapM = Math.ceil(minutesAnimation.value / (ONE_STEP_VALUE * MINUTES));
    let step = Math.ceil(
      (hoursAnimation.value + lapM * ONE_STEP_VALUE - ONE_STEP_VALUE) /
        ONE_STEP_VALUE,
    );
    let lap = Math.ceil(
      (hoursAnimation.value + lapM * ONE_STEP_VALUE - ONE_STEP_VALUE) /
        (ONE_STEP_VALUE * HOURS),
    );

    step = Math.abs(step - lap * HOURS);

    return step < 10 ? `0${step}` : String(step);
  });

  const nextMinutesText = useDerivedValue(() => {
    let step = Math.ceil(
      (minutesAnimation.value + ONE_STEP_VALUE) / ONE_STEP_VALUE,
    );
    let lap = Math.ceil(
      (minutesAnimation.value + ONE_STEP_VALUE) / (ONE_STEP_VALUE * MINUTES),
    );

    step = Math.abs(step - lap * MINUTES);

    return step < 10 ? `0${step}` : String(step);
  });

  const prevMinutesText = useDerivedValue(() => {
    let step = Math.ceil(
      (minutesAnimation.value - ONE_STEP_VALUE) / ONE_STEP_VALUE,
    );
    let lap = Math.ceil(
      (minutesAnimation.value - ONE_STEP_VALUE) / (ONE_STEP_VALUE * MINUTES),
    );

    step = Math.abs(step - lap * MINUTES);

    return step < 10 ? `0${step}` : String(step);
  });

  const rotateValue = useDerivedValue(() => {
    let lapM = Math.ceil(minutesAnimation.value / (ONE_STEP_VALUE * MINUTES));
    let stepM = Math.ceil(minutesAnimation.value / ONE_STEP_VALUE);
    stepM = Math.abs(stepM - lapM * MINUTES);

    let lapH = Math.ceil(
      (hoursAnimation.value + lapM * ONE_STEP_VALUE) / (ONE_STEP_VALUE * HOURS),
    );
    let stepH = Math.ceil(
      (hoursAnimation.value + lapM * ONE_STEP_VALUE) / ONE_STEP_VALUE,
    );
    stepH = Math.abs(stepH - lapH * HOURS);

    return stepH * 60 + stepM;
  });

  const recommendText5Phase = useDerivedValue(() => {
    console.log(fallAsleepTime);
    let lapM = Math.ceil(
      (minutesAnimation.value + (fallAsleepTime + 30) * ONE_STEP_VALUE) /
        (ONE_STEP_VALUE * MINUTES),
    );
    let stepM = Math.ceil(
      (minutesAnimation.value + (fallAsleepTime + 30) * ONE_STEP_VALUE) /
        ONE_STEP_VALUE,
    );
    stepM = Math.abs(stepM - lapM * MINUTES);

    let lapH = Math.ceil(
      (hoursAnimation.value + (lapM + 7) * ONE_STEP_VALUE) /
        (ONE_STEP_VALUE * HOURS),
    );
    let stepH = Math.ceil(
      (hoursAnimation.value + (lapM + 7) * ONE_STEP_VALUE) / ONE_STEP_VALUE,
    );
    stepH = Math.abs(stepH - lapH * HOURS);

    return `${stepH < 10 ? `0${stepH}` : String(stepH)}:${
      stepM < 10 ? `0${stepM}` : String(stepM)
    }`;
  });

  const recommendText6Phase = useDerivedValue(() => {
    let lapM = Math.ceil(
      (minutesAnimation.value + fallAsleepTime * ONE_STEP_VALUE) /
        (ONE_STEP_VALUE * MINUTES),
    );
    let stepM = Math.ceil(
      (minutesAnimation.value + fallAsleepTime * ONE_STEP_VALUE) /
        ONE_STEP_VALUE,
    );
    stepM = Math.abs(stepM - lapM * MINUTES);

    let lapH = Math.ceil(
      (hoursAnimation.value + (lapM + 9) * ONE_STEP_VALUE) /
        (ONE_STEP_VALUE * HOURS),
    );
    let stepH = Math.ceil(
      (hoursAnimation.value + (lapM + 9) * ONE_STEP_VALUE) / ONE_STEP_VALUE,
    );
    stepH = Math.abs(stepH - lapH * HOURS);

    return `${stepH < 10 ? `0${stepH}` : String(stepH)}:${
      stepM < 10 ? `0${stepM}` : String(stepM)
    }`;
  });

  const recommendText4Phase = useDerivedValue(() => {
    let lapM = Math.ceil(
      (minutesAnimation.value + fallAsleepTime * ONE_STEP_VALUE) /
        (ONE_STEP_VALUE * MINUTES),
    );
    let stepM = Math.ceil(
      (minutesAnimation.value + fallAsleepTime * ONE_STEP_VALUE) /
        ONE_STEP_VALUE,
    );
    stepM = Math.abs(stepM - lapM * MINUTES);

    let lapH = Math.ceil(
      (hoursAnimation.value + (lapM + 6) * ONE_STEP_VALUE) /
        (ONE_STEP_VALUE * HOURS),
    );
    let stepH = Math.ceil(
      (hoursAnimation.value + (lapM + 6) * ONE_STEP_VALUE) / ONE_STEP_VALUE,
    );
    stepH = Math.abs(stepH - lapH * HOURS);

    return `${stepH < 10 ? `0${stepH}` : String(stepH)}:${
      stepM < 10 ? `0${stepM}` : String(stepM)
    }`;
  });

  const rotateMarker = useAnimatedStyle(() => {
    const rotate = interpolate(rotateValue.value, [0, 720], [0, 360]);
    return {
      transform: [
        {
          rotate: rotate + 'deg',
        },
      ],
    };
  });

  const onPressAddAlarm = async () => {
    try {
      const jsonList = await AsyncStorage.getItem('alarmList');
      const list = jsonList ? JSON.parse(jsonList) : [];
      const id = list[0] ? list[list.length - 1].id + 1 : 1;
      const newList = JSON.stringify([
        ...list,
        {
          id: id,
          time: `${hoursText.value}:${minutesText.value}`,
          isOn: true,
          name: 'name',
          repeat: false,
          recommend4Phase: recommendText4Phase.value,
          recommend5Phase: recommendText5Phase.value,
          recommend6Phase: recommendText6Phase.value,
        },
      ]);
      await AsyncStorage.setItem('alarmList', newList);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.spinnerSection}>
        <View style={styles.sectionLeft}>
          <View style={styles.controlArea}>
            <AnimationControl
              onChangeValue={onChangeHours}
              translateY={hoursAnimation}
            />
          </View>
          <AnimatedSpinner
            text={hoursText}
            prevText={prevHoursText}
            nextText={nextHoursText}
          />
        </View>
        <View style={styles.sectionRight}>
          <View style={styles.controlArea}>
            <AnimationControl
              onChangeValue={onChangeMinutes}
              translateY={minutesAnimation}
            />
          </View>
          <AnimatedSpinner
            text={minutesText}
            prevText={prevMinutesText}
            nextText={nextMinutesText}
          />
        </View>
      </View>
      <View style={styles.phaseSection}>
        <Animated.View style={[styles.outerCircle, rotateMarker]}>
          <View style={styles.marker} />
        </Animated.View>
        <CirclePhase fallAsleepTime={fallAsleepTime} />
      </View>
      <View style={styles.recommendSection}>
        <AppText>going bad time</AppText>
        <View style={styles.recommendTime}>
          <AnimatedText text={recommendText4Phase} />
          <AnimatedText text={recommendText5Phase} />
          <AnimatedText text={recommendText6Phase} />
        </View>
      </View>
      <View style={styles.buttonSection}>
        <Button
          onPress={async () => {
            cancelAnimation(hoursAnimation);
            cancelAnimation(minutesAnimation);
            await onPressAddAlarm();
            navigation.navigate('Alarm');
          }}>
          add alarm
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonSection: {
    flex: 1,
  },
  spinnerSection: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BG_COLOR_COMPONENTS,
  },
  sectionLeft: {
    flex: 1,
  },
  sectionRight: {
    flex: 1,
  },
  controlArea: {
    position: 'absolute',
    opacity: 0.3,
    right: 0,
    left: 0,
    top: -windowHeight * 0.15,
    bottom: 0,
    height: windowHeight * 0.45,
    zIndex: 10,
  },
  phaseSection: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    position: 'absolute',
    width: windowHeight * 0.5,
    height: windowHeight * 0.5,
    borderRadius: windowHeight * 0.25,
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
  recommendSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
    backgroundColor: BG_COLOR_COMPONENTS,
  },
  recommendTime: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
});

export default HomeComponents;
