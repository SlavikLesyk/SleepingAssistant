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
    console.log('NOTIFICATION:', notification.data.alarmId);
    if (notification.action === 'Deny') {
      updateNotification(notification.data.alarmId);
    }
  },

  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);
