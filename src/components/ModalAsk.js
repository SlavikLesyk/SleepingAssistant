import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import AppText from './AppText';
import Button from './Button';

export default function ModalAsk(props) {
  const { visible, visibleHandler, modalProps } = props;
  const {
    title = 'Title',
    yesFunc = null,
    noFunc = null
  } = modalProps;

  return (
    <View style={styles.container}>
      <Modal animationType="fade"
        transparent={true}
        visible={visible}>
        <View style={styles.innerContainer}>
          <Button onPress={visibleHandler}>X</Button>
          <AppText>{title}</AppText>
          <View style={styles.answers}>
            <Button onPress={() => {
              yesFunc ? yesFunc() : null;
              visibleHandler();
            }}>
              Yes
            </Button>
            <Button onPress={() => {
              noFunc ? noFunc() : null;
              visibleHandler();
            }}>
              No
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: 'rgba(0, 0, 0, .8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  answers: {
    flexDirection: 'row',
  }
});

