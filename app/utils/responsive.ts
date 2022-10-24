import {AppDims} from '@utils/constant';
import {Platform, StatusBar} from 'react-native';

/**
 * Responsive by width screen. (Image Size)
 */
const scale = (size: number) => {
  return (AppDims.width / AppDims.DESIGN_WIDTH) * size;
};

/**
 * Responsive by height screen.
 */
const verticalScale = (size: number) => {
  return (AppDims.height / AppDims.DESIGN_HEIGHT) * size;
};

/**
 * @alias Responsive for padding - margin - fontSize.
 */
const moderateScale = (size: number, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};

const fontScale = (size: number, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};

export const getSize = {
  m: moderateScale,
  s: scale,
  v: verticalScale,
  font: fontScale,
};

export function isIphoneX() {
  const {height: _height, width: _width} = AppDims;

  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (_height === 780 ||
      _width === 780 ||
      _height === 812 ||
      _width === 812 ||
      _height === 844 ||
      _width === 844 ||
      _height === 896 ||
      _width === 896 ||
      _height === 926 ||
      _width === 926)
  );
}

export const ifIphoneX = (
  iphoneXStyle: number,
  regularStyle: number,
): number => {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
};

export function getStatusBarHeight(safe?: number) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0,
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}
