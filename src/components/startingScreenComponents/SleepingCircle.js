import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { BG_COLOR_COMPONENTS, COLOR_MAIN } from '../../Constants';

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
    width: 3,
    height: 25,
    backgroundColor: COLOR_MAIN,
    position: "absolute",
    top: 15,
  }
});
