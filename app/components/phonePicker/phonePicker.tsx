import { images } from '@assets/images';
import Flag from '@components/flag/flag';
import { color } from '@theme';
import * as React from 'react';
import {
View,
TextInput,
TouchableOpacity, 
Text, 
Image,
StyleSheet}
from 'react-native';
import { PhonePickerProps } from './phonePicker.props';


export function PhonePicker(props: PhonePickerProps)
{
    const {
    flagCode,
    codeNumber,
    value,
    onChange,
    navigation,
    } = props
    const validatePhone = (value) =>{
        if(!isNaN(value))   // to make sure the user only enter number even when in the pc
        {
            let num = value.replace('.','')
            onChange(num);
        }
    }
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.flagPicker}
            onPress={() => navigation.navigate('selectCountry')}>
                <Flag code={flagCode} style={styles.flag}/>
                <Text style={styles.code}>({codeNumber})</Text>
                <Image source={images.dropdown} style={styles.dropdown} />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                maxLength={12}
                value={value}
                dataDetectorTypes='phoneNumber'
                keyboardType={'phone-pad'}
                onChangeText={(text) => validatePhone(text)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: 295,
        height: 58,
        borderWidth: 1,
        borderColor: color.palette.mischka,
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    flag:{
        width: 20,
        height: 15,
        borderRadius: 2,
        marginHorizontal: 5,
    },
    flagPicker:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
        marginHorizontal: 5,
    },
    code:{
        color: color.storybookTextColor,
        fontWeight: '400',
        fontSize: 14,
        marginHorizontal: 3,
    },
    dropdown:{
        width: 10,
        height: 10,
        marginHorizontal: 3,
    },
    inputContainer:{
        
        width: '60%',
        paddingHorizontal: 15,
        borderLeftColor: color.palette.mischka,
        borderLeftWidth: 1,
        marginHorizontal: 10,
        justifyContent: 'center'
    
    },
    input:{
        marginHorizontal: 5,
        fontSize: 14,
        padding: 0,
        fontWeight: '400',
        lineHeight: 21,
    }
})