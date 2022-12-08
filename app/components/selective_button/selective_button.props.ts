import React from 'react';

import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export interface SelectiveButtonProps extends TouchableOpacityProps {

  state: boolean;
  icon?: ImageSourcePropType;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  onPreset: string;
  offPreset: string;
  children?: React.ReactNode;

  selectedColorBackground: string;
  unSelectedColorBackground: string;
}
