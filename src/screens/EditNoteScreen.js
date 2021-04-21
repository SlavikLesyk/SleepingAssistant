import  React  from 'react';
import { View, StyleSheet } from 'react-native';
import AppBackground from '../components/AppBackground';
import Button from '../components/Button';
import AppInput from '../components/AppInput';
import { windowHeight } from '../Constants';

const EditNoteScreen = ({ navigation }) => {
  return (
    <AppBackground>
      <View style={styles.btnPanel}>
        <Button onPress={() => navigation.navigate('DreamNote')}>back</Button>
        <Button onPress={() => navigation.navigate('DreamNote')}>save</Button>
      </View>
      <View style={styles.editArea}>
        <AppInput />
      </View>
    </AppBackground> 
  );
};

const styles = StyleSheet.create({
  btnPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'lime',
    height: windowHeight * .1,
  },
});

export default EditNoteScreen;