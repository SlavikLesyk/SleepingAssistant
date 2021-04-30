import  React  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppBackground from '../components/AppBackground';
import Button from '../components/Button';


const AboutUsScreen = ({navigation}) => {
  return (
    <AppBackground>
      <Button onPress={() => navigation.navigate('About')}>back</Button>
    </AppBackground>    
  );
};

const styles = StyleSheet.create({});

export default AboutUsScreen;