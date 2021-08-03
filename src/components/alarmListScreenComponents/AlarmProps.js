import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Button from '../Button';
import AppText from '../AppText';
import AppInput from '../AppInput';
import {deleteData, editData, getData} from '../../utility/asyncStorageHandler';
// import DaysCicle from './DaysCicle';
import {
  BG_COLOR_COMPONENTS,
  COLOR_SECONDARY,
  windowHeight,
} from '../../Constants';

const cardHeight = windowHeight * 0.22;

const AlarmProps = ({id, deleteAlarm}) => {
  const [text, setText] = useState('');
  const [alarmData, setAlarmData] = useState({});

  const getAlarmData = async () => {
    const alarmList = await getData('alarmList');
    const alarmData = alarmList.filter(item => item.id === id)[0];
    setAlarmData(alarmData);
    setText(alarmData.name)
  };

  useEffect(() => {
    getAlarmData();
  }, []);

  const onPressDelete = () => {
    deleteData('alarmList', id);
    deleteAlarm();
  };

  const saveName = async () => {
    await editData('alarmList', {id: id, name: text});
    setAlarmData({...alarmData, name: text});
  };

  const toggleRepeat = async () => {
    await editData('alarmList', {id: id, repeat: !alarmData.repeat});
    setAlarmData({...alarmData, repeat: !alarmData.repeat});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 1}} />
        <View style={{flex: 1}}>
          <Button style={styles.btnDelete} onPress={onPressDelete}>
            delete
          </Button>
        </View>
      </View>
      <View style={styles.days}>
        {/* <DaysCicle activeDays={props.days} id={props.id} /> */}
        <Button
          style={{opacity: alarmData.repeat ? 1 : 0.2}}
          onPress={toggleRepeat}>
          repeat
        </Button>
      </View>
      <View style={styles.title}>
        <AppInput
          value={text}
          onChangeText={value => setText(value)}
          style={styles.input}
          onBlur={saveName}
        />
      </View>
      <View style={styles.recSleepTime}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: cardHeight,
    backgroundColor: BG_COLOR_COMPONENTS,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  days: {
    flex: 2,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    flex: 2,
  },
  input: {
    textAlign: 'center',
    fontSize: 16,
  },
  btnDelete: {
    color: 'tomato',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recSleepTime: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default AlarmProps;
