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
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
    const {gallery} = route.params
    const handleAddGallery =() =>  {
    
    }
    return(
        <ScrollView style={styles.container}
        contentContainerStyle={styles.contentContainer}>
            <Text style={styles.introduce}>
                Add your best photos to get a higher 
                amount of daily matches
            </Text> 
            {
                gallery.map(item =>
            <ImageBox image={item} onDelete={function (value: string): void {
                throw new Error("Function not implemented.");
            } }/>
            )
    }
            <TouchableOpacity style={styles.addButtonBox}>
            <View style={styles.addButton}>
                <Icon 
                name='plus'
                size={30}
                color ={color.whiteBackground}
                />
            </View>
            </TouchableOpacity>
        </ScrollView>
    )
}