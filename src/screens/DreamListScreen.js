import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AppText from '../components/AppText'
import AppBackground from '../components/AppBackground';
import GestureRecognizer from '../utility/swipe-gestures';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { windowHeight, windowWidth, BG_COLOR_COMPONENTS } from '../Constants';



const DreamListScreen = ({ navigation, dreams }) => {

  const renderList = ({ item }) => {
    return (
      <View style={styles.wrap}>
        <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('DreamNote', { id: item.id, isNewDream: false })} >
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
    <GestureRecognizer
      onSwipeRight={() => navigation.navigate('Playlist')}
      onSwipeLeft={() => navigation.navigate('About')}
      style={{ flex: 1 }}>
      <AppBackground>
        <View style={styles.addButton}>
          <Button
            onPress={() => navigation.navigate('DreamNote', { isNewDream: true })}
          >
            add dream note
          </Button>
        </View>
        <FlatList
          data={[...dreams].reverse()}
          renderItem={renderList}
          keyExtractor={item => item.id}
        />
      </AppBackground>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  wrap: {
    height: windowHeight * .12,
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
    height: windowHeight * .07,
    width: windowWidth * .8,
  },
  dateWrap: {
    height: windowHeight * .03,

  },
  titleText: {    

  },
  dateText: {
    textAlign: 'right',
    fontSize: windowHeight * .021,
  }
});

const mapStateToProps = ({ dreams }) => ({ dreams });


export default connect(mapStateToProps, {})(DreamListScreen);