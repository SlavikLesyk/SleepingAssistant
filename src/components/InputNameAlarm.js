import React from 'react';
import {StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';

class InputNameAlarm extends React.Component {  

  render() {
    return(
      <TextInput 
        placeholder="name"
      />
    );
  }
};

const styles = StyleSheet.create({});

export default connect(
  null,
  {}
  )(InputNameAlarm);
