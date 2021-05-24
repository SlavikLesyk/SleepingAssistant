import React from 'react';
import GestureRecognizer from '../utility/swipe-gestures';
import AppBackground from '../components/AppBackground';
import HomeComponents from '../components/homeScreenComponents';

export default function AboutProgramScreen({ navigation }) {
  return (
    <GestureRecognizer
        onSwipeLeft={() => navigation.navigate('Alarm')}
        onSwipeRight={() => navigation.navigate('Start')}
        style={{ flex: 1 }}
      >
      <AppBackground>
        <HomeComponents navigation={navigation} />
      </AppBackground>
    </GestureRecognizer>
  );
};

