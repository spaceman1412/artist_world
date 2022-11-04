
import React from 'react';
import {View,Text, TouchableOpacity} from 'react-native'
import { RadioButtonProps } from './radioButton.props';
import { INLINE_STYLE, OUTLINE_STYLE, TEXT_STYLES } from './radioButton.preset';
import {color as colors}  from '@theme';
import GlobalStyles from '@theme/styles/global-style'
const RadioButton = (props: RadioButtonProps) =>
{
    const{
        text,
        color = colors.palette.primary,
        size = 'md',
        textStyle: textStyleOverride,
        children,
        checked,
        position ,
        ...rest
    } = props
    const outLineStyle = OUTLINE_STYLE[size] || OUTLINE_STYLE.md;
    const outLineStyles = [outLineStyle,{borderColor: color}]
    const inLineStyle = INLINE_STYLE[size] || INLINE_STYLE.md;
    const inLineStyles = [inLineStyle, {backgroundColor: color}]
    const textStyle = TEXT_STYLES[size] ;
    const textStyles = [textStyle, textStyleOverride];
    const content = children || <Text style={textStyles}>{text}</Text>
    return(
        <View style={[GlobalStyles.row,
        GlobalStyles.justifyBetween,
        GlobalStyles.alignCenter]}>
            {
                position === 'right'?
                <>
                {content}
                <TouchableOpacity 
                style={outLineStyles}
                {...rest}
                >
                    {
                        checked === true ?
                        <View style={inLineStyles}/>
                        : null
                    }
                </TouchableOpacity>
                </>:
                <>
                <TouchableOpacity 
                style={outLineStyles}
                {...rest}
                >
                    {
                        checked === true ?
                        <View style={inLineStyles}/>
                        : null
                    }
                </TouchableOpacity>
                {content}
                </>
            }
        </View>
    )
}


export default RadioButton;