import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {COLOR_MAIN} from '../../Constants';
import AppInput from '../AppInput';
import AppText from '../AppText';
import {editData} from '../../utility/asyncStorageHandler';
import {updateNotification} from '../../notification/pushNotification';

function Clock(props) {
  const {time, fontSize, id} = props;
  const [hours, setHours] = useState(time.split(':')[0]);
  const [minutes, setMinutes] = useState(time.split(':')[1]);
  const [oldHours, setOldHours] = useState('');
  const [oldMinutes, setOldMinutes] = useState('');

  const saveTime = async time => {
    await editData('alarmList', {id: id, time: time});
  };

  const setTimeOnChange = (value, type) => {
    let newValue = value.replace(/[^0-9]{0,2}/g, '');
    let maxValue = 0;

    switch (type) {
      case 'minutes':
        maxValue = 59;
        break;
      case 'hours':
        maxValue = 23;
        break;
      default:
        console.log('type error');
    }

    if (newValue.length > 2) {
      return;
    }

    if (newValue > maxValue) {
      newValue = `${maxValue}`;
    }

    if (type === 'hours') {
      setHours(newValue);
    }

    if (type === 'minutes') {
      setMinutes(newValue);
    }
  };

  const setTimeOnBlur = async type => {
    let minutesValue = minutes;
    let hoursValue = hours;

    switch (type) {
      case 'hours':
        if (hours && hours.length < 2) {
          setHours(`0${hours}`);
          hoursValue = `0${hours}`;
        }
        if (!hours) {
          setHours(oldHours);
          hoursValue = oldHours;
        }
        break;
      case 'minutes':
        if (minutes && minutes.length < 2) {
          setMinutes(`0${minutes}`);
          minutesValue = `0${minutes}`;
        }
        if (!minutes) {
          setMinutes(oldMinutes);
          minutesValue = oldMinutes;
        }
        break;
      default:
        console.error('setTimeOnBlur type error');
    }
    await saveTime(`${hoursValue}:${minutesValue}`);
    await updateNotification();
  };

  return (
    <View style={styles.container}>
      <AppInput
        value={hours}
        onFocus={() => {
          setOldHours(hours);
          setHours('');
        }}
        onChangeText={value => setTimeOnChange(value, 'hours')}
        onBlur={() => {
          setTimeOnBlur('hours');
        }}
        keyboardType="number-pad"
        maxLength={2}
        style={[styles.clock, {textAlign: 'right', fontSize: fontSize}]}
      />
      <AppText style={{fontSize: fontSize}}>:</AppText>
      <AppInput
        value={minutes}
        onFocus={() => {
          setOldMinutes(minutes);
          setMinutes('');
        }}
        onChangeText={value => setTimeOnChange(value, 'minutes')}
        onBlur={() => {
          setTimeOnBlur('minutes');
        }}
        keyboardType="number-pad"
        maxLength={2}
        style={[styles.clock, {textAlign: 'left', fontSize: fontSize}]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clock: {
    flex: 0,
    color: COLOR_MAIN,
    padding: 5,
  },
});

export default Clock;
