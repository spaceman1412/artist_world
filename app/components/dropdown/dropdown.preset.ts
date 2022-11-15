import { color } from '@theme';
import { ViewStyle, StyleSheet, TextStyle } from 'react-native';

const BASE_TEXTBOX_STYLE: ViewStyle ={
    width: 295,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 20,
}

const BASE_TEXTINPUT_STYLE: TextStyle = {
    width: '90%',
    fontSize: 15,
    color: color.storybookTextColor,
    fontWeight: '400',
}

export const BASE_DROPDOWN_ITEM: ViewStyle={
    width: 290,
    height: 50,
    padding: 5,
    margin: 3,

}

export const TEXTBOX_STYLES = StyleSheet.create({
    primary: {
        ...BASE_TEXTBOX_STYLE,
        borderRadius: 15,
        borderWidth: 1,
    },
    noneOutline: {
        ...BASE_TEXTBOX_STYLE
    }
})

export const TEXTINPUT_STYLES = StyleSheet.create({
    primary: {
        ...BASE_TEXTINPUT_STYLE,
    },
    noneOutline: {
        ...BASE_TEXTINPUT_STYLE,
    }
})