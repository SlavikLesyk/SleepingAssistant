import React from 'react';
import GestureRecognizer from '../utility/swipe-gestures';
import AppBackground from '../components/AppBackground';
import AlarmListScreenComponents from '../components/alarmListScreenComponents';

export default function AlarmListScreen({navigation}) {
  return (
    <GestureRecognizer
      onSwipeLeft={() => navigation.navigate('Playlist')}
      onSwipeRight={() => navigation.navigate('Home')}
      style={{flex: 1}}>
      <AppBackground>
        <AlarmListScreenComponents navigation={navigation} />
      </AppBackground>
    </GestureRecognizer>
  );
}
