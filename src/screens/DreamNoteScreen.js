import React from 'react';
import AppBackground from '../components/AppBackground';
import DreamNotesScreenComponents from '../components/dreamNotesScreenComponents';

export default function DreamNoteScreen({navigation, route}) {
  return (
    <AppBackground>
      <DreamNotesScreenComponents navigation={navigation} route={route}/>
    </AppBackground>
  );
}
