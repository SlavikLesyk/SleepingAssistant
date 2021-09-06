import AsyncStorage from '@react-native-async-storage/async-storage';

FOURTH_PHASE = 360;
FIFTH_PHASE = 450;
SIXTH_PHASE = 540;

const timeToMinutes = time => {
  const hours = Number(time.split(':')[0]);
  const minutes = Number(time.split(':')[1]);

  return hours * 60 + minutes;
};

const addMinutes = (time, minutesToAdd) => {
  const oldTime = timeToMinutes(time);
  let newTime = oldTime - minutesToAdd;
  newTime = newTime < 0 ? newTime : newTime + 1440;
  const hours = Math.trunc(newTime / 60);
  const minutes = newTime - hours * 60;
  return `${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes
  }`;
};

export const saveNewRecommendation = async time => {
  try {
    const jsonList = await AsyncStorage.getItem('alarmList');
    const list = jsonList ? JSON.parse(jsonList) : [];
    const newList = list.map(item => {
      return {
        ...item,
        recommend4Phase: addMinutes(item.time, +time + FOURTH_PHASE),
        recommend5Phase: addMinutes(item.time, +time + FIFTH_PHASE),
        recommend6Phase: addMinutes(item.time, +time + SIXTH_PHASE),
      };
    });

    await AsyncStorage.setItem('alarmList', JSON.stringify(newList));

    return newList;
  } catch (error) {
    console.log(error);
  }
};
