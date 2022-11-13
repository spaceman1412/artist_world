import React from 'react';

import {
    StyleProp,
    TouchableOpacityProps,
    TextStyle,
    ViewStyle
} from 'react-native';

export interface RadioButtonProps extends TouchableOpacityProps{
    text?:string;
    color?: string;
    size?: 'xs'|'sm' | 'md' | 'lg' | 'xl' ;
    textStyle?: StyleProp<TextStyle>;
    children?: React.ReactNode;
    checked: boolean
    position?: 'left' | 'right';
    ViewStyle?: StyleProp<ViewStyle>;
}