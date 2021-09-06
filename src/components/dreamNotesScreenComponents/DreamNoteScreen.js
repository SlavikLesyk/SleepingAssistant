import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import AppBackground from '../AppBackground';
import ModalAsk from '../ModalAsk';
import Button from '../Button';
import AppInput from '../AppInput';
import AppText from '../AppText';
import {BG_COLOR_COMPONENTS, windowHeight, windowWidth} from '../../Constants';
import {
  addNewData,
  editData,
  deleteData,
} from '../../utility/asyncStorageHandler';

const DreamNoteScreen = ({navigation, route}) => {
  const {isNewDream, id} = route.params;

  // const generateNewId = list =>
  // list.length ? list[list.length - 1].id + 1 : 1;

  const date = isNewDream ? new Date().toLocaleDateString() : dream.time;
  const DEFAULT_TITLE = 'My Dream';

  const [title, setTitle] = useState(dream ? dream.title : DEFAULT_TITLE);
  const [text, setText] = useState(dream ? dream.note : '');
  const [editMode, setEditMode] = useState(isNewDream);
  const [needAdd, setNeedAdd] = useState(isNewDream);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({});

  let savedText = isNewDream ? '' : dream.note;
  let savedTitle = isNewDream ? DEFAULT_TITLE : dream.title;

  const visibleHandler = () => setModalVisible(!modalVisible);

  const editModeToggle = () => setEditMode(!editMode);

  const savePrevCondition = () => {
    savedText = text;
    savedTitle = title;
  };

  const onPressEdit = () => {
    savePrevCondition();
    editModeToggle();
  };

  const onDeleteYes = () => {
    deleteData('dreamNotes', id);
    onPressBack();
  };

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
    editModeToggle();
    if (needAdd) {
      setNeedAdd(false);
      console.log('add', needAdd);
      await addNewData('dreamNotes', {
        id: id,
        title: title,
        note: text,
        time: date,
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
    console.log('defaultCheck', checkIsDefault());
    console.log('changedCheck', checkIsChanged());
  };

  const setDelProps = () => {
    setModalProps({
      title: 'Do you want to delete this note?',
      yesFunc: onDeleteYes,
    });
  };

  const setBackProps = () => {
    setModalProps({
      title: `Would you like to save changes?`,
      yesFunc: onBackYes,
      noFunc: onBackNo,
    });
  };

  const checkIsDefault = () =>
    (title === DEFAULT_TITLE || title === '') && text === '';

  // const saveCheck = () =>
  //   dream ? !(title === savedTitle && text === savedText) : checkIsDefault();

  const checkIsChanged = () => {
    console.log('text', text);
    console.log('st', savedText);
    console.log('t', title);
    console.log('st', savedTitle);
    return !(text === savedText && title === savedTitle);
  };

  const renderHeader = () => {
    if (editMode) {
      return (
        <AppInput
          value={title}
          onFocus={onFirstTimeFocus}
          onChangeText={value => setTitle(value)}
          style={styles.headerText}
        />
      );
    }

    return <AppText style={styles.headerText}>{title}</AppText>;
  };

  const renderDreamText = () => {
    if (editMode) {
      return (
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
          autoFocus={isNewDream}
          multiline={true}
        />
      );
    }
    return <AppText style={styles.dreamText}>{text}</AppText>;
  };

  const renderBtnPanel = () => {
    return (
      <View style={styles.btnPanel}>
        <View style={styles.btnPanelLeft}>
          <Button
            onPress={() => {
              if (checkIsChanged() && !checkIsDefault()) {
                setBackProps();
                visibleHandler();
              } else {
                onPressBack();
              }
            }}>
            back
          </Button>
        </View>
        <View style={styles.btnPanelRight}>
          {editMode ? (
            <Button onPress={onPressSave}>save</Button>
          ) : (
            <Button onPress={onPressEdit}>edit</Button>
          )}
          <Button
            style={{opacity: !needAdd ? 1 : 0.4}}
            onPress={() => {
              console.log(needAdd);
              if (!needAdd) {
                setDelProps();
                visibleHandler();
              }
            }}>
            delete
          </Button>
        </View>
      </View>
    );
  };

  return (
    <AppBackground>
      <View style={styles.container}>
        <ModalAsk
          visible={modalVisible}
          visibleHandler={visibleHandler}
          modalProps={modalProps}
        />
        {editMode ? renderBtnPanel() : null}
        <ScrollView style={styles.contentScroll}>
          <View style={{marginTop: editMode ? 0 : 25}}>
            <View style={styles.headerWrap}>
              <View style={styles.header}>{renderHeader()}</View>
            </View>
            <View style={styles.dreamSection}>
              <View style={styles.dreamPanel}>
                {renderDreamText()}
                {editMode ? null : (
                  <AppText style={styles.datesText}>{date}</AppText>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        {!editMode ? renderBtnPanel() : null}
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
// connect(mapStateToProps, {
//   addNewDream,
//   editDream,
//   deleteDream
// })();
