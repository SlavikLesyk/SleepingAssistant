import React from 'react';
import AppBackground from '../components/AppBackground';
import GestureRecognizer from '../utility/swipe-gestures';
import StartingComponets from '../components/startingScreenComponents';


export default function StartingScreen({ navigation }) {
  return (
    <GestureRecognizer
      onSwipeLeft={() => navigation.navigate('Home')}
      // onSwipeRight={() => navigation.navigate('Start')}
      style={{ flex: 1 }}
    >
      <AppBackground>
        <StartingComponets navigation={navigation} />
      </AppBackground>
    </GestureRecognizer>
  );
}
