import { StyleProp,ViewStyle, TouchableOpacityProps, TextStyle } from 'react-native';

export interface DropDownProps 
{
    data: Array<{id: string, label: string}>,
    value : string,
    onSelect: (value) => void,
    containerStyles ?: StyleProp<ViewStyle>,
    textStyles?: StyleProp<TextStyle>
    itemStyles?: StyleProp<TouchableOpacityProps>,
    maxDropdownHeight? : number,
    preset?: 'primary'| 'noneOutline',
    dropDownWidth?: number,
    dropdownHeight?: number,
    placeHolder?: string,
}