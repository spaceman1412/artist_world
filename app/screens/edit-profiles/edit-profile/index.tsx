import { UploadImage } from "@components"
import { TextInputCustom } from "@components/text-input/text-input"
import { color } from "@theme"
import { CommonType } from "@utils/types"
import { useState } from "react"
import { SafeAreaView, StyleSheet, View } from "react-native"


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.whiteBackground,

    },
    infoContainer:{
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
interface Props{}
export const EditProfile : CommonType.EditProfileScreenProps<'editProfile',Props> =({
    navigation,
}) =>{
    const [pic,setPic] = useState()
    return(
        <SafeAreaView style={styles.container}>
            <UploadImage/>
            <View style ={styles.infoContainer}>
                <TextInputCustom 
                label={'firstName'}
                icon={"account"}/>
            </View>
        </SafeAreaView>
    )
}