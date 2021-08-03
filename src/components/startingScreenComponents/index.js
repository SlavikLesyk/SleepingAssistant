import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSharedValue, useDerivedValue} from 'react-native-reanimated';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import AppText from '../../components/AppText';
import SleepingCircle from './SleepingCircle';
import AnimationControl from './AnimationControl';
import {windowHeight} from '../../Constants';
import AnimatedText from '../../utility/AnimatedText';

function StartingComponents({navigation}) {
  const {getItem, setItem} = useAsyncStorage('fallAsleepTime');
  const fallingAsleepAnimation = useSharedValue(-62);

  const onChangeTime = value => {
    'worklet';
    fallingAsleepAnimation.value = value;
  };

  const readItemFromStorage = async () => {
    const item = await getItem();
    if (item !== null) {
      onChangeTime(item * 5 - 162);
    }
  };

  const writeItemToStorage = async newValue => {
    await setItem(newValue);
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

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
            writeItemToStorage(minutesText.value);
            navigation.navigate('Home');
          }}
          style={styles.button}>
          confirm
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: windowHeight * 0.2,
    alignItems: 'center',
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
    top: windowHeight * -0.04,
  },
  heading: {
    fontSize: 22.2,
  },
});

export default StartingComponents;
