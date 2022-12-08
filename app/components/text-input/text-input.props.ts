import { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";

export interface TextInputCustomProps extends TextInputProps{
    label?: string,
    inputStyle? : StyleProp<TextStyle>,
    labelStyle?: StyleProp<TextStyle>,
    containerStyle?: StyleProp<ViewStyle>,
    icon : string,  /// material Icon
    iconColor?: string,
    iconSize?: number;
}