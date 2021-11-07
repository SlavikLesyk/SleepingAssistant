import * as React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {toggleAlarm} from '../../store/actions'

const Toggle = ({isOn, id, toggleAlarm}) => {
  onPressToggle = () => {
    toggleAlarm(id);
  };


  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={onPressToggle}>
        <View style={styles.toggle}>
          <View
            style={[
              styles.dote,
              isOn ? {top: 3, backgroundColor: 'white'} : {bottom: 3},
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginHorizontal: 'auto',
  },
  toggle: {
    width: 34,
    height: 60,
    borderWidth: .5,
    borderColor: '#fff',
    marginHorizontal: 'auto',
    borderRadius: 1000,
    position: 'relative',
  },
  dote: {
    width: 26,
    height: 26,
    borderRadius: 1000,
    borderColor: 'white',
    borderWidth: 1,
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -13}],
  },
});

export default connect(null, {toggleAlarm})(Toggle);
