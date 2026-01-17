import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (design was made for these dimensions)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

// Responsive width
export const wp = (percentage) => {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return PixelRatio.roundToNearestPixel(value);
};

// Responsive height
export const hp = (percentage) => {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return PixelRatio.roundToNearestPixel(value);
};

// Responsive font size
export const rf = (baseFontSize) => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = baseFontSize * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Scale dimensions proportionally
export const scale = (size) => {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
};

export const verticalScale = (size) => {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
};

export const moderateScale = (size, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};

export { SCREEN_WIDTH, SCREEN_HEIGHT };
