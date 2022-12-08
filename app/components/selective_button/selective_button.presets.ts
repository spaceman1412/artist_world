import {color, radius, spacing} from '@theme';
import {TextStyle, ViewStyle, StyleSheet, ImageStyle} from 'react-native';

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  padding: spacing[1],
  borderRadius: radius.ML,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
};

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[3],
  fontWeight: '500',
  textAlign: 'center',
  justifyContent: 'space-between',
};

const BASE_ICON: ImageStyle = {
  alignItems: 'center',

  width: 20,
  height: 20,
};

export const VIEW_STYLES = StyleSheet.create({
  primary: {
    ...BASE_VIEW,
    backgroundColor: color.palette.primaryOrange,
    borderColor: color.palette.primary,
  } as ViewStyle,

  outline: {
    ...BASE_VIEW,
    backgroundColor: color.transparent,
    borderColor: color.palette.secondary,
    borderWidth: 1,
  },
});

export const TEXT_STYLES = StyleSheet.create({
  primary: {
    ...BASE_TEXT,
    color: color.palette.white,
  },
  outline: {
    ...BASE_TEXT,
    color: color.palette.white,
  },
  buttonOff: {
    ...BASE_TEXT,
    color: color.palette.black,
  },
});

export const ICON_STYLES = StyleSheet.create({
  primary: {
    ...BASE_ICON,
    color: color.palette.white,
    tintColor: color.palette.white,
  },
  outline: {
    ...BASE_ICON,
    color: color.palette.white,
    tintColor: color.palette.black,
  },
  buttonOff: {
    ...BASE_ICON,
    color: color.palette.black,
    tintColor: color.palette.black,
  },
});
