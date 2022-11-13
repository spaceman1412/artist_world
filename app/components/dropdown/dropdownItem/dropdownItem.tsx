import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { DropdownItemProps } from "./dropdownItem.props";

export function DropdownItem (props: DropdownItemProps)
{
    const { item, ...rest } = props
    
    return(
    <TouchableOpacity {...rest} >
        <Text style={styles.textStyle}>{item.label}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        padding: 5,
        
    }
})