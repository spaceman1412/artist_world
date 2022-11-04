import { TouchableOpacity, Text } from "react-native";
import { DropdownItemProps } from "./dropdownItem.props";

export function DropdownItem (props: DropdownItemProps)
{
    const { item, ...rest } = props
    
    return(
    <TouchableOpacity {...rest} >
        <Text>{item.label}</Text>
    </TouchableOpacity>
    )
}