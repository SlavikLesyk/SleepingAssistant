import  React, { useState }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GestureRecognizer from '../utility/swipe-gestures';
import AppBackground from '../components/AppBackground';
import Button from '../components/Button';
import { Player } from '@react-native-community/audio-toolkit';

class AboutProgramScreen extends React.Component{
  state = {
    songPlaying: ''
  }

  player = new Player();

  createPlayer = (fileName) => {
    this.player = new Player(fileName, {
      autoDestroy: false,
      continuesToPlayInBackground: true,
    });
    this.player.looping = true;
    this.player.volume = .7;
  }
 
  play = (fileName) => {
    if(this.player.canStop){
      this.stop();
    }
    this.createPlayer(fileName);
    this.player.play();
  }

  stop = () => {
    this.player.stop();  
  }
  render(){
    return (
      <GestureRecognizer onSwipeRight={() => this.props.navigation.navigate('DreamsList')} style={{flex: 1}}>
        <AppBackground>
          <Button onPress={() => {
            // navigation.navigate('AboutUs')
            this.setState({ songPlaying: 'Pennis' })
            this.play('sound1');
            }}>naivebeam</Button>
            <Button style={{marginVertical: 100}}onPress ={() => this.play('sound2')}>song #2</Button>
            <Button style={{marginVertical: 100}}onPress ={() => this.stop()}>destroy</Button>
            <Text style={{marginVertical: 100}}onPress ={() => console.log()}>{this.state.songPlaying}</Text>
        </AppBackground>
      </GestureRecognizer>    
    );
  }
};

const styles = StyleSheet.create({});

export default AboutProgramScreen;