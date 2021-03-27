import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from './AppText';
import Spinner from './Spinner';
import { BG_COLOR_COMPONENTS, windowHeight, windowWidth } from '../Constants';

const MainClock = ({ style }) => {
  return(
    <View style={[styles.container, style]}>
      <View style={styles.clock}>
        <Spinner alignItems="flex-end" numbers={24} />
        <AppText style={styles.text}>:</AppText>
        <Spinner alignItems="flex-start" numbers={60}/>
      </View>
    </View>
  );
};

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  clock: {
    height: windowHeight * .15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BG_COLOR_COMPONENTS,
    paddingVertical:0
  }, 
  text: { 
    fontSize: windowWidth * .15,
    marginHorizontal: 10
  }
});

export default MainClock;