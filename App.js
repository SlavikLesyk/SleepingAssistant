import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens, ScreenStackHeaderConfig } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { createStore } from 'redux';
import {Provider} from 'react-redux'; 
import HomeScreen from "./src/screens/HomeScreen";
import AlarmListScreen from './src/screens/AlarmListScreen';
import PlaylistScreen from './src/screens/PlaylistScreen';
import AboutProgramScreen from './src/screens/AboutProgramScreen';
import AboutUsScreen from './src/screens/AboutUsScreen';
import DreamListScreen from './src/screens/DreamListScreen';
import DreamNoteScreen from './src/screens/DreamNoteScreen';
import PersonalisationScreen from './src/screens/PersonalisationScreen'
import StartingScreen from './src/screens/StartingScreen';
import reducers from './src/reducers';

enableScreens();

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <Provider store = {createStore(reducers)}>
      <NavigationContainer>
        <Stack.Navigator  
          initialRouteName="Home" 
          screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Alarm" component={AlarmListScreen} />
          <Stack.Screen name="Playlists" component={PlaylistScreen} />
          <Stack.Screen name="DreamsList" component={DreamListScreen} />
          <Stack.Screen name="DreamNote" component={DreamNoteScreen} />
          <Stack.Screen name="About" component={AboutProgramScreen} />
          <Stack.Screen name="AboutUs" component={AboutUsScreen} />
          <Stack.Screen name="Personalisation" component={PersonalisationScreen} />
          <Stack.Screen name="Start" component={StartingScreen} />
        </Stack.Navigator>
      </NavigationContainer> 
    </Provider>

  );
};

export default App;