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
  console.log(oldTime);

  let newTime = oldTime - minutesToAdd;
  console.log('prev',newTime)
  newTime = newTime < 0 ? newTime + 1440 : newTime;
  console.log(newTime)
  const hours = Math.trunc(newTime / 60);
  const minutes = newTime - hours * 60;
  return `${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes
  }`;
};

export const calculateRecommendTime = (time, fallingSleepTime) => {
  return {
    recommend4Phase: addMinutes(time, fallingSleepTime + FOURTH_PHASE),
    recommend5Phase: addMinutes(time, fallingSleepTime + FIFTH_PHASE),
    recommend6Phase: addMinutes(time, fallingSleepTime + SIXTH_PHASE),
  };
};
