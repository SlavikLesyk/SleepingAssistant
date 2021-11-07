import { CHANGE_FALL_ASLEEP_TIME } from '../actions/types';

export default (state = 20, action) => {
  switch(action.type){
    case CHANGE_FALL_ASLEEP_TIME:
      return action.payload;
    default: 
      return state;
  }
}