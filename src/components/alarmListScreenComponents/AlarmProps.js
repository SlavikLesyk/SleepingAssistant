import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {deleteAlarm, changeName, toggleRepeat} from '../../store/actions';
import Button from '../Button';
import AppText from '../AppText';
import AppInput from '../AppInput';
import {updateNotification} from '../../notification/pushNotification';
// import DaysCicle from './DaysCicle';
import {
  BG_COLOR_COMPONENTS,
  COLOR_SECONDARY,
  windowHeight,
} from '../../Constants';

const AlarmProps = ({id, alarms, deleteAlarm, changeName, toggleRepeat}) => {
  const alarm = alarms.find(item => item.id === id);

  const {repeat, name, recommend4Phase, recommend5Phase, recommend6Phase} =
    alarm;

  const [text, setText] = useState(name);

  const onChangeText = () => {
    changeName(id, text);
  };

  const onPressRepeat = () => {
    toggleRepeat(id);
  };

  const onPressDelete = () => {
    deleteAlarm(id);
  };

  // const saveName = async () => {
  //   await editData('alarmList', {id: id, name: text});
  //   await updateNotification();
  //   setAlarmData({...alarmData, name: text});
  // };

  // const toggleRepeat = async () => {
  //   await editData('alarmList', {id: id, repeat: !alarmData.repeat});
  //   await updateNotification();
  //   setAlarmData({...alarmData, repeat: !alarmData.repeat});
  // };

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
        <Button style={{opacity: repeat ? 1 : 0.2}} onPress={onPressRepeat}>
          repeat
        </Button>
      </View>
      <View style={styles.title}>
        <AppInput
          placeholder="name"
          placeholderTextColor={COLOR_SECONDARY}
          value={text}
          onChangeText={value => setText(value)}
          style={styles.input}
          onBlur={onChangeText}
        />
      </View>
      <View style={styles.recSleepTime}>
        <AppText style={styles.phaseHeading}>go to bed times:</AppText>
        <View style={styles.recPhase}>
          <AppText style={styles.phaseText}>4th phase</AppText>
          <AppText style={styles.phaseTime}>{recommend4Phase}</AppText>
          <View style={styles.phaseNotify}>
            <Button style={styles.phaseBtn}>notify</Button>
          </View>
        </View>
        <View style={styles.recPhase}>
          <AppText style={styles.phaseText}>5th phase</AppText>
          <AppText style={styles.phaseTime}>{recommend5Phase}</AppText>
          <View style={styles.phaseNotify}>
            <Button style={styles.phaseBtn}>notify</Button>
          </View>
        </View>
        <View style={styles.recPhase}>
          <AppText style={styles.phaseText}>6th phase</AppText>
          <AppText style={styles.phaseTime}>{recommend6Phase}</AppText>
          <View style={styles.phaseNotify}>
            <Button style={styles.phaseBtn}>notify</Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    paddingHorizontal: 25,
    marginBottom: 5,
  },
  recPhase: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  phaseHeading: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    letterSpacing: 6,
  },
  phaseText: {
    flex: 2,
    fontSize: 14,
    letterSpacing: 6,
  },
  phaseTime: {
    flex: 1,
    textAlign: 'center',
  },
  phaseNotify: {
    flex: 2,
  },
  phaseBtn: {
    fontSize: 14,
    letterSpacing: 6,
    paddingLeft: 20,
  },
});

const mapStateToProps = state => {
  return {alarms: state.alarms.alarmsList};
};

export default connect(mapStateToProps, {
  deleteAlarm,
  toggleRepeat,
  changeName,
})(AlarmProps);
