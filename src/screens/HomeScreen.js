import React from 'react';
import { View, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import GestureRecognizer from '../utility/swipe-gestures';
import { connect } from 'react-redux';
import ButtonAddNew from '../components/ButtonAddNew';
import Button from '../components/Button';
import CirclePhase from '../components/CirclePhase';
import AppBackground from '../components/AppBackground';
import { addAlarm } from '../actions';
import { windowHeight } from '../Constants';
import ClockSpinner from '../components/ClockSpinner';

function HomeScreen(props) {
 const { 
  fallAsleepTime,
  navigation,
  alarmTime,
  addAlarm,
  } = props;
  const onPressAddAlarm = () => {
    addAlarm(`${alarmTime.hours}:${alarmTime.minutes}`)
  };
    return (
      <GestureRecognizer
        onSwipeLeft={() => navigation.navigate('Alarm')}
        onSwipeRight={() => navigation.navigate('Start')}
        style={{ flex: 1 }}
      >
        <AppBackground>
          <View style={styles.container}>
            <View style={styles.clockWrapper}>
              <ButtonAddNew
                style={{ flex: 1 }}
                onPress={() => {
                  navigation.navigate('Alarm');
                  onPressAddAlarm();
                }}
              />
              <ClockSpinner style={{ flex: 2 }} />
            </View>
            <View style={styles.circle}>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
                enabled={Platform.OS === "ios" ? true : false}
              >
                <CirclePhase fallAsleepTime={fallAsleepTime} />
              </KeyboardAvoidingView>
              <View style={styles.help}>
                <Button style={{ fontSize: 24, paddingHorizontal: 10 }}>?</Button>
              </View>
            </View>
            <View style={styles.calcTime}></View>
            <View />
          </View>
        </AppBackground>
      </GestureRecognizer>
    );
  
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight
  },
  clockWrapper: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    marginTop: 50,
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  help: {
    position: 'absolute',
    bottom: -15,
    right: 0,
    overflow: 'visible'
  },
  calcTime: {
    flex: 4
  },
  footer: {
    flex: 1
  }
});

const mapStateToProps = (state) => {
  return { 
    fallAsleepTime: state.fallAsleepTime,
    alarmTime: state.alarmTime,
  };
}

export default connect(
  mapStateToProps,
  { addAlarm }
)(HomeScreen)