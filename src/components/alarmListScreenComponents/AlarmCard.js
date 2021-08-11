import React, {useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import Button from '../Button';
import Clock from './Clock';
import AlarmProps from './AlarmProps';
import {windowHeight, BG_COLOR_COMPONENTS} from '../../Constants';
import {editData} from '../../utility/asyncStorageHandler';
import {updateNotification} from '../../notification/pushNotification';

const cardHeight = (windowHeight - 25) * 0.15;

const AlarmCard = props => {
  const {
    openProps,
    closeProps,
    showProps,
    time,
    id,
    isOn,
    deleteAlarm,
  } = props;
  const [isAlarmOn, setIsAlarmOn] = useState(isOn);
  const renderAlarmProps = () => {
    return showProps ? <AlarmProps id={id} deleteAlarm={deleteAlarm} /> : null;
  };

  const onAlarm = async () => {
    setIsAlarmOn(true);
    await editData('alarmList', {
      id: id,
      isOn: true,
    });
    updateNotification();
    setIsAlarmOn(true);
  };

  
  const offAlarm = async () => {
    await editData('alarmList', {
      id: id,
      isOn: false,
    });
    updateNotification();
    setIsAlarmOn(false);
  };

  return (
    <View
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={[styles.cardContainer, {marginBottom: showProps ? 6 : 0}]}>
        <View style={styles.dropDownButton}>
          <Button
            style={styles.button}
            onPress={showProps ? closeProps : openProps}>
            ...
          </Button>
        </View>
        <View style={styles.clockContainer}>
          <Clock
            time={time}
            fontSize={cardHeight * 0.5}
            id={id}
            isAlarmOn={isAlarmOn}
          />
        </View>
        <View style={styles.toggleSwitch}>
          <Button
            style={{
              opacity: isAlarmOn ? 1 : 0.5,
              fontSize: cardHeight * 0.25,
            }}
            onPress={onAlarm}>
            on
          </Button>
          <Button
            style={{
              opacity: isAlarmOn ? 0.5 : 1,
              fontSize: cardHeight * 0.25,
            }}
            onPress={offAlarm}>
            off
          </Button>
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
    alignSelf: 'flex-end',
    paddingBottom: 5,
  },
  button: {
    fontSize: cardHeight * 0.4,
  },
});

export default AlarmCard;
