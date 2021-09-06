import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import AppBackground from '../AppBackground';
import Modal from './Modal';
import Button from '../Button';
import AppInput from '../AppInput';
import {BG_COLOR_COMPONENTS, windowHeight, windowWidth} from '../../Constants';
import {addNewData, editData, getData} from '../../utility/asyncStorageHandler';

const DreamNoteScreen = ({navigation, needAdd, needAddOff}) => {
  const DEFAULT_TITLE = 'My Dream';

  const [title, setTitle] = useState(needAdd ? DEFAULT_TITLE : dream.title);
  const [text, setText] = useState(needAdd ? '' : dream.note);
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(null);
  const date = needAdd ? new Date().toLocaleDateString() : dream.time;

  // let savedText = isNewDream ? '' : dream.note;
  // let savedTitle = isNewDream ? DEFAULT_TITLE : dream.title;

  const visibleHandler = () => setModalVisible(!modalVisible);

  // const editModeToggle = () => setEditMode(!editMode);
  const generateNewId = async () => {
    const list = await getData('dreamNotes')
    const newId = list.length ? list[list.length - 1].id + 1 : 1;
    setId(newId);
    return newId;
  };

  useEffect(() => {
    generateNewId();
    console.log(id)
  }, []);

  const onBackYes = () => {
    onPressSave();
    onPressBack();
  };

  const onBackNo = () => {
    onPressBack();
  };

  const onFirstTimeFocus = () => {
    if (isNewDream) {
      setTitle('');
    }
  };

  onPressSave = async () => {
    if (needAdd) {
      needAddOff();
      await addNewData('dreamNotes', {
        id: id,
        title: title,
        note: text,
        date: date,
      });
    } else {
      console.log('edit data');
      await editData('dreamNotes', {
        id: id,
        title: title,
        note: text,
      });
    }
  };

  onPressBack = () => {
    navigation.navigate('DreamsList');
  };

  // const checkIsDefault = () =>
  //   (title === DEFAULT_TITLE || title === '') && text === '';

  // const saveCheck = () =>
  //   dream ? !(title === savedTitle && text === savedText) : checkIsDefault();

  // const checkIsChanged = () => {
  //   return !(text === savedText && title === savedTitle);
  // };

  return (
    <AppBackground>
      <View style={styles.container}>
        <Modal
          visible={modalVisible}
          visibleHandler={visibleHandler}
          modalProps={{
            title: `Would you like to save changes?`,
            yesFunc: onBackYes,
            noFunc: onBackNo,
          }}
        />
        <View style={styles.btnPanel}>
          <View style={styles.btnPanelLeft}>
            <Button
              onPress={() => {
                onPressBack();
              }}>
              back
            </Button>
          </View>
          <View style={styles.btnPanelRight}>
            <Button onPress={onPressSave}>save</Button>
          </View>
        </View>
        <ScrollView style={styles.contentScroll}>
          <View>
            <View style={styles.headerWrap}>
              <View style={styles.header}>
                <AppInput
                  value={title}
                  onFocus={onFirstTimeFocus}
                  onChangeText={value => setTitle(value)}
                  style={styles.headerText}
                />
              </View>
            </View>
            <View style={styles.dreamSection}>
              <View style={styles.dreamPanel}>
                <AppInput
                  value={text}
                  onChangeText={value => setText(value)}
                  style={[
                    styles.dreamText,
                    {
                      minHeight: windowHeight * 0.26,
                      backgroundColor: BG_COLOR_COMPONENTS,
                    },
                  ]}
                  autoFocus={true}
                  multiline={true}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </AppBackground>
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
  content: {},
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

export default DreamNoteScreen;
