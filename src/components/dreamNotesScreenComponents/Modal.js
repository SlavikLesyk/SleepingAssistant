import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { windowHeight } from '../../Constants';
import AppText from '../AppText';
import Button from '../Button';

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
          <View style={styles.closeWrap}>
            <Button onPress={visibleHandler} style={styles.btnClose}>X</Button>
          </View>
          <AppText style={styles.title}>{title}</AppText>
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
    justifyContent: 'space-around',
    width: 200
  },
  closeWrap: {
    width: 300,
    alignItems: 'flex-end',
  },
  btnClose: {
    marginBottom: windowHeight * .05,
    textAlign: 'right',
  },
  title: {
    textAlign: 'center',
    marginBottom: windowHeight * .05,
    width: 300,
  }
});

