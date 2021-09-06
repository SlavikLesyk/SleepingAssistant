import React, {useState, useEffect} from 'react';
import DreamNoteEditScreen from './DreamNoteEditScreen';
import DreamNoteReadScreen from './DreamNoteReadScreen';

const DreamNotesComponents = ({navigation, route}) => {
  const {isNewDream, id} = route.params;

  const [editMode, setEditMode] = useState(isNewDream);
  const [needAdd, setNeedAdd] = useState(isNewDream);

  const editModeToggle = () => setEditMode(!editMode);

  const needAddOff = () => setNeedAdd(false);

  const render = () => {
    if (isNewDream) {
      return (
        <DreamNoteEditScreen
          needAdd={true}
          needAddOff={needAddOff}
          navigation={navigation}
          onChangeMode={editModeToggle}
          dream={dream}
        />
      );
    } else {
      if (editMode) {
        return (
          <DreamNoteEditScreen
            needAdd={true}
            needAddOff={needAddOff}
            navigation={navigation}
            onChangeMode={editModeToggle}
            dream={dream}
          />
        );
      } else {
        return <DreamNoteReadScreen dream={dream} onChangeMode={editModeToggle} />;
      }
    }
  };

  // return editMode ? (
  //   <DreamNoteEditScreen />
  // ) : (
  //   <DreamNoteReadScreen id={id} onChangeMode={editModeToggle} />
  // );
  return render();
};

export default DreamNotesComponents;
