import { TextStyle, ViewStyle, StyleSheet } from 'react-native';
import {color,  spacing} from '@theme'


const BASE_OUTLINE: ViewStyle = {
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.primary,
    margin: 10,
};

const BASE_INLINE : ViewStyle = {
    borderRadius: 50,
    backgroundColor: color.primary,
}

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[3],
  fontWeight: '500',
  textAlign: 'center',
};


export const OUTLINE_STYLE = StyleSheet.create({
    xs:{
        ...BASE_OUTLINE,
        width: 15,
        height: 15,
    },
    sm:{
        ...BASE_OUTLINE,
        width: 18,
        height: 18,
    },
    md: {
        ...BASE_OUTLINE,
        width: 20,
        height: 20,
    },
    lg:{
        ...BASE_OUTLINE,
        width: 25,
        height: 25,
        borderWidth: 2,
    },
    xl:{
        ...BASE_OUTLINE,
        width: 30,
        height: 30,
        borderWidth: 2,
    }
})

export const INLINE_STYLE = StyleSheet.create({
    xs:{
        ...BASE_INLINE,
        width: 10,
        height: 10,
    },
    sm:{
        ...BASE_INLINE,
        width: 13,
        height: 13,
    },
    md:{
        ...BASE_INLINE,
        width: 14,
        height: 14,
    },
    lg:{
        ...BASE_INLINE,
        width: 16,
        height: 16,
        
    },
    xl:{
        ...BASE_INLINE,
        width: 20,
        height: 20,
    }
})

export const TEXT_STYLES = StyleSheet.create({
     xs:{
        ...BASE_TEXT,
    },
    sm:{
        ...BASE_TEXT,

    },
    md:{
        ...BASE_TEXT,
    },
    lg:{
        ...BASE_TEXT,

    },
    xl:{
        ...BASE_TEXT,

    }
})

