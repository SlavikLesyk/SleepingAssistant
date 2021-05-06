import  React from 'react';
import { View, StyleSheet, FlatList, TouchableHighlight, ScrollView } from 'react-native';
import { Player } from '@react-native-community/audio-toolkit';
import GestureRecognizer from '../utility/swipe-gestures';
import AppBackground from '../components/AppBackground';
import AppText from '../components/AppText';
import AppInput from '../components/AppInput';
import Button from '../components/Button';
import { BG_COLOR_COMPONENTS, windowHeight } from '../Constants';

const sounds = [
  {
    id: '1',
    path: 'sound1.mp3',
    title: 'suck my dick',
    author: 'astral lizard',
  },
  {
    id: '2',
    path: 'sound2.mp3',
    title: 'secret forest',
    author: 'astral snake',
  },
  {
    id: '3',
    path: 'sound3.mp3',
    title: 'lsd lizard',
    author: 'funny lizard',
  },
  {
    id: '4',
    path: 'sound4.mp3',
    title: 'fucking 2020',
    author: 'slow lizard',
  },
  {
    id: '5',
    path: 'sound5.mp3',
    title: 'dreaming snake',
    author: 'astral dog',
  }
];

class PlaylistScreen extends React.Component {
  state = {
    currentSound: null,
    volume: 1,
    fadeOutTime: '10',
  }

  player = new Player();
  startingVolume = 1; 
  volume = 1;

  fadeOutTimer = null;
  fadeOutTimerStart = null; 
 
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
    this.player.play(() => this.startFadeOut(this.state.fadeOutTime));

  }

  stop = () => {
    this.player.stop();  
    clearTimeout(this.fadeOutTimerStart);
    clearTimeout(this.fadeOutTimer);
  }

  
  fadeOut = (min) => {
    this.volume -= .05 * this.startingVolume;
    if(this.volume >= 0){
      this.player.volume = this.volume;
      this.fadeOutTimer = setTimeout(this.fadeOut, .02 * min * 1000, min);
    } else {
      this.stop();
      this.setState({currentSound: null});
    }
  }

  startFadeOut = (min) => {
    console.log('start')
    this.volume = 1;
    this.player.volume = this.volume;
    clearTimeout(this.fadeOutTimerStart);
    clearTimeout(this.fadeOutTimer);
    this.fadeOutTimerStart = setTimeout(this.fadeOut, .82 * min * 1000, min );
  }

  renderList = () => sounds.map(sound => {
    return (
      <View style={styles.soundsItem} key={sound.title}>
        <Button onPress={() => {
          this.setState({currentSound: sound}); 
          this.play(sound.path);
        }}>
          {sound.title}
        </Button>
      </View>
    );
  });

  render(){
    return (
      <GestureRecognizer 
        onSwipeLeft={() => this.props.navigation.navigate('DreamsList')}
        onSwipeRight={() => this.props.navigation.navigate('Alarm')}
        style={{flex: 1}}
      >
        <AppBackground>
          <View style={styles.container}>  
            <ScrollView style={styles.soundsList}>
              {this.renderList()}
            </ScrollView>
            <View style={styles.soundsControl}>
              <AppText style={[styles.copyright, {opacity: this.state.currentSound ? 1 : 0}]}>@ by {this.state.currentSound ? this.state.currentSound.author : null}</AppText>
              <Button onPress={() => {
                this.stop();
                this.setState({currentSound: null});
              }}>silence</Button>
              <View style={styles.fadeOutPanel}>
                <AppText>fade out in:</AppText>
                <AppInput 
                  value={this.state.fadeOutTime} 
                  onFocus={() => this.setState({fadeOutTime: ""})}
                  onChangeText={value => this.setState({fadeOutTime: value.replace(/[^0-9]{0,2}/g, '')})}
                  onBlur={() => {
                    this.state.isLoaded ? this.startFadeOut(this.state.fadeOutTime) : null
                    this.setState( prevState => prevState.fadeOutTime && !prevState.fadeOutTime == '0' ? {fadeOutTime: prevState.fadeOutTime} : {fadeOutTime: '1'})
                  }}
                  keyboardType='number-pad' 
                />
                <AppText>min</AppText>
                </View>
              </View>
          </View>
        </AppBackground>
      </GestureRecognizer>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },  
  soundsList: {
    height: windowHeight * .7
  },
  soundsControl: {
    height: windowHeight * .3
  },
  soundsItem: {
    height: windowHeight * .11,
    marginVertical: windowHeight * .012,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: BG_COLOR_COMPONENTS,
    paddingHorizontal: 10
  },
  fadeOutPanel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  copyright:{
    alignSelf: 'center'
  }
});

export default PlaylistScreen;