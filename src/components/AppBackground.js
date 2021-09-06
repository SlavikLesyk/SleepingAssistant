import React from 'react';
import {StyleSheet, SafeAreaView, ImageBackground, Image} from 'react-native';
import {BG_FIRST_COLOR, BG_SECOND_COLOR} from '../Constants';
import LinearGradient from 'react-native-linear-gradient';

const AppBackground = ({children, deg = 0}) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        colors={[BG_FIRST_COLOR, BG_SECOND_COLOR]}
        style={styles.linearGradient}>
        <ImageBackground
          source={require('../../assets/img/background.png')}
          style={[
            styles.bg,
            {
              transform: [
                {
                  rotate: `${deg}deg`,
                },
              ],
            },
          ]}
        />
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_FIRST_COLOR,
  },
  linearGradient: {
    flex: 1,
  },
  bg: {
    flex: 1,
    position: 'absolute',
    // resizeMode: 'contain',
    opacity: 0.28,
    transform: [
      {
        scale: 1.2,
      },
    ],
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default AppBackground;
