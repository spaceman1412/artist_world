import * as React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {VIEW_STYLES, TEXT_STYLES} from './button.presets';
import {ButtonProps} from './button.props';

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */

export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = 'primary',
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props;

  const viewStyle = VIEW_STYLES[preset] || VIEW_STYLES.primary;
  const viewStyles = [viewStyle, styleOverride];
  const textStyle = TEXT_STYLES[preset] || TEXT_STYLES.primary;
  const textStyles = [textStyle, textStyleOverride];

  const content = children || <Text style={textStyles}>{text}</Text>;

  return (
    <TouchableOpacity style={viewStyles} {...rest}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        {content}
      </View>
    </TouchableOpacity>
  );
}
