import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Button from '../components/Button';
import AppInput from '../components/AppInput';
import AppBackground from '../components/AppBackground';
import { COLOR_MAIN, windowHeight, windowWidth } from '../Constants';
import AppText from '../components/AppText';

const DreamNoteScreen = ({ navigation, route }) => {
  const {data, isNewDream} = route.params;
  const [header, setHeader] = useState(isNewDream ? 'My dream' : data.title);
  const [text, setText] = useState(data ? data.note : null);
  const [newDream, setNewDream] = useState(isNewDream);
  const [editMode, seteditMode] = useState (isNewDream);
  const date = isNewDream ? new Date().toLocaleDateString() : data.time;

  console.log(data)

  const renderHeader= () => {
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
  }
  const renderDreamText = () => {
    if (editMode) {
      return (
        <AppInput
          value={text}
          onChangeText={value => setText(value)}
          style={styles.dreamText} 
          autoFocus={isNewDream}
          multiline={true}
        />
      );
    }
    return (
      <AppText  style={styles.dreamText}> 
        {text}
      </AppText>
    );
  }

  const editModeToggle = () => {
    seteditMode(!editMode);
  }
  
  const onFirstTimeFocus = () =>{
    if (newDream) {
      setHeader('');
      setNewDream(false);
    }
  }

  const renderBtnPanel = () => {
    return (
      <View style={styles.btnPanel}>
          <Button onPress={() => navigation.navigate('DreamsList')}>back</Button>
          <Button onPress={() => navigation.navigate('DreamsList')}>delete</Button>
          { editMode 
            ? <Button onPress={editModeToggle}>save</Button>
            : <Button onPress={editModeToggle}>edit</Button>
          }
      </View>
    );
  }

  return (
    <AppBackground>
      <View style={styles.container}>
        {editMode ? renderBtnPanel() : null}
        <View style={styles.header}>
          {renderHeader()}
        </View>
        <View style={styles.dreamSection}>
          <ScrollView style={styles.dreamPanel}>
            {renderDreamText()}
            <AppText style={styles.datesText}>{date}</AppText>
          </ScrollView>
        </View>
        {!editMode ? renderBtnPanel() : null}
      </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btnPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: windowHeight * .1,
  },
  header: {
    height: windowHeight * .07,
    width: windowWidth * .8,
    borderBottomWidth: 1,
    borderColor: COLOR_MAIN
  },
  headerText: {
    
  },
  dreamSection: {
    height: windowHeight * .83,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 15,
    paddingBottom: 0,
  },
  dreamText: {
    textAlign: 'left',
  },
  datesText: {
    alignSelf: 'flex-end'
  },
});

export default DreamNoteScreen;