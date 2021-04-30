import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLOR_MAIN } from '../Constants';

const CIRCLE_RADIUS = 32;
const LINE_WIDTH = 2;
const PLUS_SIZE = CIRCLE_RADIUS - CIRCLE_RADIUS / 3;

const ButtonAddNew = ({ style, onPress }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.circle}>
          <View style={styles.horizontal} />
          <View style={styles.vertical} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: CIRCLE_RADIUS,
    width: CIRCLE_RADIUS,
    borderRadius: CIRCLE_RADIUS / 2,
    borderWidth: LINE_WIDTH,
    borderColor: COLOR_MAIN,
  },
  horizontal: {
    height: PLUS_SIZE,
    width: LINE_WIDTH,
    backgroundColor: COLOR_MAIN
  },
  vertical: {
    height: LINE_WIDTH,
    width: PLUS_SIZE,
    backgroundColor: COLOR_MAIN,
    transform: [{ translateY: -(PLUS_SIZE + LINE_WIDTH / 2) / 2 }]
  }
});

export default ButtonAddNew;