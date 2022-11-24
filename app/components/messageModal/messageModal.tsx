import { color } from '@theme';
import * as React from 'react';
import { 
Modal,
StyleSheet,
View,
Text,
Image,
TouchableOpacity,
} from 'react-native';
import { GiftedChat} from 'react-native-gifted-chat';
import { MessageModalProps } from './messageModal.props';
import { renderBubble, renderComposer, renderMessageText } from './messageStyle/messageStyle';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';

const MessageModal = (props: MessageModalProps) =>{
    const {
        room,
        onclose,
        
        ...rest
    } = props
    const [messages, setMessages] = React.useState([])
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
                            name: 'tri' ///auth
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
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                    <View style={styles.header}>
                    <FastImage  
                    source={room.avatar}
                    style={styles.avatar}/>
                    <View style={styles.info}>
                        <Text style={styles.name}>{room.userName}</Text>
                        <View style={styles.status}>
                            <View style={styles.statusOnline}></View>
                            <Text style={styles.statusText}>Online</Text>
                        </View>
                    </View>
                    </View>
                    {
                        room !== null ?
                        <GiftedChat
                        messages={messages}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: '1',   // thay auth vao
                        }
                    }
                    renderAvatar={null}
                    renderBubble={renderBubble}
                    renderMessageText={renderMessageText}
                    renderComposer={renderComposer}
                
                    
                    />
                    : <></>
                }
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 716,
        backgroundColor: color.whiteBackground,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        padding: 20,
    },
    overplayed:{
        flex: 1,
        backgroundColor: color.palette.blackWithOpacity(0.5),
        justifyContent: 'flex-end',
    },
    wrapper:{
        flex: 1,
    },
    header:{
        height: 60,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
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