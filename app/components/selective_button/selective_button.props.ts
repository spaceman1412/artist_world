import React from 'react';

import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export interface SelectiveButtonProps extends TouchableOpacityProps {
  /**
   * Text which is looked up via i18n.
   */
  /**
   * store value of the button
   */
  state?: boolean;
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  /**
   * The image to display as icon
   */
  icon?: string;

  activeColor?: string;
  inactiveColor?: string;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * One of the different types of text presets.This one for ON state
   */
  onPreset?: string;

  /**
   * One of the different types of text presets. this one for OFF state
   */
  offPreset?: string;

  /**
   * One of the different types of text presets.
   */
  children?: React.ReactNode;
}
