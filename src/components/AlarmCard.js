import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import Button from './Button';
import Clock from './Clock';
import AlarmProps from './AlarmProps';
import { openAlarmProps, toggleAlarm } from '../actions';
import { windowHeight, BG_COLOR_COMPONENTS } from '../Constants';

const cardHeight = (windowHeight - 25) * .15;

class AlarmCard extends React.Component {
  state = {
    hours: this.props.time.split(':')[0],
    minutes: this.props.time.split(':')[1],
  }

  toggleAlarm = () => {
    this.props.toggleAlarm(this.props.id);
  }

  showProps = () => {
    this.props.openAlarmProps(this.props.id);
  }

  renderAlarmProps() {
    return this.props.showProps ? <AlarmProps {...this.props} /> : null;
  }

  render() {
    return (
      <View style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <View style={[styles.cardContainer, { marginBottom: this.props.showProps ? 6 : 0 }]}>
          <View style={styles.dropDownButton}>
            <Button style={styles.button} onPress={() => {
              this.showProps();
            }} >...</Button>
          </View>
          <View style={styles.clockContainer}>
            <Clock time={this.props.time} fontSize={cardHeight * .5} />
          </View>
          <View style={styles.toggleSwitch}>
            <Button style={{ opacity: this.props.isOn ? 1 : .5, fontSize: cardHeight * .25 }} onPress={this.props.isOn ? null : this.toggleAlarm}>on</Button>
            <Button style={{ opacity: this.props.isOn ? .5 : 1, fontSize: cardHeight * .25 }} onPress={this.props.isOn ? this.toggleAlarm : null}>off</Button>
          </View>
        </View>
        {this.renderAlarmProps()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardContainer: {
    height: cardHeight,
    backgroundColor: BG_COLOR_COMPONENTS,
    flexDirection: 'row'
  },
  dropDownButton: {
    flex: 1,
    alignSelf: 'flex-end',
    paddingBottom: 5
  },
  clockContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  toggleSwitch: {
    flex: 1,
    alignSelf: 'flex-end',
    paddingBottom: 5
  },
  button: {
    fontSize: cardHeight * .4,
  }
});

export default connect(
  null,
  { openAlarmProps, toggleAlarm }
)(AlarmCard);