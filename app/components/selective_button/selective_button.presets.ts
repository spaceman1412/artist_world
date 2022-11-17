import {color, radius, spacing} from '@theme';
import {TextStyle, ViewStyle, StyleSheet} from 'react-native';

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  padding: spacing.small,
  borderRadius: radius.ML,
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
};

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[3],
  flex: 1,
  fontWeight: '500',
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
  buttonOff: {
    ...BASE_VIEW,
    backgroundColor: color.palette.white,
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
    tintColor: color.palette.black,
  },
});

export const ICON_STYLES = StyleSheet.create({
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
