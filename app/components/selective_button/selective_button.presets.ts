import {color, radius, spacing} from '@theme';
import {TextStyle, ViewStyle, StyleSheet} from 'react-native';

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  borderRadius: radius.XS,
  height: 40,
};

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[3],
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
});
