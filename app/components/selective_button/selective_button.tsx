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
    iconPosition,
    state,
    style: styleOverride,
    children,
    ...rest
  } = props;

  const viewStyle =
    VIEW_STYLES[state ? onPreset : offPreset] || VIEW_STYLES.primary;
  const viewStyles = [viewStyle, styleOverride];

  return (
    <TouchableOpacity style={viewStyles} {...rest}>
      {iconPosition === 'left' && <Image source={icon} style={styles.icon} />}
      {children}
      {iconPosition === 'right' && <Image source={icon} style={styles.icon} />}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    width: 16,
    height: 16,
  },
});
