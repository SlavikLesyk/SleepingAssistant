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
    name,
    repeat,
    deleteAlarm,
  } = props;
  const [isAlarmOn, setIsAlarmOn] = useState(isOn);
  const [alarmTime, setAlarmTime] = useState(time);
  const renderAlarmProps = () => {
    return showProps ? <AlarmProps id={id} deleteAlarm={deleteAlarm} /> : null;
  };

  const handleAlarmTime = time => {
    setAlarmTime(time);
  };

  const toggleAlarm = async () => {
    await editData('alarmList', {
      id: id,
      time: time,
      isOn: !isAlarmOn,
      name: name,
      repeat: repeat,
    });
    updateNotification();
    setIsAlarmOn(prevState => !prevState);
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
            onChangeTime={handleAlarmTime}
          />
        </View>
        <View style={styles.toggleSwitch}>
          <Button
            style={{
              opacity: isAlarmOn ? 1 : 0.5,
              fontSize: cardHeight * 0.25,
            }}
            onPress={isAlarmOn ? null : toggleAlarm}>
            on
          </Button>
          <Button
            style={{
              opacity: isAlarmOn ? 0.5 : 1,
              fontSize: cardHeight * 0.25,
            }}
            onPress={isAlarmOn ? toggleAlarm : null}>
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
