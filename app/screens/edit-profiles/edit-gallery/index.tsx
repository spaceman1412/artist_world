import { color } from "@theme";
import { CommonType } from "@utils/types";
import { 
ScrollView,
StyleSheet,
Text,
TouchableOpacity,
View,
 } from "react-native";
import { ImageBox } from "./image-box";
import * as React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import storage from '@react-native-firebase/storage';
import { ImagePickerResponse, launchImageLibrary } from "react-native-image-picker";
import { useAppDispatch } from "@store/hook";
import { ProfileActions } from "@store/profile/reducer";
import { LoaderScreen } from "react-native-ui-lib";

const styles = StyleSheet.create({
    container:{
        backgroundColor: color.whiteBackground,
        padding: 20,
    },
    introduce:{
        color: color.storybookTextColor,
    },
    contentContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton:{
        width: 60,
        height: 60,
        backgroundColor: color.palette.PrimaryWithOpacity(0.7),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    addButtonBox:{
        width: 295,
        height: 400,
        borderRadius: 25,
        backgroundColor: color.palette.PrimaryWithOpacity(0.05),
        borderWidth: 1,
        borderColor: color.primary,
        borderStyle: "dashed",
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
})

interface Props{};
export const EditGallery: CommonType.EditProfileScreenProps<'editGallery',Props> =(
{navigation, route}
) =>{
    const dispatch = useAppDispatch();
    const {gallery} = route.params
    const [listImage, setListImage] = React.useState(gallery)
    const [loading, setLoading] = React.useState(false);

    const hanldeDeleteImage = (image: string) =>{
        setLoading(true);
        var parts = image.split('?')
        var picRef = parts[0]
        var imageRef = storage().refFromURL(picRef)
        setListImage(value => value.filter(value => value !== image))
        imageRef.delete()
        .then( () => {
            dispatch(ProfileActions.updateGallery(
                listImage.filter(value => value != image)))
        }
        ).then(() => dispatch(ProfileActions.updateGalleryFirebase())
        ).finally(() =>{
            setLoading(false)
        }).catch(() => console.error())
    }
    const postPic = async(picture) =>{
        var parts = picture.split('/');
        var picRef = parts[parts.length - 1]
        const ref = storage().ref(picRef);
        await ref.putFile(picture)
        return storage().ref(picRef).getDownloadURL()
        
  }
    const handleAddGallery = () =>  {

        launchImageLibrary(
            {mediaType: 'photo'},
            (response: ImagePickerResponse) => {
                if(response.didCancel || response.errorCode)
                {
                    return;
                }
                setLoading(true)
                const uri = response.assets[0].uri;
                postPic(uri).
                then(value => {
                    setListImage(pre => [...pre, value])
                    dispatch(ProfileActions.updateGallery([...listImage, value]))

                })
               .then(() => dispatch(ProfileActions.updateGalleryFirebase()))
               .finally(() => setLoading(false))
            })
            
    }
    return(
        <ScrollView style={styles.container}
        contentContainerStyle={styles.contentContainer}>
            <Text style={styles.introduce}>
                Add your best photos to get a higher 
                amount of daily matches
            </Text> 
            {
                listImage.map((item,index) =>
            <ImageBox image={item} 
            key = {index}
            onDelete={() => hanldeDeleteImage(item) }/>
            )
    }
        {
            loading ? 
            <LoaderScreen message={'Loading'}/>
        :
            <TouchableOpacity 
            disabled={loading}
            onPress={handleAddGallery}
            style={styles.addButtonBox}>
            <View style={styles.addButton}>
                <Icon 
                name='plus'
                size={30}
                color ={color.whiteBackground}
                />
            </View>
            </TouchableOpacity>
            }
        </ScrollView>
    )
}