import { color } from '@theme';
import * as React from 'react';
import { 
Modal,
StyleSheet,
View,
Text,
Image,
} from 'react-native';
import { GiftedChat} from 'react-native-gifted-chat';
import { MessageModalProps } from './messageModal.props';
import { renderBubble, renderComposer, renderMessageText } from './messageStyle/messageStyle';


const MessageModal = (props: MessageModalProps) =>{
    const {
        ...rest
    } = props
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])
    
    const onSend = React.useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])
    return(
        <Modal 
        transparent={true}
        animationType='slide'
        {...rest}
        >
            <View style={styles.overplayed}>
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                    <View style={styles.header}>
                    <Image  
                    source={{uri: 'https://placeimg.com/140/140/any'}}
                    style={styles.avatar}/>
                    <View style={styles.info}>
                        <Text style={styles.name}>Grace</Text>
                        <View style={styles.status}>
                            <View style={styles.statusOnline}></View>
                            <Text style={styles.statusText}>Online</Text>
                        </View>
                    </View>
                    </View>
                        <GiftedChat
                        messages={messages}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: 1,
                        }}
                        renderAvatar={null}
                        renderBubble={renderBubble}
                        renderMessageText={renderMessageText}
                        renderComposer={renderComposer}
                        />
                    </View>
                </View>
            </View>
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