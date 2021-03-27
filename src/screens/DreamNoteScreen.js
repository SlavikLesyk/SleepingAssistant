import  React  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import AppBackground from '../components/AppBackground'

const DreamNoteScreen = ({navigation}) => {
  return (
    <AppBackground>
      <Button onPress={() => navigation.navigate('DreamsList')}>back to list</Button>
    </AppBackground>
  );
};

const styles = StyleSheet.create({});

export default DreamNoteScreen;