import { color } from '@theme';
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {images} from '@assets/images';

const styles = StyleSheet.create({
    container:{
        width: 310,
        height: 420,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonDelete:{
        width: 40,
        height: 40,
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,

    },
    image:{
        width: 295,
        height: 400,
        borderRadius: 25,
    }
})

interface Props{
    image: string,
    onDelete?: (item) => void,
}

export const ImageBox = (props: Props) =>{
    const { image,onDelete} = props;
    return(
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={onDelete}
            style={styles.buttonDelete}>
                <Icon 
                name='close-thick'
                size={25}
                color ={color.whiteBackground}
                />
            </TouchableOpacity>
                <FastImage
                resizeMode={'stretch'}
                style={styles.image}
                source={image ? {uri: image} : images.placeholder}
                />

        </View>
    )
}