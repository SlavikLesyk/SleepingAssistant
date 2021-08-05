/**
 * @format
 */

import PushNotification from 'react-native-push-notification';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {updateNotification} from './src/notification/pushNotification';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    if(notification.action === 'deny'){
      updateNotification();
    }
  },

  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);
