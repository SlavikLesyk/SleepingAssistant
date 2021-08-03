import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AlarmCard from './AlarmCard';
import {getData} from '../../utility/asyncStorageHandler';

const AlarmListComponents = ({navigation}) => {
  const [alarmList, setAlarmList] = useState([]);
  const [showPropsId, setShowPropsId] = useState(null);

  const getAlarmList = async () => {
    const alarmList = await getData('alarmList');
    setAlarmList(alarmList);
  };

  useEffect(() => {
    getAlarmList();
    console.log('mount');
  }, []);

  useEffect(() => {
    console.log('focused');
    const unsubscribe = navigation.addListener('focus', () => {
      getAlarmList();
    });

    return unsubscribe;
  }, [navigation]);

  const closeProps = () => setShowPropsId(null);

  const renderList = ({item}) => {
    const openProps = () => setShowPropsId(item.id);
    const deleteAlarm = () =>
      setAlarmList(alarmList.filter(element => element.id !== item.id));
    return (
      <View style={styles.cardWrap}>
        <AlarmCard
          {...item}
          showProps={showPropsId === item.id}
          openProps={openProps}
          closeProps={closeProps}
          deleteAlarm={deleteAlarm}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View>
        <FlatList
          removeClippedSubviews={false}
          data={[...alarmList].reverse()}
          renderItem={renderList}
          keyExtractor={item => item.id + item.name}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  cardWrap: {
    marginBottom: 5,
  },
});

export default AlarmListComponents;
