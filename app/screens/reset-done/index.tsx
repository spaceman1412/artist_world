import * as React from 'react';
import { View, Text,Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@assets/images';
const ResetDone = () =>{
    return(
        <SafeAreaView style={styles.container}>
                <View style={styles.content}>

                <Image 
                source={images.congratulation}
                style={{width: 340, height: 340}}/>
                <Text style={{fontSize: 25,
                marginTop: 10}}>
                    Your account is ready to use
                </Text>
                </View>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonContent}>Save</Text>
                </Pressable>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
         flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content:{
        marginTop: 20,
    }
    ,
    button:{
        width: 370,
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
        backgroundColor:'#a57777',
        height: 55,
        borderRadius: 30,
    },
    buttonContent:{
        color: 'white',
        fontWeight: '500',
        fontSize: 25,
    }
})
export default ResetDone;