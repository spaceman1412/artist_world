import { Button } from "@components";
import { useAppDispatch} from "@store/hook";
import { ProfileActions } from "@store/profile/reducer";
import { color } from "@theme";
import { CommonType } from "@utils/types";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import { Badge } from "react-native-ui-lib";
import {MusicGenres} from "./genres";

interface Props{}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.whiteBackground,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    introduce:{
        color: color.storybookTextColor,
        padding: 20,
    },
    badgeStyle:{
        backgroundColor: color.transparent,
        margin: 5,
    },
    badegeActiveStyle:{
        backgroundColor: color.primary,
    },
    badgeTextStyle :{
        color: color.primary,
        fontSize: 16,
        margin: 5,
    },
    badegeTextStyleActive:{
        color: color.palette.white,
        fontSize: 16,
        margin: 5,
    },
    badgesContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
    },
    buttonNext:{
        width: 295,
        height: 56,
        backgroundColor: color.primary,
        borderRadius: 15,
    },
    content:{

    }
})
export const EditInterest: CommonType.EditProfileScreenProps<'editInterest', Props> =({
    navigation, route
}) => {
    const dispatch = useAppDispatch();
    const [listInterest, setListInterest] = useState(route.params.interests);
    const hanldeBadgePress = (interest: string) =>{
        if(listInterest.includes(interest))
        {
            setListInterest(listInterest.filter(item => item !== interest))
        }
        else
        {
            setListInterest([...listInterest, interest])
        }
    }
    const handleConfirm = async() =>{
        const send = async() =>{
            
            await dispatch(ProfileActions.updateMusicInterests(listInterest))
            await dispatch(ProfileActions.updateInterestFirebase());
        }
        send().then(() => navigation.navigate('editProfile'))
        
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style = {styles.content}>
            <Text style={styles.introduce}>
                Select your interests to match with users who have
                similar things in common.
            </Text>
            <View style={styles.badgesContainer}>
            {
                MusicGenres.map((item,index) =>
                <Badge 
                key = {index}
                label = {item}
                size={40}
                borderWidth = {1}
                containerStyle = {styles.badgeStyle}
                borderColor = {color.primary}
                backgroundColor = {
                    listInterest.includes(item) ? 
                    color.primary : color.transparent}
                labelStyle = {
                    listInterest.includes(item) ?
                    styles.badegeTextStyleActive 
                    : styles.badgeTextStyle
                }
                onPress = {() => hanldeBadgePress(item)}
                />)
            }
            </View>
            </View>
            <Button
            onPress={handleConfirm}
            text={'Confirm'}
            style={styles.buttonNext}
            />
        </SafeAreaView>
    )
}
    
