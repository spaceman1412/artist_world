import { Button, MessageBox } from '@components';
import { CommonType } from '@utils/types';
import * as React from 'react';
import { 
SafeAreaView,
StyleSheet,
View,
Text,
Image,
TextInput,
FlatList,
} from 'react-native';
import Filter from '@assets/images/filter.svg'
import { images } from '@assets/images';
import { color } from '@theme';
import { data } from './data';
import MessageModal from '@components/messageModal/messageModal';


const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 295,
    },
    screenTitle:{
        fontSize: 34,
        color: color.storybookTextColor,
        fontWeight: '700',
        lineHeight: 51,
    },
    filterButton:{
        width: 52,
        height: 52,
        borderRadius: 15,
        backgroundColor: color.transparent,
        borderColor: color.palette.mischka,
        borderWidth: 1,
    },
    searchContainer:{
        justifyContent: 'center',
        marginVertical: 10,
    },
    searchBox:{
        width: 295,
        height: 48,
        borderColor: color.palette.mischka,
        borderWidth: 1,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    searchIcon:{
        width: 18,
        height: 18,
    },
    inputSearch:{
        width: 230,
        color: color.storybookTextColor,
        marginLeft: 10,
        fontSize: 14,
    },
    messageSection:{

    },
    title:{
        color: color.storybookTextColor,
        fontWeight: '700',
        fontSize: 18,
        alignSelf: 'flex-start',
        marginVertical: 10,
    },
    messageList:{
        width: 295,
    }   
})

interface Props{}

export const Messages: CommonType.AppScreenProps<'messages', Props> = ({
    navigation
}) =>{
    const [modal,setModal] = React.useState(false);
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.screenTitle}>Messages</Text>
                <Button style={styles.filterButton}>
                    <Filter/>
                </Button>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchBox}>
                    <Image 
                    style={styles.searchIcon}
                    source={images.search}/>
                    <TextInput 
                        placeholder='Search'
                        placeholderTextColor={color.palette.GrayWithOpacity(0.4)}
                        style={styles.inputSearch}

                    />
                </View>
            </View>
            <View style={styles.messageSection}>
                <Text style={styles.title}>Messages</Text>
                <View style={styles.messageList}>
                <FlatList
                    data = {data}
                    style={styles.messageList}
                    renderItem= {({item}) => 
                    <MessageBox 
                    message={item.message} 
                    time={item.time} 
                    image={item.image} 
                    username={item.name}
                    unreadCount={item.unread}
                    hasStory = {item.story}
                    onPress={() => setModal(true)}
                    />
                    }
                />
                </View>
            </View>
            <MessageModal
            visible = {modal}
            onRequestClose={() => setModal(false) }
            />
        </SafeAreaView>
    )
}