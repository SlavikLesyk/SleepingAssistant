import  React  from 'react';
import { View, Text, StyleSheet, FlatList, Touchable, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import AppText from '../components/AppText'
import AppBackground from '../components/AppBackground';
import GestureRecognizer from '../utility/swipe-gestures';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { windowHeight, windowWidth, BG_COLOR_COMPONENTS } from '../Constants';



const DreamListScreen = ({ navigation, dreams }) => {
 
  const renderList = ({ item }) => {
    return(
      <View style={styles.wrap}>
        <Button onPress={() => navigation.navigate('DreamNote', {data:item, isNewDream:false})} >
          <AppText>{item.title}</AppText>
          <AppText>{item.time}</AppText>
        </Button>
      </View>
    );
  };
  
  return (
    <GestureRecognizer 
      onSwipeRight={() => navigation.navigate('Playlist')}
      onSwipeLeft={() => navigation.navigate('About')}
      style={{flex: 1}}>
      <AppBackground>
        <Button 
          onPress={() => navigation.navigate('DreamNote', { isNewDream: true })}
        >
          add ream note
        </Button>
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
    height: windowHeight * .1,
    backgroundColor: BG_COLOR_COMPONENTS,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 5,
  }
});

const mapStateToProps = ({ dreams }) => ({dreams});


export default connect(mapStateToProps,{})(DreamListScreen);