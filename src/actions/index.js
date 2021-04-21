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

// export const addNewDream = id => {
//   return {
//     type:
//     payload: id
//   }
// }

// export const 
