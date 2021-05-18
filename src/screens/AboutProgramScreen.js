import React from 'react';
import { View, StyleSheet } from 'react-native';
import GestureRecognizer from '../utility/swipe-gestures';
import AppBackground from '../components/AppBackground';
import Button from '../components/Button';
import { windowHeight } from '../Constants';
import AnimationMainNode from '../components/mainScreenComponents/AnimationMainNode';

export default function AboutProgramScreen(props) {
  const { navigation } = props

  return (
    <GestureRecognizer onSwipeRight={() => navigation.navigate('DreamsList')} style={{ flex: 1 }}>
      <AppBackground>
        <AnimationMainNode navigation={navigation} />
      </AppBackground>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  btn: {
  },

  control: {
    flex: 10,
    backgroundColor: 'blue'
  }
});
