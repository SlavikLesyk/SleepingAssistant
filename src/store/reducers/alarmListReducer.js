import {
  ADD_ALARM,
  DELETE_ALARM,
  TOGGLE_ALARM,
  EDIT_ALARM,
  CHANGE_NAME,
  TOGGLE_REPEAT,
  CHANGE_FALL_ASLEEP_TIME,
} from '../actions/types';

import {updateNotification} from '../../notification/pushNotification';
import {calculateRecommendTime} from '../../utility/calculateRecommendTime';

const createAlarm = ({time}, state) => {
  const id = state.alarmsList.length
    ? state.alarmsList[state.alarmsList.length - 1].id + 1
    : 1;
  const recommendTime = calculateRecommendTime(time, state.fallAsleepTime);
  return {
    id: id,
    time: time,
    isOn: true,
    repeat: false,
    showProps: false,
    name: '',
    ...recommendTime,
  };
};

const INITIAL_STATE = {
  alarmsList: [],
  fallAsleepTime: 15,
};

export default (state = INITIAL_STATE, action) => {
  let newState = state;

  switch (action.type) {
    case CHANGE_FALL_ASLEEP_TIME:
      return {
        ...state,
        alarmsList: state.alarmsList.map(item => {
          const recommendTime = calculateRecommendTime(
            item.time,
            action.payload,
          );
          return {...item, ...recommendTime};
        }),
        fallAsleepTime: action.payload,
      };

    case ADD_ALARM:
      newState = {
        ...state,
        alarmsList: [...state.alarmsList, createAlarm(action.payload, state)],
      };
      updateNotification(newState.alarmsList);

      return newState;

    case EDIT_ALARM:
      const recommendTime = calculateRecommendTime(
        action.payload.time,
        state.fallAsleepTime,
      );
      newState = {
        ...state,
        alarmsList: state.alarmsList.map(item => {
          return {
            ...item,
            time:
              item.id === action.payload.id ? action.payload.time : item.time,
            ...recommendTime,
          };
        }),
      };
      updateNotification(newState.alarmsList);

      return newState;

    case DELETE_ALARM:
      newState = {
        ...state,
        alarmsList: state.alarmsList.filter(item => item.id !== action.payload),
      };
      updateNotification(newState.alarmsList);

      return newState;

    case TOGGLE_ALARM:
      newState = {
        ...state,
        alarmsList: state.alarmsList.map(item => {
          return {
            ...item,
            isOn: item.id === action.payload ? !item.isOn : item.isOn,
          };
        }),
      };
      updateNotification(newState.alarmsList);

      return newState;

    case TOGGLE_REPEAT:
      newState = {
        ...state,
        alarmsList: state.alarmsList.map(item => {
          return {
            ...item,
            repeat: item.id === action.payload ? !item.repeat : item.repeat,
          };
        }),
      };
      updateNotification(newState.alarmsList);

      return newState;

    case CHANGE_NAME:
      newState = {
        ...state,
        alarmsList: state.alarmsList.map(item => {
          return {
            ...item,
            name:
              item.id === action.payload.id ? action.payload.name : item.name,
          };
        }),
      };
      updateNotification(newState.alarmsList);

      return newState;

    default:
      return state;
  }
};
