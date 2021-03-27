import  React  from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import GestureRecognizer from '../utility/swipe-gestures';
// import { Audio } from 'expo-av';
// import styled from 'styled-components/native';
import AppBackground from '../components/AppBackground';
import AppText from '../components/AppText';
import AppInput from '../components/AppInput';
import Button from '../components/Button';
import { BG_COLOR_COMPONENTS, windowHeight } from '../Constants';

// const sound = new Audio.Sound();

// const Container = styled.View`
//   flex: 1;
// `;

// const SoundsList = styled.ScrollView`
//   flex: 7;
// `
// const SoundsControl = styled.View`
//   flex: 3;
// `
// const SoundsItem = styled.View`
//   height: ${windowHeight * .11}px;
//   marginVertical: ${windowHeight * .012}px;
//   justify-content: center;
//   align-items: flex-start;
//   background: rgba(5, 49, 102, .7);
//   paddingHorizontal: 10px;
// `

// const FadeOutPanel = styled.View`
//   flex: 1;
//   flex-direction: row;
//   align-items: center;
//   justify-content: flex-start;
// `

// class PlaylistScreen extends React.Component {
//   state = {
//     sounds: [
//       {
//         id: '1',
//         title: 'suck my dick',
//         author: 'astral lizard',
//       },
//       {
//         id: '2',
//         title: 'secret forest',
//         author: 'astral snake',
//       },
//       {
//         id: '3',
//         title: 'lsd lizard',
//         author: 'funny lizard',
//       },
//       {
//         id: '4',
//         title: 'fucking 2020',
//         author: 'slow lizard',
//       },
//       {
//         id: '5',
//         title: 'dreaming snake',
//         author: 'astral dog',
//       }
//     ],
//     sound: null,
//     fadeOutTime: '30',
//     isLoaded: false
//   }

//   fadeOutTimer = null;
//   fadeOutTimerStart = null;
//   currentVolume = 1;
//   isTimeOn = false;

//   _onPlaybackStatusUpdate = playbackStatus => {
//     if (!playbackStatus.isLoaded) {
//       this.setState({ isLoaded: false })
      
//     } else {
//       this.setState({ isLoaded: true})
//     }
//   };

//   playSound1 = async () => {
//     await sound.unloadAsync();
//     this.setState({sound: this.state.sounds[0]});
//     await sound.loadAsync(require('../../assets/sounds/calming-music-1.mp3'));
//     await sound.setIsLoopingAsync(true);    
//     await sound.playAsync()
//     this.startFadeOut(this.state.fadeOutTime);
//   }

//   playSound2 = async () => {
//     await sound.unloadAsync();
//     this.setState({sound: this.state.sounds[1]});
//     await sound.loadAsync(require('../../assets/sounds/calming-music-2.mp3'));
//     await sound.setIsLoopingAsync(true);
//     await sound.playAsync();
//     this.startFadeOut(this.state.fadeOutTime);
//   }

//   playSound3 = async () => {
//     await sound.unloadAsync();
//     this.setState({sound: this.state.sounds[2]});
//     await sound.loadAsync(require('../../assets/sounds/calming-music-3.mp3'));
//     await sound.setIsLoopingAsync(true);
//     await sound.playAsync();
//     this.startFadeOut(this.state.fadeOutTime);
//   }

//   playSound4 = async () => {
//     await sound.unloadAsync();
//     this.setState({sound: this.state.sounds[3]});
//     await sound.loadAsync(require('../../assets/sounds/calming-music-4.mp3'));
//     await sound.setIsLoopingAsync(true);
//     await sound.playAsync();
//     this.startFadeOut(this.state.fadeOutTime);
//   }

//   playSound5 = async () => {
//     await sound.unloadAsync();
//     this.setState({sound: this.state.sounds[4]});
//     await sound.loadAsync(require('../../assets/sounds/calming-music-5.mp3'));
//     await sound.setIsLoopingAsync(true);
//     await sound.playAsync();
//     this.startFadeOut(this.state.fadeOutTime);
//   }

//   fadeOut = (min) => {
//     this.currentVolume -= .05;
//     if(this.currentVolume >= 0){
//       console.log(this.currentVolume);
//       console.log(.02 * min * 1000)
//       sound.setVolumeAsync(this.currentVolume)
//       this.fadeOutTimer = setTimeout(this.fadeOut, .02 * min * 1000, min);
//     } else {
//       sound.unloadAsync();
//       this.setState({sound: null});
//     }
//   }

//   startFadeOut = (min) => {
//     this.currentVolume = 1;
//     sound.setVolumeAsync(this.currentVolume);
//     clearTimeout(this.fadeOutTimerStart);
//     clearTimeout(this.fadeOutTimer);
//     this.fadeOutTimerStart = setTimeout(this.fadeOut, .82 * min * 1000, min );
//   }

//   silence = () => {
//     clearTimeout(this.fadeOutTimerStart);
//     clearTimeout(this.fadeOutTimer);
//     this.setState({sound: null});
//     sound.unloadAsync();
//   } 

//   componentDidMount() {
//     sound.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);  
//   }

//   renderList = () => this.state.sounds.map(({id, title}) => {
//       return (
//         <SoundsItem key={id + title}>
//           <Button onPress = {this[`playSound${id}`]}>
//             {title}
//           </Button>
//         </SoundsItem>
//       );
//     });

//   render() {

//     return (
//       <GestureRecognizer 
//         onSwipeLeft={() => this.props.navigation.navigate('DreamsList')}
//         onSwipeRight={() => this.props.navigation.navigate('Alarm')}
//         style={{flex: 1}}>
//         <AppBackground>
//           <Container>
//             <SoundsList>
//               {this.renderList()}
//             </SoundsList>
//             <SoundsControl>
//               <AppText style={[styles.copyright, {opacity: this.state.sound ? 1 : 0}]}>@ by {this.state.sound ? this.state.sound.author : null}</AppText>
//               <Button onPress={this.silence}>silence</Button>
//               <FadeOutPanel>
//                 <AppText>fade out in:</AppText>
//                 <AppInput 
//                   value={this.state.fadeOutTime} 
//                   onFocus={() => this.setState({fadeOutTime: ""})}
//                   onChangeText={value => this.setState({fadeOutTime: value.replace(/[^0-9]{0,2}/g, '')})}
//                   onBlur={() => {
//                     this.state.isLoaded ? this.startFadeOut(this.state.fadeOutTime) : null
//                     this.setState( prevState => prevState.fadeOutTime && !prevState.fadeOutTime == '0' ? {fadeOutTime: prevState.fadeOutTime} : {fadeOutTime: '1'})
//                   }}
//                   keyboardType='number-pad' 
//                 />
//                 <AppText>min</AppText>
//               </FadeOutPanel>
//             </SoundsControl>
//           </Container>
//         </AppBackground>
//       </GestureRecognizer>
//     );
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },  
//   soundsList: {
//     flex: 7
//   },
//   SoundsControl: {
//     flex: 3
//   },
//   soundsItem: {
//     height: windowHeight * .11,
//     marginVertical: windowHeight * .012,
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     backgroundColor: BG_COLOR_COMPONENTS,
//     paddingHorizontal: 10
//   },
//   fadeOutPanel: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start'
//   },
//   copyright:{
//     alignSelf: 'center'
//   }
// });

const PlaylistScreen = () => {
  return <View></View>
}
export default PlaylistScreen;