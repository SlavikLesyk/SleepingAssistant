import { 
  ADD_DREAM_NOTE, 
  DELETE_DREAM_NOTE,
  EDIT_DREAM_NOTE
} from '../actions/types'
  
const INITIAL_STATE = [
  { 
    id: 1,
    title: "Big Dog Saw My Secret",
    note: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Quisque tempus, turpis sit amet dapibus dignissim, odio
              mi interdum arcu, sit amet ultricies nulla augue ac massa.
              Ut sollicitudin leo nibh, vitae luctus elit sagittis quis.
              Suspendisse aliquet quis libero tincidunt eleifend. Morbi
              commodo fringilla imperdiet. Mauris condimentum tempus
              quam vel tincidunt. In id mattis urna. Nullam erat nulla,
              rhoncus non ullamcorper in, mollis vitae justo. Sed pretium,
              massa id gravida mattis, diam elit fringilla massa, 
              efficitur sagittis nulla odio ut risus. Etiam in ullamcorper
              orci. Nulla gravida, nisl sit amet feugiat auctor, turpis dui
              maximus dui, convallis tristique enim urna et libero.`,
    time: 'Jan 1, 0'
  },
  { 
    id: 2,
    title: "Space, Astral & Boobs",
    note: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Quisque tempus, turpis sit amet dapibus dignissim, odio
              mi interdum arcu, sit amet ultricies nulla augue ac massa.
              Ut sollicitudin leo nibh, vitae luctus elit sagittis quis.
              Suspendisse aliquet quis libero tincidunt eleifend. Morbi
              commodo fringilla imperdiet. Mauris condimentum tempus
              quam vel tincidunt. In id mattis urna. Nullam erat nulla,
              rhoncus non ullamcorper in, mollis vitae justo. Sed pretium,
              massa id gravida mattis, diam elit fringilla massa, 
              efficitur sagittis nulla odio ut risus. Etiam in ullamcorper
              orci. Nulla gravida, nisl sit amet feugiat auctor, turpis dui
              maximus dui, convallis tristique enim urna et libero.`,
    time: 'Sep 67, 2345',
    name: 'name',
    days: [false, false, false, false, false, false, false]
  },
  { 
    id: 3,
    title: "Flying Rat Die In Haven AGAIN!!!",
    note: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Quisque tempus, turpis sit amet dapibus dignissim, odio
              mi interdum arcu, sit amet ultricies nulla augue ac massa.
              Ut sollicitudin leo nibh, vitae luctus elit sagittis quis.
              Suspendisse aliquet quis libero tincidunt eleifend. Morbi
              commodo fringilla imperdiet. Mauris condimentum tempus
              quam vel tincidunt. In id mattis urna. Nullam erat nulla,
              rhoncus non ullamcorper in, mollis vitae justo. Sed pretium,
              massa id gravida mattis, diam elit fringilla massa, 
              efficitur sagittis nulla odio ut risus. Etiam in ullamcorper
              orci. Nulla gravida, nisl sit amet feugiat auctor, turpis dui
              maximus dui, convallis tristique enim urna et libero.`,
    time: 'Aug 20, 500 B.C.',
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
    case ADD_DREAM_NOTE: 
      return [ ...state,  createDreamNote(action.payload, state) ];
    case EDIT_DREAM_NOTE: 
      return [ ...state,  editDreamNote(action.payload, state) ];
    case DELETE_DREAM_NOTE: 
      return state.filter(item => item.id !== action.payload);
    default: 
      return state;
  }
};
  