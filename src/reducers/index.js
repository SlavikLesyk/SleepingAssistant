import { combineReducers } from 'redux';
import alarmListReducer from './alarmListReducer';
import fallAsleepTime from './fallAsleepTimeReducer'


export default combineReducers({
  alarms: alarmListReducer,
  fallAsleepTime: fallAsleepTime,
})