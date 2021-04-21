import { Dimensions, StatusBar } from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

export const windowHeight = HEIGHT - STATUS_BAR_HEIGHT;
export const windowWidth = WIDTH;

export const COLOR_MAIN = 'rgb(122, 183, 232)';
export const COLOR_SECONDARY = 'rgb(255, 255, 255)';

export const BG_FIRST_COLOR = 'rgb(6, 26, 72)';
export const BG_SECOND_COLOR = 'rgb(4, 65, 122)';
export const BG_COLOR_COMPONENTS = 'rgb(5, 49, 102)';