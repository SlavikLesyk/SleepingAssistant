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

class HomeScreen extends React.Component {
  state = {
    time: new Date(),
    hours: '12',
    minutes: '00',
  }

  addAlarm = () => {
    this.props.addAlarm(`${this.state.hours}:${this.state.minutes}`)
  };

  changeTime = (type, value) => this.setState({ [type]: value });

  render() {
    return (
      <GestureRecognizer
        onSwipeLeft={() => this.props.navigation.navigate('Alarm')}
        onSwipeRight={() => this.props.navigation.navigate('Start')}
        style={{ flex: 1 }}
      >
        <AppBackground>
          <View style={styles.container}>
            <View style={styles.clockWrapper}>
              <ButtonAddNew
                style={{ flex: 1 }}
                onPress={() => {
                  this.props.navigation.navigate('Alarm');
                  this.addAlarm();
                }}
              />
              <ClockSpinner style={{ flex: 2 }} />
            </View>
            <View style={styles.circle}>
              <ImageBackground
                source={require('../../assets/img/SleepAlarmMarker.png')}
                style={{
                  transform: [
                    { rotate: (this.state.hours * 15 + this.state.minutes) / 2 + "deg" },
                    { scale: 1.25 }
                  ]
                }}
              />
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
                enabled={Platform.OS === "ios" ? true : false}
              >
                <CirclePhase fallAsleepTime={this.props.fallAsleepTime} />
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
  return { fallAsleepTime: state.fallAsleepTime };
}

export default connect(
  mapStateToProps,
  { addAlarm }
)(HomeScreen)