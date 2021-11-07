import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import HomeScreen from './src/screens/HomeScreen';
import AlarmListScreen from './src/screens/AlarmListScreen';
import PlaylistScreen from './src/screens/PlaylistScreen';
import AboutProgramScreen from './src/screens/AboutProgramScreen';
import AboutUsScreen from './src/screens/AboutUsScreen';
import DreamListScreen from './src/screens/DreamListScreen';
import DreamNoteScreen from './src/screens/DreamNoteScreen';
import PersonalizationScreen from './src/screens/PersonalizationScreen';
import StartingScreen from './src/screens/StartingScreen';
import reduxStore from './src/store/store';
import PushNotification, {Importance} from 'react-native-push-notification';
import TrackPlayer from 'react-native-track-player';

TrackPlayer.registerPlaybackService(() => require('./service'));

enableScreens();

const Stack = createNativeStackNavigator();

const App = () => {
  const createChannel = () =>
    PushNotification.createChannel({
      channelId: 'soundAlarm',
      channelName: 'notification',
      soundName: 'bell1.mp3',
      importance: Importance.HIGH,
      vibrate: true,
    });

  useEffect(() => {
    createChannel();
  }, []);

  const {store, persistor} = reduxStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="DreamsList"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Alarm" component={AlarmListScreen} />
            <Stack.Screen name="Playlist" component={PlaylistScreen} />
            <Stack.Screen name="DreamsList" component={DreamListScreen} />
            <Stack.Screen name="DreamNote" component={DreamNoteScreen} />
            <Stack.Screen name="About" component={AboutProgramScreen} />
            <Stack.Screen name="AboutUs" component={AboutUsScreen} />
            <Stack.Screen
              name="Personalization"
              component={PersonalizationScreen}
            />
            <Stack.Screen name="Start" component={StartingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
