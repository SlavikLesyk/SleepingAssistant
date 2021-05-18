import { Dimensions, StatusBar } from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

export const windowHeight = HEIGHT - STATUS_BAR_HEIGHT;
export const windowWidth = WIDTH;

export const COLOR_MAIN = '#2fffa2';
export const COLOR_SECONDARY = 'rgb(255, 255, 255)';

export const BG_FIRST_COLOR = '#310062';
export const BG_SECOND_COLOR = '#100316';
export const BG_COLOR_COMPONENTS = '#552d7b';