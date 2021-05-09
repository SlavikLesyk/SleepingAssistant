import {
  TOGGLE_ALARM,
  ADD_ALARM,
  DELETE_ALARM,
  OPEN_ALARM_PROPS,
  ACTIVATE_DAY,
  CHANGE_FALL_ASLEEP_TIME,
  ADD_DREAM_NOTE, 
  DELETE_DREAM_NOTE,
  EDIT_DREAM_NOTE,
  SET_CURRENT_ALARM_HOURS,
  SET_CURRENT_ALARM_MINUTES,
} from './types';

export const toggleAlarm = id => {
  return{
    type: TOGGLE_ALARM,
    payload: id
  };
};

export const addAlarm = time => {
  return {
    type: ADD_ALARM,
    payload: time 
  };
};

export const deleteAlarm = id => {
  return {
    type: DELETE_ALARM,
    payload: id
  };
};

export const openAlarmProps = id => {
  return {
    type: OPEN_ALARM_PROPS,
    payload: id
  }
}

export const activateDay = (id, index) => { 
  return {
    type: ACTIVATE_DAY,
    payload: { id, index }
  }
}

export const changeFallAsleepTime = time => {
  return { 
    type: CHANGE_FALL_ASLEEP_TIME,
    payload: time
  }
}

export const addNewDream = dream => {
  return {
    type: ADD_DREAM_NOTE,
    payload: dream
  }
}

export const editDream = dream => {
  return {
    type: EDIT_DREAM_NOTE,
    payload: dream
  }
}

export const deleteDream = id => {
  return { 
    type: DELETE_DREAM_NOTE,
    payload: id
  }
}

export const setCurrentAlarmHours = value => {
  return {
    type: SET_CURRENT_ALARM_HOURS,
    payload: value 
  }
}

export const setCurrentAlarmMinutes = value => {
  console.log(value)
  return {
    type: SET_CURRENT_ALARM_MINUTES,
    payload: value 
  }
}