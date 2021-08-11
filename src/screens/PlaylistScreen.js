import React from 'react';
import GestureRecognizer from '../utility/swipe-gestures';
import AppBackground from '../components/AppBackground';
import PlaylistComponents from '../components/playlistScreenComponents';

export default function PlaylistScreen({navigation}) {
  return (
    <GestureRecognizer
      onSwipeLeft={() => navigation.navigate('DreamsList')}
      onSwipeRight={() => navigation.navigate('Alarm')}
      style={{flex: 1}}>
      <AppBackground>
        <PlaylistComponents />
      </AppBackground>
    </GestureRecognizer>
  );
}
