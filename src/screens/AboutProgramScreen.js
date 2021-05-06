import React from 'react';
import { View, StyleSheet } from 'react-native';
import GestureRecognizer from '../utility/swipe-gestures';
import AppBackground from '../components/AppBackground';
import Button from '../components/Button';
import { windowHeight } from '../Constants';

export default function AboutProgramScreen( props ) {
  const { navigation } = props

  return (
    <GestureRecognizer onSwipeRight={() => navigation.navigate('DreamsList')} style={{ flex: 1 }}>
      <AppBackground>
        <Button 
          onPress={() => {
            navigation.navigate('AboutUs')
          }}
          style={styles.btn}
        >
          naivebeam
        </Button>
      </AppBackground>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  btn:{
    marginTop: windowHeight * .4 
  }
});
