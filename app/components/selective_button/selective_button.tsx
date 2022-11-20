import {palette} from '@theme/palette';
import * as React from 'react';
import {TouchableOpacity, Text, View, Image, StyleSheet} from 'react-native';
import {VIEW_STYLES, TEXT_STYLES} from './selective_button.presets';
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
    text,
    icon,
    state,
    activeColor,
    inactiveColor,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props;

  const viewStyle =
    VIEW_STYLES[state ? onPreset : offPreset] || VIEW_STYLES.primary;
  const viewStyles = [viewStyle, styleOverride];
  const textStyle =
    TEXT_STYLES[state ? onPreset : offPreset] || TEXT_STYLES.primary;
  const textStyles = [textStyle, textStyleOverride];

  const content = children || <Text style={textStyles}>{text}</Text>;

  return (
    <TouchableOpacity style={viewStyles} {...rest}>
      <View style={Styles.buttonContent}>
        {content}
        <Image
          source={icon}
          style={{
            width: 16,
            height: 16,
            tintColor: state ? activeColor : inactiveColor,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
const Styles = StyleSheet.create({
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
  },
});
