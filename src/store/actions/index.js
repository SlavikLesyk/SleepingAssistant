import {
  TOGGLE_ALARM,
  ADD_ALARM,
  EDIT_ALARM,
  DELETE_ALARM,
  OPEN_ALARM_PROPS,
  TOGGLE_REPEAT,
  CHANGE_NAME,
  CHANGE_FALL_ASLEEP_TIME,
  ADD_DREAM_NOTE,
  DELETE_DREAM_NOTE,
  EDIT_DREAM_NOTE,
  SET_CURRENT_ALARM_HOURS,
  SET_CURRENT_ALARM_MINUTES,
} from './types';

export const toggleAlarm = id => {
  console.log('action', id)
  return {
    type: TOGGLE_ALARM,
    payload: id,
  };
};

export const toggleRepeat = id => {
  return {
    type: TOGGLE_REPEAT,
    payload: id,
  };
};

export const addAlarm = alarmObj => {
  return {
    type: ADD_ALARM,
    payload: alarmObj,
  };
};

export const editAlarm = (id, time) => {
  return {
    type: EDIT_ALARM,
    payload: {id, time},
  };
};

export const deleteAlarm = id => {
  return {
    type: DELETE_ALARM,
    payload: id,
  };
};

export const openAlarmProps = id => {
  return {
    type: OPEN_ALARM_PROPS,
    payload: id,
  };
};

// export const activateDay = (id, index) => {
//   return {
//     type: ACTIVATE_DAY,
//     payload: { id, index }
//   }
// }

export const changeName = (id, name) => {
  return {
    type: CHANGE_NAME,
    payload: {id, name},
  };
};

export const changeFallAsleepTime = time => {
  return {
    type: CHANGE_FALL_ASLEEP_TIME,
    payload: time,
  };
};

export const addNewDream = dream => {
  return {
    type: ADD_DREAM_NOTE,
    payload: dream,
  };
};

export const editDream = dream => {
  return {
    type: EDIT_DREAM_NOTE,
    payload: dream,
  };
};

export const deleteDream = id => {
  return {
    type: DELETE_DREAM_NOTE,
    payload: id,
  };
};

export const setCurrentAlarmHours = value => {
  console.log(value);
  return {
    type: SET_CURRENT_ALARM_HOURS,
    payload: value,
  };
};

export const setCurrentAlarmMinutes = value => {
  console.log(value);
  return {
    type: SET_CURRENT_ALARM_MINUTES,
    payload: value,
  };
};
