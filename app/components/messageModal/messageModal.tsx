import { color } from '@theme';
import * as React from 'react';
import { 
Modal,
StyleSheet,
View,
Text,
TouchableOpacity,
} from 'react-native';
import { GiftedChat} from 'react-native-gifted-chat';
import { MessageModalProps } from './messageModal.props';
import { renderBubble, renderComposer, renderMessageText } from './messageStyle/messageStyle';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';
import { LoaderScreen } from 'react-native-ui-lib';
import { images } from '@assets/images';
import { useNavigation } from '@react-navigation/native';

const MessageModal = (props: MessageModalProps) =>{
    const {
        room,
        onclose,
        ...rest
    } = props

    const [messages, setMessages] = React.useState([])
    const [loading, setLoading] = React.useState(true);
    const navigation = useNavigation();
    React.useLayoutEffect(() => {
        const getData =
            firestore()
            .collection('chat-messages')
            .doc(room.roomId.trim())
            .collection('messages')
            .orderBy('createAt','desc')
            .onSnapshot(documentSnapshot => {
                setMessages([])
                documentSnapshot.forEach(data =>{
                    const user = data.data();
                    setMessages(pre => [...pre,{
                        _id: data.id,
                        text: user.text,
                        createdAt: user.createAt.toDate(),
                        user:{
                            _id: user.sendBy,
                        }
                    }])
                });
            });
            return () => getData()
        }
    , [room])
    const onSend = async (messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        await sendDB(messages)
    }
    const sendDB = async(messages) =>{
        return firestore()
        .collection('chat-messages')
        .doc(room.roomId.trim())    /// chat room
        .collection('messages')
        .doc(messages[0]._id)
        .set({
            createAt: messages[0].createdAt,
            text: messages[0].text,
            sendBy:messages[0].user._id
        })
        .then(() => {
            updateLastest(messages[0])
        }
            )
    }
    const updateLastest = (message) =>{
        return firestore()
                .collection('chat-messages')
                .doc(room.roomId.trim())
                .update({
                    lastMessage : {
                        createAt: messages[0].createdAt,
                        _id: message._id,
                        text: message.text,
                        sendBy: message.user._id,
                    }
                }).then(() => console.log('updated'))
    }
    return(
        <Modal 
        transparent={true}
        animationType='slide'
        {...rest}
        >
            <TouchableOpacity 
            onPress={onclose}
            style={styles.overplayed}>
            
            </TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                    <TouchableOpacity onPress={() => {navigation.navigate('profileDetail', {uid: room.id}); onclose()}}>

                    <View style={styles.header}>

                    <FastImage
                    onLoadEnd={() => setLoading(false)}
                    source={loading ? images.placeholder : room.avatar}
                    style={styles.avatar}/>
                    <View style={styles.info}>
                        <Text style={styles.name}>{room.userName}</Text>
                        <View style={styles.status}>
                            <View style={styles.statusOnline}></View>
                            <Text style={styles.statusText}>Online</Text>
                        </View>
                    </View>

                    </View>
                    </TouchableOpacity>

                    {
                        room !== null ?
                        <GiftedChat
                        messages={messages}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: auth().currentUser.uid.trim(),   // thay auth vao
                        }
                    }
                    renderAvatar={null}
                    renderBubble={renderBubble}
                    renderMessageText={renderMessageText}
                    renderComposer={renderComposer}
                
                    
                    />
                    : <LoaderScreen/>
                }
                    </View>
                </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        backgroundColor: color.whiteBackground,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        borderTopWidth: 1,
        borderTopColor: color.line,
        padding: 20,
        zIndex: 10,
        height: '90%', 
        position: 'absolute',
        bottom: 0,   
    },
    overplayed:{
        flex: 1,
        backgroundColor: color.palette.blackWithOpacity(0.5),
        justifyContent: 'flex-end',
        zIndex: -1,
        
    },
    wrapper:{
        flex: 1,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    header:{
        height: 60,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    avatar:{
        width: 48,
        height: 48,
        borderRadius: 50,
        marginRight: 10,
    },
    info:{

    },
    name:{
        fontSize: 24,
        fontWeight: '700',
        color: color.storybookTextColor,
    },
    status:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusOnline:{
        width: 6,
        height: 6,
        borderRadius: 50,
        backgroundColor: color.palette.green,
        marginRight: 5,
    },
    statusText:{
        color: color.palette.blackWithOpacity(0.4),
    },
})
export default MessageModal;