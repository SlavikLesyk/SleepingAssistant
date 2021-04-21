import { combineReducers } from 'redux';
import alarmListReducer from './alarmListReducer';
import fallAsleepTime from './fallAsleepTimeReducer';
import dreamsReducer from './dreamsReducer';


export default combineReducers({
  alarms: alarmListReducer,
  fallAsleepTime: fallAsleepTime,
  dreams: dreamsReducer,
})