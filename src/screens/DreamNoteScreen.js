import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Button from '../components/Button';
import AppInput from '../components/AppInput';
import AppBackground from '../components/AppBackground';
import ModalAsk from '../components/ModalAsk';
import AppText from '../components/AppText';
import { BG_COLOR_COMPONENTS, windowHeight, windowWidth } from '../Constants';
import { addNewDream, editDream, deleteDream } from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    dreams: state.dreams,
    dream: state.dreams.find((dream) => dream.id === ownProps.route.params.id)
  };
};

const DreamNoteScreen = (props) => {
  const {
    navigation,
    route,
    dreams,
    dream,
    deleteDream,
    editDream,
    addNewDream
  } = props;
  const { isNewDream } = route.params;

  const date = isNewDream ? new Date().toLocaleDateString() : dream.time;
  const DEFAULT_TITLE = 'Fuck the World!';

  const [header, setHeader] = useState(isNewDream ? DEFAULT_TITLE : dream.title);
  const [text, setText] = useState(dream ? dream.note : "");
  const [editMode, seteditMode] = useState(isNewDream);
  const [newDream, setNewDream] = useState(isNewDream);
  const [needAdd, setNeedAdd] = useState(isNewDream);
  const [id, setId] = useState(dream ? dream.id : dreams.length ? dreams[dreams.length - 1].id + 1 : 1);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const visibleHandler = () => setModalVisible(!modalVisible);

  const editModeToggle = () => seteditMode(!editMode);

  const onDeleteYes = () => {
    deleteDream(id);
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
    if (newDream) {
      setHeader('');
      setNewDream(false);
    }
  };

  onPressSave = () => {
    editModeToggle();
    if (needAdd) {
      addNewDream({
        id: id,
        title: header,
        note: text,
        time: date
      });
      setNeedAdd(false);

    } else {
      editDream({
        id: id,
        title: header,
        note: text,
        time: date
      });
    }

  };

  onPressBack = () => {
    navigation.navigate('DreamsList');
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
      noFunc: onBackNo
    })
  };

  const defaultCheck = () => {
    console.log(!((header === DEFAULT_TITLE || header === '')
      &&
      text === ''
      ||
      needAdd
    ))
    console.log('header:', header === DEFAULT_TITLE || header === '');
    console.log('text:', text === '');
    console.log('need add:', needAdd);

    return !(
      (header === DEFAULT_TITLE || header === '')
      &&
      text === ''
    ) &&
      needAdd;
  };

  const saveCheck = () => {
    if (dream) {
      console.log("saveCheck", !(
        header === dream.title
        &&
        text === dream.note
      ));
      return !(
        header === dream.title
        &&
        text === dream.note
      );
    }
    return defaultCheck();
  };

  const renderHeader = () => {
    if (editMode) {
      return (
        <AppInput
          value={header}
          onFocus={onFirstTimeFocus}
          onChangeText={value => setHeader(value)}
          style={styles.headerText}
        />
      );
    }

    return <AppText style={styles.headerText}>{header}</AppText>
  };

  const renderDreamText = () => {
    if (editMode) {
      return (
        <AppInput
          value={text}
          onChangeText={value => setText(value)}
          style={[styles.dreamText, { minHeight: windowHeight * .26, backgroundColor: BG_COLOR_COMPONENTS }]}
          autoFocus={isNewDream}
          multiline={true}
        />
      );
    }
    return (
      <AppText style={styles.dreamText}>
        {text}
      </AppText>
    );
  };

  const renderBtnPanel = () => {
    return (
      <View style={styles.btnPanel}>
        <View style={styles.btnPanelLeft}>
          <Button
            onPress={() => {
              console.log(saveCheck())
              if (saveCheck()) {
                setBackProps();
                visibleHandler();
              } else {
                onPressBack();
              }
            }}>back</Button>
        </View>
        <View style={styles.btnPanelRight}>
          {(editMode)
            ? <Button onPress={onPressSave}>save</Button>
            : <Button onPress={editModeToggle}>edit</Button>
          }
          <Button
            style={{ opacity: defaultCheck() ? 1 : .4 }}
            onPress={() => {
              if (defaultCheck()) {
                setDelProps();
                visibleHandler();
              }
            }}>delete</Button>
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
          <View style={{ marginTop: editMode ? 0 : 25 }}>
            <View style={styles.headerWrap}>
              <View style={styles.header}>
                {renderHeader()}
              </View>
            </View>
            <View style={styles.dreamSection}>
              <View style={styles.dreamPanel}>
                {renderDreamText()}
                {editMode ? null : <AppText style={styles.datesText}>{date}</AppText>}
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
    height: windowHeight * .1,
    width: windowWidth,
    paddingHorizontal: 20
  },
  btnPanelRight: {
    flexDirection: 'row'
  },
  content: {

  },
  headerWrap: {
    backgroundColor: BG_COLOR_COMPONENTS
  },
  header: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: windowHeight * .07,
    width: windowWidth * .8,
    marginBottom: 15
  },
  headerText: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  dreamSection: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: windowWidth * .03,
    paddingBottom: 0,
  },
  dreamText: {
    textAlign: 'left',
    textAlignVertical: 'top',
    marginBottom: windowHeight * .08,
    width: windowWidth * .94,
  },
  datesText: {
    alignSelf: 'flex-end',
    paddingBottom: windowHeight * .25,
  },
});

export default connect(mapStateToProps, {
  addNewDream,
  editDream,
  deleteDream
})(DreamNoteScreen);