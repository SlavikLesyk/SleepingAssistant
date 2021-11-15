import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {connect} from 'react-redux';
import Button from '../Button';
import Clock from './Clock';
import Toggle from './Toggle';
import AlarmProps from './AlarmProps';
import {toggleAlarm} from '../../store/actions';
import {windowHeight, BG_COLOR_COMPONENTS} from '../../Constants';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';

const cardHeight = (windowHeight - 25) * 0.15;

const AlarmCard = props => {
  const {
    // toggleAlarm,
    id,
    time,
    isOn,
    chooseActiveProps,
    activeProps,
  } = props;

  console.log(id, isOn);
  // onPressToggle = () => {
  //   toggleAlarm(id);
  // };

  const openProps = () =>
    activeProps === id ? chooseActiveProps(null) : chooseActiveProps(id);

  const renderAlarmProps = () => {
    return activeProps === id ? <AlarmProps id={id} /> : null;
  };

  return (
    <View
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View
        style={[
          styles.cardContainer,
          {marginBottom: activeProps === id ? 6 : 0},
        ]}>
        <View style={styles.dropDownButton}>
          <Button style={styles.button} onPress={openProps}>
            ...
          </Button>
        </View>
        <View style={styles.clockContainer}>
          <Clock time={time} fontSize={cardHeight * 0.5} id={id} />
        </View>
        <View style={styles.toggleSwitch}>
          <Toggle isOn={isOn} id={id} />
        </View>
      </View>
      {renderAlarmProps()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    height: cardHeight,
    backgroundColor: BG_COLOR_COMPONENTS,
    flexDirection: 'row',
  },
  dropDownButton: {
    flex: 1,
    alignSelf: 'flex-end',
    paddingBottom: 5,
  },
  clockContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleSwitch: {
    flex: 1,
    alignItems: 'flex-end',
    paddingBottom: 5,
  },
  button: {
    fontSize: cardHeight * 0.4,
  },
});

export default connect(null, {toggleAlarm})(AlarmCard);
