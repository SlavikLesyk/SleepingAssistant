import {
  ADD_DREAM_NOTE,
  DELETE_DREAM_NOTE,
  EDIT_DREAM_NOTE
} from '../actions/types'

const INITIAL_STATE = [
  {
    id: 1,
    title: "Flowers Don`t Shed Tears",
    note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus, turpis sit amet dapibus dignissim, odiomi interdum arcu, sit amet ultricies nulla augue ac massa. Ut sollicitudin leo nibh, vitae luctus elit sagittis quis. Suspendisse aliquet quis libero tincidunt eleifend. Morbi commodo fringilla imperdiet. Mauris condimentum tempus quam vel tincidunt. In id mattis urna. Nullam erat nulla, rhoncus non ullamcorper in, mollis vitae justo. Sed pretium, massa id gravida mattis, diam elit fringilla massa, efficitur sagittis nulla odio ut risus. Etiam in ullamcorper orci. Nulla gravida, nisl sit amet feugiat auctor, turpis dui maximus dui, convallis tristique enim urna et libero.',
    time: 'Jan 1, 0'
  },
  {
    id: 2,
    title: "Ghosts Don`t Scream",
    note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus, turpis sit amet dapibus dignissim, odiomi interdum arcu, sit amet ultricies nulla augue ac massa. Ut sollicitudin leo nibh, vitae luctus elit sagittis quis. Suspendisse aliquet quis libero tincidunt eleifend. Morbi commodo fringilla imperdiet. Mauris condimentum tempus quam vel tincidunt. In id mattis urna. Nullam erat nulla, rhoncus non ullamcorper in, mollis vitae justo. Sed pretium, massa id gravida mattis, diam elit fringilla massa, efficitur sagittis nulla odio ut risus. Etiam in ullamcorper orci. Nulla gravida, nisl sit amet feugiat auctor, turpis dui maximus dui, convallis tristique enim urna et libero.',
    time: 'Sep 67, 2345',
  },
  {
    id: 3,
    title: "Holy Nights Don`t Shine Brightly",
    note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus, turpis sit amet dapibus dignissim, odiomi interdum arcu, sit amet ultricies nulla augue ac massa. Ut sollicitudin leo nibh, vitae luctus elit sagittis quis. Suspendisse aliquet quis libero tincidunt eleifend. Morbi commodo fringilla imperdiet. Mauris condimentum tempus quam vel tincidunt. In id mattis urna. Nullam erat nulla, rhoncus non ullamcorper in, mollis vitae justo. Sed pretium, massa id gravida mattis, diam elit fringilla massa, efficitur sagittis nulla odio ut risus. Etiam in ullamcorper orci. Nulla gravida, nisl sit amet feugiat auctor, turpis dui maximus dui, convallis tristique enim urna et libero.',
    time: 'Aug 20, 500 B.C.',
  },
  {
    id: 4,
    title: "Cats Don`t Laugh",
    note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus, turpis sit amet dapibus dignissim, odiomi interdum arcu, sit amet ultricies nulla augue ac massa. Ut sollicitudin leo nibh, vitae luctus elit sagittis quis. Suspendisse aliquet quis libero tincidunt eleifend. Morbi commodo fringilla imperdiet. Mauris condimentum tempus quam vel tincidunt. In id mattis urna. Nullam erat nulla, rhoncus non ullamcorper in, mollis vitae justo. Sed pretium, massa id gravida mattis, diam elit fringilla massa, efficitur sagittis nulla odio ut risus. Etiam in ullamcorper orci. Nulla gravida, nisl sit amet feugiat auctor, turpis dui maximus dui, convallis tristique enim urna et libero.',
    time: 'Aug 2, 5702 B.C.',
  },
  {
    id: 5,
    title: "Angels Don`t Cry",
    note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus, turpis sit amet dapibus dignissim, odiomi interdum arcu, sit amet ultricies nulla augue ac massa. Ut sollicitudin leo nibh, vitae luctus elit sagittis quis. Suspendisse aliquet quis libero tincidunt eleifend. Morbi commodo fringilla imperdiet. Mauris condimentum tempus quam vel tincidunt. In id mattis urna. Nullam erat nulla, rhoncus non ullamcorper in, mollis vitae justo. Sed pretium, massa id gravida mattis, diam elit fringilla massa, efficitur sagittis nulla odio ut risus. Etiam in ullamcorper orci. Nulla gravida, nisl sit amet feugiat auctor, turpis dui maximus dui, convallis tristique enim urna et libero.',
    time: 'Feb 76, 4545',
  },
  
]

const createDreamNote = (dream) => {
  return {
    id: dream.id,
    title: dream.title,
    note: dream.note,
    time: dream.time
  }
}



export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_DREAM_NOTE:
      return [...state, createDreamNote(action.payload, state)];
    case EDIT_DREAM_NOTE:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
    case DELETE_DREAM_NOTE:
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};
