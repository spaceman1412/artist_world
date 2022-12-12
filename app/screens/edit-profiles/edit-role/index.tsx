import { color } from '@theme';
import { CommonType } from '@utils/types';
import {StyleSheet, SafeAreaView, View,Text} from 'react-native';
import Badge from 'react-native-ui-lib/src/components/badge';
import { MusicRoles } from './roles';
import * as React from 'react';
import { Button } from '@components';
import { useAppDispatch } from '@store/hook';
import { ProfileActions } from '@store/profile/reducer';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.whiteBackground,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    introduce:{
        color: color.storybookTextColor,
        textAlign: 'center',
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

    },
    iconActive:{
        color: color.transparent
    },
    icon:{
        color: color.primary
    }
})

interface Props{}
export const EditRole: CommonType.EditProfileScreenProps<
  'editRole',
  Props
> = ({navigation, route}) => {
    const dispatch = useAppDispatch();
    const [listRoles,setlistRoles] = React.useState(route.params.roles)
    const hanldeBadgePress = (role:string) =>{
        if(listRoles.includes(role))
        {

            setlistRoles(listRoles.filter(item => item !== role))
        }
        else{
            setlistRoles([...listRoles, role])
        }
    }
    const handleConfirm = () =>{
        const send = async() =>{
            await dispatch(ProfileActions.updateMusicRoles(listRoles))
            await dispatch(ProfileActions.updateRolesFirebase())
        }
        send().then(() => navigation.navigate('editProfile'))
    }
    return(
        <SafeAreaView style = {styles.container}>
             <View style = {styles.content}>
            <Text style={styles.introduce}>
                Who do you want to become in a ban?
            </Text>
            <View style={styles.badgesContainer}>
            {
                MusicRoles.map((item,index) =>
                <Badge 
                key = {index}
                label = {item.name}
                size={40}
                borderWidth = {1}
                containerStyle = {styles.badgeStyle}
                borderColor = {color.primary}
                backgroundColor = {
                    listRoles.includes(item.name) ? 
                    color.primary : color.transparent}
                labelStyle = {
                    listRoles.includes(item.name) ?
                    styles.badegeTextStyleActive 
                    : styles.badgeTextStyle
                }
                onPress = {() => hanldeBadgePress(item.name)}
                customElement={<Icon size={20}
                    name={item.icon}
                   color={listRoles.includes(item.name) ?
                    color.whiteBackground
                    : color.primary}/>}
                >
                    
                </Badge>)
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
