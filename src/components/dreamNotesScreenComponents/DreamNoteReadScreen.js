import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Modal from './Modal';
import Button from '../Button';
import AppText from '../AppText';
import {BG_COLOR_COMPONENTS, windowHeight, windowWidth} from '../../Constants';
import {deleteData} from '../../utility/asyncStorageHandler';

const DreamNoteReadScreen = ({onChangeMode, id}) => {
  const [dream, setDream] = useState(null);

  const getDreamNote = async () => {
    const dreamsData = await getData('dreamNotes');
    const dreamData = dreamsData.filter(item => +item.id === +id)[0];
    setDream(dreamData);
    return dreamData;
  };

  const [modalVisible, setModalVisible] = useState(false);
  const visibleHandler = () => setModalVisible(!modalVisible);

  const pressEdit = () => {
    onChangeMode();
  };

  const onDeleteYes = () => {
    deleteData('dreamNotes', id);
    onPressBack();
  };

  const pressBack = () => {
    navigation.navigate('DreamsList');
  };

  useEffect(getDreamNote, []);
  console.log(dream);
  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        visibleHandler={visibleHandler}
        modalProps={{
          title: 'Do you want to delete this note?',
          yesFunc: onDeleteYes,
        }}
      />
      <ScrollView style={styles.contentScroll}>
        <View style={styles.headerWrap}>
          <View style={styles.header}>
            <AppText style={styles.headerText}>
              {dream ? dream.title : null}
            </AppText>
          </View>
        </View>
        <View style={styles.dreamSection}>
          <View style={styles.dreamPanel}>
            <AppText style={styles.dreamText}>
              {dream ? dream.text : null}
            </AppText>
            <AppText style={styles.datesText}>
              {dream ? dream.date : null}
            </AppText>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnPanel}>
        <View style={styles.btnPanelLeft}>
          <Button onPress={pressBack}>back</Button>
        </View>
        <View style={styles.btnPanelRight}>
          <Button onPress={pressEdit}>edit</Button>
          <Button onPress={visibleHandler}>delete</Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: windowHeight * 0.1,
    width: windowWidth,
    paddingHorizontal: 20,
  },
  btnPanelRight: {
    flexDirection: 'row',
  },
  headerWrap: {
    backgroundColor: BG_COLOR_COMPONENTS,
  },
  header: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: windowHeight * 0.07,
    width: windowWidth * 0.8,
    marginBottom: 15,
  },
  headerText: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  dreamSection: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: windowWidth * 0.03,
    paddingBottom: 0,
  },
  dreamText: {
    textAlign: 'left',
    textAlignVertical: 'top',
    marginBottom: windowHeight * 0.08,
    width: windowWidth * 0.94,
  },
  datesText: {
    alignSelf: 'flex-end',
    paddingBottom: windowHeight * 0.25,
  },
});

export default DreamNoteReadScreen;
