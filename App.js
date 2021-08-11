import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import HomeScreen from './src/screens/HomeScreen';
import AlarmListScreen from './src/screens/AlarmListScreen';
import PlaylistScreen from './src/screens/PlaylistScreen';
import AboutProgramScreen from './src/screens/AboutProgramScreen';
import AboutUsScreen from './src/screens/AboutUsScreen';
import DreamListScreen from './src/screens/DreamListScreen';
import DreamNoteScreen from './src/components/dreamNotesScreenComponents/DreamNoteScreen';
import PersonalizationScreen from './src/screens/PersonalizationScreen';
import StartingScreen from './src/screens/StartingScreen';
import reducers from './src/reducers';
import PushNotification, {Importance} from 'react-native-push-notification';

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

  return (
    <Provider store={createStore(reducers)}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Playlist"
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
    </Provider>
  );
};

export default App;
