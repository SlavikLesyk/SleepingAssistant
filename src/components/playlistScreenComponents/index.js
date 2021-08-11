import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import Button from '../Button';
import AppText from '../AppText';
import AppInput from '../AppInput';
import TrackPlayer, {
  useTrackPlayerEvents,
  State,
  Event,
  RepeatMode,
} from 'react-native-track-player';
import {windowHeight, BG_COLOR_COMPONENTS} from '../../Constants';

export default function PlaylistComponents({navigation}) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const tracks = [
    {
      url: require('../../../assets/sounds/music1.mp3'),
      title: 'Strange Kid',
      artist: 'astral lizard',
    },
    {
      url: require('../../../assets/sounds/music2.mp3'),
      title: 'Crying Cat',
      artist: 'astral snake',
    },
    {
      url: require('../../../assets/sounds/music3.mp3'),
      title: 'Drunk Man',
      artist: 'funny lizard',
    },
    {
      url: require('../../../assets/sounds/music4.mp3'),
      title: 'Psycho Lizard',
      artist: 'slow lizard',
    },
    {
      url: require('../../../assets/sounds/music5.mp3'),
      title: 'Immortal Killer',
      artist: 'astral dog',
    },
  ];

  const createPlayer = async () => {
    await TrackPlayer.setupPlayer({});
  };

  useEffect(() => {
    createPlayer();
  }, []);

  useTrackPlayerEvents([Event.PlaybackQueueEnded], async event => {
    console.log(event);
    setCurrentTrack(null);
  });

  const addNewTrack = async track => {
    await TrackPlayer.add(track);
    setCurrentTrack(track);
  };

  const playTrack = async track => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      await TrackPlayer.reset();
      await addNewTrack(track);
      await TrackPlayer.play();
    } else {
      await addNewTrack(track);
      await TrackPlayer.play();
    }
  };

  renderList = () =>
    tracks.map(track => {
      return (
        <View style={styles.soundsItem} key={track.title}>
          <Button onPress={() => playTrack(track)}>{track.title}</Button>
        </View>
      );
    });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.soundsList}>{renderList()}</ScrollView>
      <View style={styles.soundsControl}>
        <AppText style={[styles.copyright, {opacity: currentTrack ? 1 : 0}]}>
          @ by {currentTrack ? currentTrack.artist : null}
        </AppText>
        <Button onPress={TrackPlayer.reset}>silence</Button>
        {/* <View style={styles.fadeOutPanel}>
          <AppText>fade out in:</AppText>
          <AppInput
            value={this.state.fadeOutTime}
            onFocus={() => this.setState({fadeOutTime: ''})}
            onChangeText={value =>
              this.setState({fadeOutTime: value.replace(/[^0-9]{0,2}/g, '')})
            }
            onBlur={() => {
              this.state.isLoaded
                ? this.startFadeOut(this.state.fadeOutTime)
                : null;
              this.setState(prevState =>
                prevState.fadeOutTime && !prevState.fadeOutTime == '0'
                  ? {fadeOutTime: prevState.fadeOutTime}
                  : {fadeOutTime: '1'},
              );
            }}
            keyboardType="number-pad"
          />
          <AppText>min</AppText>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  soundsList: {
    height: windowHeight * 0.7,
  },
  soundsControl: {
    height: windowHeight * 0.3,
  },
  soundsItem: {
    height: windowHeight * 0.11,
    marginVertical: windowHeight * 0.012,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: BG_COLOR_COMPONENTS,
    paddingHorizontal: 10,
  },
  fadeOutPanel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  copyright: {
    alignSelf: 'center',
  },
});
