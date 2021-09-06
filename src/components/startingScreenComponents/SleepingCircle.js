import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { BG_COLOR_CIRCLES, COLOR_MAIN, windowHeight } from '../../Constants';

export default function SleepingCircle({ rotateAnimation }) {
  const rotateStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      rotateAnimation.value,
      [-137, 137],
      [2, 24],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ rotate: `${rotate}deg` }],
    }
  });

  return (
    <View style={styles.container}>
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
  megaCircle: {
    width: 1500,
    height: 1500,
    borderRadius: 750,
    borderWidth: 1,
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
    width: windowHeight * .02,
    height: windowHeight * .02,
    borderRadius: 800,
    borderWidth: 1,
    borderColor: COLOR_MAIN,
    backgroundColor: BG_COLOR_CIRCLES,
    position: 'absolute',
    top: -9,
  },
  marker: {
    width: 2,
    height: 25,
    backgroundColor: COLOR_MAIN,
    position: "absolute",
    top: 30,
  }
});
