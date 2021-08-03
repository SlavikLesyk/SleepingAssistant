import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import AppText from '../AppText';
import AppBackground from '../AppBackground';
import Button from '../Button';
import {windowHeight, windowWidth, BG_COLOR_COMPONENTS} from '../../Constants';
import {getData} from '../../utility/asyncStorageHandler';

const DreamListScreen = ({navigation}) => {
  const [dreamNotes, setDreamNotes] = useState([]);
  const [newId, setNewId] = useState(0);

  const getDreamNotes = async () => {
    const dreamNotes = await getData('dreamNotes');
    setDreamNotes(dreamNotes);
    setNewId(generateNewId(dreamNotes));
    return dreamNotes;
  };
  
  const generateNewId = list =>
    list.length ? list[list.length - 1].id + 1 : 1;

  useEffect(async () => {
    // getDreamNotes();
    console.log('mount');
  }, []);

  useEffect(() => {
    console.log('focused');
    const unsubscribe = navigation.addListener('focus', async () => {
      getDreamNotes();
    });
    return unsubscribe;
  }, [navigation]);

  const renderList = ({item}) => {
    return (
      <View style={styles.wrap}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() =>
            navigation.navigate('DreamNote', {
              dream: item,
              id: item.id,
              isNewDream: false,
            })
          }>
          <View style={styles.innerWrap}>
            <View style={styles.titleWrap}>
              <AppText style={styles.titleText}>{item.title}</AppText>
            </View>
            <View style={styles.dateWrap}>
              <AppText style={styles.dateText}>{item.time}</AppText>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <AppBackground>
      <View style={styles.addButton}>
        <Button
          onPress={() =>
            navigation.navigate('DreamNote', {id: newId, isNewDream: true})
          }>
          add dream note
        </Button>
      </View>
      <FlatList
        data={[...dreamNotes].reverse()}
        renderItem={renderList}
        keyExtractor={item => item.id}
      />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  wrap: {
    height: windowHeight * 0.12,
    backgroundColor: BG_COLOR_COMPONENTS,
    marginBottom: 10,
    padding: 5,
  },
  addButton: {
    marginVertical: 25,
  },
  touchable: {
    flex: 1,
  },
  innerWrap: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleWrap: {
    height: windowHeight * 0.07,
    width: windowWidth * 0.8,
  },
  dateWrap: {
    height: windowHeight * 0.03,
  },
  titleText: {},
  dateText: {
    textAlign: 'right',
    fontSize: windowHeight * 0.021,
  },
});

export default DreamListScreen;
