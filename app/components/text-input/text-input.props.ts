import { StyleProp, TextInputProps, TextProps, ViewStyle } from "react-native";

export interface TextInputCustomProps extends TextInputProps{
    label?: string,
    inputStyle? : StyleProp<TextProps>,
    containerStyle?: StyleProp<ViewStyle>,
    icon : string,  /// material Icon
    iconColor?: string,
    iconSize?: number;
    labelStyle?: StyleProp<TextProps>,
}