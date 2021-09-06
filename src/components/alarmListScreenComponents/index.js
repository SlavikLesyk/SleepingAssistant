import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
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
    const list = await getData('alarmList');
    setAlarmList(list);
  };

  useEffect(() => {
    getAlarmList();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     getAlarmList();
  //   });

  //   return unsubscribe;
  // }, [navigation]);
  useFocusEffect(
    React.useCallback(() => {
      getAlarmList();
    }, [navigation]),
  );

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
