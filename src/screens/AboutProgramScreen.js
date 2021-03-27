import  React  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GestureRecognizer from '../utility/swipe-gestures';
import AppBackground from '../components/AppBackground';
import Button from '../components/Button';

const AboutProgramScreen = ({navigation}) => {
  return (
    <GestureRecognizer onSwipeRight={() => navigation.navigate('DreamsList')} style={{flex: 1}}>
      <AppBackground>
        <Button onPress={() => navigation.navigate('AboutUs')}>naivebeam</Button>
      </AppBackground>
    </GestureRecognizer>

    
  );
};

const styles = StyleSheet.create({});

export default AboutProgramScreen;