import { TextInputCustomProps } from "./text-Input.props";
import { TextInput, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { color } from "@theme";
import { LABEL_STYLE, TEXT_STYLES, VIEW_STYLES } from "./text-input.preset";

export function TextInputCustom(props: TextInputCustomProps)
{
    const {
        label,
        icon,
        iconColor = color.palette.mischka,
        iconSize=20,
        inputStyle: inputStyleOverride,
        containerStyle: containerStyleOverride,
        labelStyle: labelStyleOverride,
        ...rest} = props;
    
        const viewStyle = VIEW_STYLES.primary;
        const viewStyles = [viewStyle, containerStyleOverride];
        const textStyle =  TEXT_STYLES.primary;
        const textStyles = [textStyle, inputStyleOverride];
        const labelStyle = LABEL_STYLE.primary;
        const labelStyles = [labelStyle, labelStyleOverride]
        return(
        
        <View>
        {/* {
            label ?
            <Text style={labelStyles}>{label}</Text>
            :
            null
        } */}
        <View style={viewStyles}>
            <Text>{label}</Text>
            <TextInput
            style={textStyles}
            {...rest}
            />
            <Icon size={iconSize}
            name={icon}
            color={iconColor}
            />
        </View>
        </View>
    )
}