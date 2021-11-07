import PushNotification from 'react-native-push-notification';
import {notificationMessages} from './notificationText';
import moment from 'moment';
import {getData, editData} from '../utility/asyncStorageHandler';
import {Platform} from 'react-native';

const SNOOZE_TIME = 5;
const REPEAT = 5;
const emptyProperty = Platform.select({ios: '', android: null});

// const multiplyNotification = (time, title, message) => {
//   for (let i = 0; i < REPEAT; i++) {
//     const snoozeTime = SNOOZE_TIME * i;
//     console.log(time)
//     handleScheduleNotificationSnooze(time, snoozeTime);
//   }
// };

// const createDateObjSnooze = (time, snooze) => {
//   const hours = time.split(':')[0];
//   const minutes = time.split(':')[1];
//   const alarmDate = moment()
//     .hours(hours)
//     .minutes(minutes)
//     .startOf('minute')
//     .format();
//   const checkedDate = moment().isAfter(alarmDate)
//     ? moment(alarmDate).add(1, 'days').format()
//     : alarmDate;
//   return new Date(moment(checkedDate).add(snooze, 'minutes').format());
// };

// const createDateObj = time => {
//   const hours = time.split(':')[0];
//   const minutes = time.split(':')[1];
//   const alarmDate = moment()
//     .hours(hours)
//     .minutes(minutes)
//     .startOf('minute')
//     .format();
//   return new Date(
//     moment().isAfter(alarmDate)
//       ? moment(alarmDate).add(1, 'days').format()
//       : alarmDate,
//   );
// };

// const randomArraysElement = arr => Math.floor(Math.random() * arr.length);
// const getNotificationMessage = () =>
//   notificationMessages[randomArraysElement(notificationMessages)];
// const getNotificationTitle = () =>
//   notificationTitles[randomArraysElement(notificationTitles)];

// const handleScheduleNotification = (id, time, title, message) => {
//   const notificationTitle = title ? title : getNotificationTitle();
//   const notificationMessage = message ? message : getNotificationMessage();

//   const date = createDateObj(time);
//   console.log('notification: ', date);
//   PushNotification.localNotificationSchedule({
//     id: id,
//     title: notificationTitle,
//     message: notificationMessage,
//     playSound: true,
//     date: date,
//     channelId: 'soundAlarm',
//     soundName: 'bell1.mp3',
//     actions: ['snooze', 'deny'],
//     priority: 'max',
//     visibility: 'public',
//     allowWhileIdle: true,
//     vibrate: true,
//     vibration: 300,
//   });
// };

// const handleScheduleNotificationSnooze = (time, snooze, title, message) => {
//   const notificationTitle = title ? title : getNotificationTitle();
//   const notificationMessage = message ? message : getNotificationMessage();
//   const date = createDateObjSnooze(time, snooze);

//   console.log('notification: ', date);
//   PushNotification.localNotificationSchedule({
//     title: notificationTitle,
//     message: notificationMessage,
//     playSound: true,
//     date: date,
//     channelId: 'soundAlarm',
//     soundName: 'bell1.mp3',
//     actions: ['snooze', 'deny'],
//     priority: 'max',
//     visibility: 'public',
//     allowWhileIdle: true,
//     vibrate: true,
//     vibration: 300,
//   });
// };

// const handleCancel = async () => {
//   PushNotification.cancelAllLocalNotifications();
//   const alarmList = await getData('alarmList');
//   alarmList.map(item => item.isOn ? multiplyNotification(item.time) : null);
//   console.log(alarmList)
// };

const randomArraysElement = arr => Math.floor(Math.random() * arr.length);
const getNotificationMessage = () =>
  notificationMessages[randomArraysElement(notificationMessages)];

const createDateObj = (time, snooze) => {
  const hours = time.split(':')[0];
  const minutes = time.split(':')[1];
  const alarmDate = moment()
    .hours(hours)
    .minutes(minutes)
    .startOf('minute')
    .format();
  const checkedDate = moment().isAfter(alarmDate)
    ? moment(alarmDate).add(1, 'days').format()
    : alarmDate;
  return new Date(moment(checkedDate).add(snooze, 'minutes').format());
};

const createScheduleNotification = (
  id,
  time,
  snooze,
  repeat,
  title,
  message,
) => {
  const date = createDateObj(time, snooze);
  PushNotification.localNotificationSchedule({
    title: title,
    message: message ? message : getNotificationMessage(),
    userInfo: {
      alarmId: id,
    },
    playSound: true,
    date: date,
    channelId: 'soundAlarm',
    soundName: 'bell1.mp3',
    actions: ['Deny'],
    priority: 'max',
    visibility: 'public',
    allowWhileIdle: true,
    vibrate: true,
    vibration: 1300,
    repeatType: repeat ? 'day' : emptyProperty,
  });
};

const multiplyNotification = (id, time, repeat, title, message) => {
  for (let i = 0; i < REPEAT; i++) {
    const snoozeTime = SNOOZE_TIME * i;
    createScheduleNotification(id, time, snoozeTime, repeat, title, message);
  }
};

const updateNotification = async alarmList => {
  PushNotification.cancelAllLocalNotifications();

  alarmList.map(item => {
    if (item.isOn) {
      multiplyNotification(
        item.id,
        item.time,
        item.repeat,
        item.name ? item.name : 'Alarm',
      );
    }
  });
};

export {updateNotification};
