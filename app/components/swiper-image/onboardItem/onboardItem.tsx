import { color } from '@theme';
import * as React from 'react';
import {
    View, 
    useWindowDimensions, 
    Image,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native';
import { OnboardingItemProps } from './onboardingItem.props';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export const OnboardingItem = (props: OnboardingItemProps) =>{
    const {
        image,
        name,
        age,
        imageType = 'uri',
    } = props
    return(
        <View style={styles.container}>
            <Image source={{uri: image}} 
            resizeMode='stretch'
            style={styles.image}/>
            <View style={styles.information}>
                <Text style={styles.name}>{name}, {age}</Text>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        width: WIDTH,
        height: HEIGHT,
    },
    container:{
        width: WIDTH,
        height: HEIGHT,
    },
    information:{
        width: '100%',
        height: 180,
        backgroundColor: color.palette.blackWithOpacity(0.7),
        position: 'absolute',
        bottom: 0,
        padding: 10,
    },
    name:{
        fontSize: 30,
        color: color.text,
        fontWeight: '700',
    }
})