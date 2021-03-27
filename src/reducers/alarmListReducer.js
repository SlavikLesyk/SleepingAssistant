import { 
  ADD_ALARM, 
  DELETE_ALARM,
  OPEN_ALARM_PROPS,
  TOGGLE_ALARM,
  ACTIVATE_DAY,
} from '../actions/types'

const INITIAL_STATE = [
  { 
    id: 1,
    time: "15:00",
    isOn: true,
    showProps: false,
    name: 'name',
    days: [false, false, false, false, false, false, false]
  },
  { 
    id: 2,
    time: "13:30",
    isOn: true,
    showProps: true,
    name: 'name',
    days: [false, false, false, false, false, false, false]
  },
  { 
    id: 3,
    time: "15:21",
    isOn: true,
    showProps: false,
    name: 'name',
    days: [false, false, false, false, false, false, false]
  },
]

const createAlarm = (time, state) => {
  const id = state[0] ? state[state.length - 1].id + 1 : 1;
  return { 
    id: id,
    time: time,
    isOn: true,
    showProps: false,
    name: 'name',
    days: [false, false, false, false, false, false, false]
  }
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ADD_ALARM: 
      return [ ...state,  createAlarm(action.payload, state) ];
    case DELETE_ALARM: 
      return state.filter(item  => item.id !== action.payload);
    case OPEN_ALARM_PROPS: 
      return state.map(item => {
        return {...item, showProps: item.id === action.payload && item.showProps === false ? true : false }
      });
    case TOGGLE_ALARM: 
      return state.map(item => {
        return {...item, isOn: item.id === action.payload ? !item.isOn : item.isOn}
      });
    case ACTIVATE_DAY: 
      return state.map(item => {
        if(item.id === action.payload.id){
          return {...item, days: item.days.map((day, index) => {
            return index === action.payload.index ? !day: day;
          })};
        } else{
          return item;
        }
      });
    default: 
      return state;
  }
};
