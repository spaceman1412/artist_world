import React from 'react';
import {TextInputCustomProps} from './text-Input.props';
import {TextInput, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {color} from '@theme';
import {LABEL_STYLE, TEXT_STYLES, VIEW_STYLES} from './text-input.preset';
import {TouchableOpacity} from 'react-native-gesture-handler';

export function TextInputCustom(props: TextInputCustomProps) {
  const {
    label,
    icon,
    iconColor = color.palette.Gray,
    iconSize = 20,
    inputStyle: inputStyleOverride,
    containerStyle: containerStyleOverride,
    labelStyle: labelStyleOverride,
    iconClick,
    ...rest
  } = props;

  const viewStyle = VIEW_STYLES.primary;
  const viewStyles = [viewStyle, containerStyleOverride];
  const textStyle = TEXT_STYLES.primary;
  const textStyles = [textStyle, inputStyleOverride];
  const labelStyle = LABEL_STYLE.primary;
  const labelStyles = [labelStyle, labelStyleOverride];
  return (
    <View>
      {label ? <Text style={labelStyles}>{label}</Text> : null}
      <View style={viewStyles}>
        <TextInput style={textStyles} {...rest} />
        <TouchableOpacity onPress={iconClick}>
          <Icon size={iconSize} name={icon} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
