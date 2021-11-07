import { SET_CURRENT_ALARM_HOURS, SET_CURRENT_ALARM_MINUTES } from '../actions/types';

export default (state = {hours: '00', minutes: '00'}, action) => {
  switch(action.type){
    case SET_CURRENT_ALARM_HOURS:
      return {
        ...state, 
        hours : action.payload
      }
      case SET_CURRENT_ALARM_MINUTES:
      return {
        ...state, 
        minutes : action.payload
      }
    default: 
      return state;
  }
}