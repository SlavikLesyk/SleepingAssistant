import  React  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppBackground from '../components/AppBackground';
import GestureRecognizer from '../utility/swipe-gestures';
import Button from '../components/Button';

const DreamListScreen = ({ navigation }) => {
  return (
    <GestureRecognizer 
      onSwipeRight={() => navigation.navigate('Playlists')}
      onSwipeLeft={() => navigation.navigate('About')}
      style={{flex: 1}}>
      <AppBackground>
        <Button onPress={() => navigation.navigate('DreamNote')}>add ream note</Button>
      </AppBackground>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({});

export default DreamListScreen;