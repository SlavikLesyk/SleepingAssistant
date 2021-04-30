import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { BG_FIRST_COLOR, BG_SECOND_COLOR } from '../Constants';
import LinearGradient from 'react-native-linear-gradient';

const AppBackground = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={[BG_FIRST_COLOR, BG_SECOND_COLOR]}
        style={styles.linearGradient}
      >
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_FIRST_COLOR
  },
  linearGradient: {
    flex: 1
  }
});

export default AppBackground;