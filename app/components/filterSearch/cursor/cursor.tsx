import { color } from '@theme';
import {View, StyleSheet} from 'react-native';
import {memo} from 'react';

 const Cursor = () =>{
    
    return(
        <View style={styles.container}>
            <View style={styles.inline}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: color.whiteBackground,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: color.palette.black,
        shadowOffset:{
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inline:{
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: color.palette.primary,
    }
})

export default memo(Cursor)
