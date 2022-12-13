import { MessageBox} from '@components';
import {CommonType} from '@utils/types';
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
import {images} from '@assets/images';
import {color} from '@theme';
import MessageModal from '@components/messageModal/messageModal';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: color.whiteBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 295,
  },
  screenTitle: {
    fontSize: 34,
    color: color.storybookTextColor,
    fontWeight: '700',
    lineHeight: 51,
  },
  filterButton: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: color.transparent,
    borderColor: color.palette.mischka,
    borderWidth: 1,
  },
  searchContainer: {
    justifyContent: 'center',
    marginVertical: 10,
  },
  searchBox: {
    width: 295,
    height: 48,
    borderColor: color.palette.mischka,
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
  inputSearch: {
    width: 230,
    color: color.storybookTextColor,
    marginLeft: 10,
    fontSize: 14,
  },
  messageSection: {},
  title: {
    color: color.storybookTextColor,
    fontWeight: '700',
    fontSize: 18,
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  messageList: {
    width: 295,
  },
});

interface Props {}

export const Messages: CommonType.AppScreenProps<'messages', Props> = ({
  navigation,
}) => {
  const [modal, setModal] = React.useState(false);
  const [roomchat, setRoomChats] = React.useState([]);
  const [roomSelected, setRoomSelected] = React.useState(null);
  const typingTimeOut = React.useRef<any>();
  const [search, setSearch] = React.useState('');
  const [listUserfilter, setListUserFiler] = React.useState([]);
  const handleChangeSearch = (e: any) => {  
    
    if (typingTimeOut.current) {
      clearTimeout(typingTimeOut.current);
    }
    typingTimeOut.current = setTimeout(() => {
      let searchWord = e.trim();
      let filter = roomchat!.filter(item => {
        if (searchWord === '') {
          return item;
        } else {
          return item.userName
            .toLowerCase()
            .includes(search.toLowerCase().trim());
        }
      });
      
      setListUserFiler(filter);
    }, 600);
    setSearch(e);
  };
  
  React.useEffect(() => {
    const getData = async () => {
      const res = await firestore()
        .collection('user-chat')
        .doc(auth().currentUser.uid.trim())
        .onSnapshot(async documentSnapshot => {
          if (documentSnapshot.exists) {
            setRoomChats([]);
            const data = documentSnapshot.data();
            for (let element of data.roomId) {
              await setRoomChat(element.trim());
            }
          } else {
            await firestore()
              .collection('user-chat')
              .doc(auth().currentUser.uid.trim())
              .set({
                roomId: [],
              })
              .then(() => console.log('created'))
              .catch(console.error);
          }
        });
      res;
    };

    const setRoomChat = async roomId => {
      const postReference = firestore().doc(`chat-messages/${roomId}`);
      firestore().runTransaction(async transaction => {
        const postSnapshot = await transaction.get(postReference);
        const uid = postSnapshot.data().members;
        const id =
          uid[0].trim() === auth().currentUser.uid
            ? uid[1].trim()
            : uid[0].trim();
        const postRef = firestore().doc(`Users/${id}`);
        const user = await transaction.get(postRef);
        setRoomChats(prev => [
          ...prev,
          {
            userName: user.data().firstName + ' ' + user.data().lastName,
            avatar: {uri: user.data().avatarUrl},
            roomId: roomId.trim(),
          },
        ]);
      });
    };
    getData().catch(console.error);
  }, []);

  const onOpenModal = (user: any) => {
    setRoomSelected(user);
    setModal(true);
  };
  const onCloseModal = () => {
    setModal(false);
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Messages</Text>
          {/* <Button style={styles.filterButton}>
            <Filter />
          </Button> */}
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Image style={styles.searchIcon} source={images.search} />
            <TextInput
              placeholder="Search"
              placeholderTextColor={color.palette.GrayWithOpacity(0.4)}
              style={styles.inputSearch}
              ref={typingTimeOut}
              value={search}
              onChangeText={e => handleChangeSearch(e)}
            />
          </View>
        </View>
        <View style={styles.messageSection}>
          <Text style={styles.title}>Your DMs</Text>
          <View style={styles.messageList}>
            <FlatList
              data={ search.trim() === '' ? roomchat : listUserfilter}
              extraData={search}
              style={styles.messageList}
              renderItem={({item}) => (
                <MessageBox
                  roomId={item.roomId}
                  image={item.avatar}
                  username={item.userName}
                  unreadCount={item.unread}
                  hasStory={item.story}
                  onPress={() => onOpenModal(item)}
                />
              )}
            />
          </View>
        </View>
        {roomSelected === null ? (
          <></>
        ) : (
          <MessageModal
            onclose={onCloseModal}
            room={roomSelected}
            visible={modal}
            onRequestClose={onCloseModal}
          />
        )}
      </SafeAreaView>
    </>
  );
};
