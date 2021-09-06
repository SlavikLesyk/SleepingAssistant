import { Dimensions, StatusBar } from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

export const windowHeight = HEIGHT - STATUS_BAR_HEIGHT;
export const windowWidth = WIDTH;

export const COLOR_MAIN = '#7ab6e8';
export const COLOR_SECONDARY = 'rgb(255, 255, 255)';

export const BG_FIRST_COLOR = '#032250';
export const BG_SECOND_COLOR = '#010f23';
export const BG_COLOR_COMPONENTS = 'rgba(4, 44, 96, .4)';
export const BG_COLOR_CIRCLES = 'rgb(3, 21, 56)';