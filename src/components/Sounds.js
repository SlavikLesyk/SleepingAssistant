import { Audio } from 'expo-av';

const CalmingMusic1 = Audio.Sound.createAsync(
  require('../../assets/sounds/calming-music-1.mp3')
);

const CalmingMusic2 = Audio.Sound.createAsync(
  require('../../assets/sounds/calming-music-2.mp3')
);

const CalmingMusic3 = Audio.Sound.createAsync(
  require('../../assets/sounds/calming-music-3.mp3')
);

const CalmingMusic4 = Audio.Sound.createAsync(
  require('../../assets/sounds/calming-music-4.mp3')
);

const CalmingMusic5 = Audio.Sound.createAsync(
  require('../../assets/sounds/calming-music-5.mp3')
);

export { CalmingMusic1, CalmingMusic2, CalmingMusic3, CalmingMusic4, CalmingMusic5};

