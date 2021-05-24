import React from 'react';
import GestureRecognizer from '../utility/swipe-gestures';
import AppBackground from '../components/AppBackground';
import Button from '../components/Button';

export default function AboutProgramScreen(props) {
  const { navigation } = props

  return (
    <GestureRecognizer
        onSwipeLeft={() => navigation.navigate('Start')}
        onSwipeRight={() => navigation.navigate('DreamsList')}
        style={{ flex: 1 }}
      >
      <AppBackground>
        <Button onPress={() => navigation.navigate('AboutUs')}>
          naivebeam
        </Button>
      </AppBackground>
    </GestureRecognizer>
  );
};

