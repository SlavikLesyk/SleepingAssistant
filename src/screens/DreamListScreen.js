import React from 'react';
import GestureRecognizer from '../utility/swipe-gestures';
import AppBackground from '../components/AppBackground';
import DreamListScreenComponents from '../components/dreamListScreenComponents';

export default function DreamListScreen({ navigation }) {

  return (
    <GestureRecognizer
      onSwipeLeft={() => navigation.navigate('About')}
      onSwipeRight={() => navigation.navigate('Playlist')}
      style={{ flex: 1 }}
    >
      <AppBackground>
        <DreamListScreenComponents navigation={navigation}/>
      </AppBackground>
    </GestureRecognizer>
  );
}
