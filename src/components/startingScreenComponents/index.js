import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  useSharedValue,
  useDerivedValue,
} from 'react-native-reanimated';
import Button from '../../components/Button';
import AppText from '../../components/AppText';
import SleepingCircle from './SleepingCircle';
import AnimationControl from './AnimationControl';
import { changeFallAsleepTime } from '../../store/actions';
import { windowHeight } from '../../Constants';
import AnimatedText from '../../utility/AnimatedText';

function StartingComponents({ changeFallAsleepTime, fallAsleepTime, navigation }) {
  const fallingAsleepAnimation = useSharedValue(fallAsleepTime * 5 - 162);

  const onChangeTime = (value) => {
    'worklet';
    fallingAsleepAnimation.value = value;
  };

  const minutesText = useDerivedValue(() => {
    return String(Math.ceil((fallingAsleepAnimation.value + 137) / 5 + 5));
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.heading}>How long do you</AppText>
        <AppText style={styles.heading}>fall asleep?</AppText>
      </View>
      <View style={styles.timer}>
        <AnimatedText text={minutesText} />
        <AppText>min</AppText>
      </View>
      <View style={styles.circle}>
        <SleepingCircle rotateAnimation={fallingAsleepAnimation} />
        <View style={styles.control}>
          <AnimationControl
            onChangeValue={onChangeTime}
            translateX={fallingAsleepAnimation}
          />
        </View>
      </View>
      <View style={styles.buttonSection}>
        <Button
          onPress={() => {
            navigation.navigate('Home');
            changeFallAsleepTime(Number(minutesText.value))
          }
          }
          style={styles.button}
        >
          confirm
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: windowHeight * .2,
    alignItems: 'center'
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  timer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSection: {
    flex: 1,
  },
  button: {
    fontSize: 20,
  },
  circle: {
    flex: 3,
  },
  control: {
    top: windowHeight * -.04,
  },
  heading: {
    fontSize: 22.2
  }
});

const mapStateToProps = (state) => {
  return { fallAsleepTime: state.alarms.fallAsleepTime };
}

export default connect(mapStateToProps, { changeFallAsleepTime })(StartingComponents)