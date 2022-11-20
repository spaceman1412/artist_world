import * as React from 'react';
import {TouchableOpacity, Text, View, Image, StyleSheet} from 'react-native';
import {
  VIEW_STYLES,
  TEXT_STYLES,
  ICON_STYLES,
} from './selective_button.presets';
import {SelectiveButtonProps} from './selective_button.props';

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */

export function SelectiveButton(props: SelectiveButtonProps) {
  // grab the props
  const {
    onPreset = 'primary',
    offPreset = 'buttonOff',
    icon,
    text,
    iconPosition,
    state,
    style: styleOverride,
    textStyle: textStyleOverride,
    iconStyle: iconStyleOverride,
    children,
    ...rest
  } = props;

  const viewStyle =
    VIEW_STYLES[state ? onPreset : offPreset] || VIEW_STYLES.primary;
  const viewStyles = [viewStyle, styleOverride];
  const textStyle =
    TEXT_STYLES[state ? onPreset : offPreset] || TEXT_STYLES.primary;
  const textStyles = [textStyle, textStyleOverride];
  const iconStyle =
    ICON_STYLES[state ? onPreset : offPreset] || ICON_STYLES.primary;
  const iconStyles = [iconStyle, iconStyleOverride];

  const content = children || <Text style={textStyles}>{text}</Text>;
  return (
    <TouchableOpacity style={viewStyles} {...rest}>
      {iconPosition === 'left' && <Image source={icon} style={iconStyles} />}
      {content}
      {iconPosition === 'right' && <Image source={icon} style={iconStyles} />}
    </TouchableOpacity>
  );
}
