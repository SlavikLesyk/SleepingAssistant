import React from 'react';
import GestureRecognizer from '../utility/swipe-gestures';
import AppBackground from '../components/AppBackground';
import DreamNotesScreenComponents from '../components/dreamNotesScreenComponents';

export default function DreamListScreen({ navigation }) {

  return (
    <GestureRecognizer
      onSwipeLeft={() => navigation.navigate('About')}
      onSwipeRight={() => navigation.navigate('Playlist')}
      style={{ flex: 1 }}
    >
      <AppBackground>
        <DreamNotesScreenComponents navigation={navigation}/>
      </AppBackground>
    </GestureRecognizer>
  );
}
