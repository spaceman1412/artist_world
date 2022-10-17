
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native'

interface RadioButtonProps{
    checked: boolean,
    onPress?: () => void,
}

const RadioButton = ({checked  , onPress}: RadioButtonProps) =>
{
    
    return(
        <View style={styles.container}>
            <TouchableOpacity 
            style={styles.outter}
            onPress={ onPress }
            >
                {
                checked === true ?
                <View style={styles.inner}/>
                : null
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
container:{
    
},
outter:{
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: '#ff4d67',
    borderRadius: 15,
    justifyContent:'center',
    alignItems: 'center'
},
inner:{
    width: 15,
    height: 15,
    backgroundColor: '#ff4d67',
    borderRadius: 10,
}
})
export default RadioButton;