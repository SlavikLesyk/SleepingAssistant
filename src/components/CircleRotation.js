import React, { useState, useEffect } from 'react';
import AppText from './AppText';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { COLOR_MAIN, windowHeight } from '../Constants';

const radius = windowHeight * .2 - 20;

const mapStateToProps = ((state) => {
  return {deg: state.fallAsleepTime,}
})

function CircleRotation({ deg, hours, minutes, rotation }) {
  const fallTime = deg / 2;

  const renderClock = () =>{
    const hoursStr = hours < 10 ? `0${hours}` : hours;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

    return(
      <AppText style={{
        flex: 1,
        position: 'absolute',
        top: 30,
        transform: [{ rotate: - rotation + fallTime + 'deg' }],
      }}>
        {hoursStr}:{minutesStr}
      </AppText>
    );
  }

  return (
    <View
      style={[
        styles.circle,
        {
          transform: [{ rotate: `${-fallTime}deg` }],
          backgroundColor: 'lime'
        },
      ]}>
      <View style={styles.innerMarker} />
      <View style={styles.innerCircle}>
        {renderClock()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerMarker: {
    height: 15,
    width: 3,
    backgroundColor: COLOR_MAIN,
    position: 'absolute',
    top: 0,
  },
  circle: {
    borderRadius: radius,
    height: 2 * radius,
    width: 2 * radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: radius - 15,
    height: 2 * (radius - 15),
    width: 2 * (radius - 15),
  },
  text: {
    margin: 15,
  },
});

export default connect(mapStateToProps,{})(CircleRotation);