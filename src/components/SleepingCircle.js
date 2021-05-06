import React from "react";
import { Animated, View, StyleSheet, PanResponder, ImageBackground } from "react-native";
import { connect } from 'react-redux';
import { changeFallAsleepTime } from '../actions';

class SleepingCircle extends React.Component {  
  startingPosition = 0;
  
  pan = new Animated.ValueXY();

  setTime = (value) => {
    value = value < -200 ? -200 :  value  
    this.props.changeFallAsleepTime(((value + 200) / 8 ).toFixed(0));
  }

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      let startingVelueOffset = this.pan.x._value;

      if(startingVelueOffset < - 200){
        startingVelueOffset = -200
      }

      if(startingVelueOffset > 200){
        startingVelueOffset = 200
      }

      this.pan.setOffset({
        x: startingVelueOffset,
        y: this.pan.y._value
      });
      console.log(this.pan.x._value)
    },
    onPanResponderMove: (e, gestureState) => {
      this.setTime(this.startingPosition + gestureState.dx);
      console.log(gestureState);
      Animated.event([ 
        null, 
        { dx: this.pan.x, dy: this.pan.y }
      ], 
        {useNativeDriver: false}
      )(e, gestureState);
    },
    onPanResponderRelease: (e, gestureState) => {
      this.startingPosition = this.startingPosition + gestureState.dx;
      this.startingPosition = (this.startingPosition < -200) ? -200 : this.startingPosition
      console.log(this.pan.x._value)
      this.pan.flattenOffset();  
    } 
  }); 


  circleRotation = () => {
    const rotate = this.pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-9deg', '0deg', '10deg'],
      extrapolate: 'clamp',      
    });

    return { transform: [{ rotate }],
      height: 1500,
      weight: 1502,

    };
  }

  render() {
    {this.props}
    return (
      <View style={styles.container}>
        <View style={styles.control} {...this.panResponder.panHandlers}>
          <Animated.View 
            style={ this.circleRotation() }  >
            <ImageBackground source= {require('../../assets/img/SleepingCircle.png')}  style={styles.circle} />
          </Animated.View>        
        </View>
        <View style={styles.start} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }, 
  control: {
    flex: 1,
    paddingVertical: 70,
    top: -30,
  },
  circle: {
    width: 1500, 
    height: 1502 , 
  },
  start:{
    width: 5,
    height: 40,
    backgroundColor: '#7ab7e8',
    left: 620,
    top: -100,
    transform: [{rotate: '-10deg'}]
    
  }
});

export default connect(null, { changeFallAsleepTime })(SleepingCircle);