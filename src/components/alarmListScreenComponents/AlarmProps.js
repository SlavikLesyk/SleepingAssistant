import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Button from '../Button';
import AppText from '../AppText';
import AppInput from '../AppInput';
import { deleteAlarm } from '../../actions';
import DaysCicle from './DaysCicle';
import { BG_COLOR_COMPONENTS, COLOR_SECONDARY, windowHeight } from '../../Constants';

const cardHeight = windowHeight * .22;

const AlarmProps = (props) => {
  const [text, setText] = useState('');

  const deleteAlarm = () => {
    props.deleteAlarm(props.id)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }} />
        <View style={styles.heading}>
          <AppText styles={{ fontSize: cardHeight * .2 }}>cycle</AppText>
        </View>
        <View style={{ flex: 1 }}>
          <Button style={styles.btnDelete} onPress={deleteAlarm}>
            delete
          </Button>
        </View>
      </View>
      <View style={styles.days}>
        <DaysCicle activeDays={props.days} id={props.id} />
      </View>
      <View style={styles.title}>
        <AppInput
          placeholder="name"
          placeholderTextColor={COLOR_SECONDARY}
          value={text} onChangeText={value => setText(value)}
          style={styles.input}
        />
      </View>
      <View style={styles.recSleepTime}>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: cardHeight,
    backgroundColor: BG_COLOR_COMPONENTS
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  heading: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  days: {
    flex: 2,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  title: {
    flex: 2,
  },
  input: {
    textAlign: 'center',
    fontSize: 16
  },
  btnDelete: {
    color: 'tomato',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recSleepTime: {
    flex: 1,
    flexDirection: 'row'
  }
});


export default connect(
  null,
  { deleteAlarm }
)(AlarmProps);