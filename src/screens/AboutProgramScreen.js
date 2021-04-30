import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import GestureRecognizer from '../utility/swipe-gestures';
import AppBackground from '../components/AppBackground';
import Button from '../components/Button';
import { windowHeight } from '../Constants';
import ModalAsk from '../components/ModalAsk';

export default function AboutProgramScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const visibleHandler = () => setModalVisible(!modalVisible);

  const yesFunc = () => {
    navigation.navigate('AboutUs');
    visibleHandler();
  }

  const noFunc = () => {

  }
  console.log(modalVisible)
  return (
    <GestureRecognizer onSwipeRight={() => navigation.navigate('DreamsList')} style={{ flex: 1 }}>
      <AppBackground>
        <Button 
          onPress={() => {
            // navigation.navigate('AboutUs')
            visibleHandler();            
          }}
          style={styles.btn}
        >
          naivebeam
        </Button>
        <ModalAsk 
          title='Do you want fuck the World?'
          yesFunc={yesFunc}
          noFunc={visibleHandler}
          visible={modalVisible}
          visibleHandler={visibleHandler}
        />
      </AppBackground>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  btn:{
    marginTop: windowHeight * .4 
  }
});
