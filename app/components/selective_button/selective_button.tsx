import * as React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
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

  const content = children || (
    <Text style={[textStyles, {flex: 1}]}>{text}</Text>
  );

  return (
    <TouchableOpacity style={viewStyles} {...rest}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        {content}
      </View>
    </TouchableOpacity>
  );
}
