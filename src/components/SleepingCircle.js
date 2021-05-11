import React from "react";
import { Animated, View, StyleSheet, PanResponder, ImageBackground } from "react-native";
import { connect } from 'react-redux';
import { changeFallAsleepTime } from '../actions';
import { windowHeight } from "../Constants";
import ValueSlider from './ValueSlider';


function SleepingCircle() {
  return (
    <View style={styles.container}>
      <View style={styles.megaCircle}>
          <View style={styles.dote} />
          <View style={styles.innerCircle}>
            <View style={styles.marker} /> 
          </View>

        </View>
      <View style={styles.start} />
    </View >
  );

}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'gold',
    paddingTop: '20%'
  },
  megaCircle: {
    width: 1500,
    height: 1500,
    borderRadius: 750,
    borderWidth: 2,
    borderColor: 'aqua',
    alignItems: 'center',
  },
  innerCircle: {
    width: 1500,
    height: 1500,
    borderRadius: 750,
    backgroundColor: 'transparent',
    alignItems: 'center',
    top: 15,
    transform: [{
      rotate: '-12deg'
    }]
  },
  dote: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'aqua',
    position: 'absolute',
    backgroundColor: 'tomato',
    top: -12,
  },
  marker: {
    width: 4,
    height: 25,
    borderColor: 'aqua',
    backgroundColor: 'tomato',
    top: 0,
  }
});

export default connect(null, { changeFallAsleepTime })(SleepingCircle);