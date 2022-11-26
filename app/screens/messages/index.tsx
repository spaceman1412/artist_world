import {Button, MessageBox} from '@components';
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
import Filter from '@assets/images/filter.svg';
import {images} from '@assets/images';
import {color} from '@theme';
import MessageModal from '@components/messageModal/messageModal';
import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
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
  const handleChangeSearch = (e:any) =>{
    if (typingTimeOut.current) {
      clearTimeout(typingTimeOut.current);
    }
    typingTimeOut.current = setTimeout(() => {
      let search = e.trim();
      let filter = roomchat!.filter(item => {
        if (search === '') {
          return item;
        } else {
          return item.userName.toLowerCase().includes(search.toLowerCase().trim());
        }
      });
      setListUserFiler(filter);
    }, 600);
    setSearch(e);
  }
  const findUser = async (userId: any) => {
    const id =
      userId[0].trim() === 'pKqkxRR4uRfWmZ4JwXZi'
        ? userId[1].trim()
        : userId[0].trim();
    return firestore()
      .collection('Users')
      .doc(id)
      .get()
      .then(documentSnapshot => {
        return documentSnapshot.data();
      });
  };

  React.useLayoutEffect(() => {
      const getData = async () => {
      const res = await firestore()
        .collection('user-chat')
        .doc('pKqkxRR4uRfWmZ4JwXZi')
        .get();
        setRoomChats([]);
        const data = res.data();
        data.roomId.forEach(async element => {
            firestore().collection('chat-messages')
            .doc(element.trim())
            .get()
            .then(async value => {
              const user = await findUser(value.data().members)
              setRoomChats(prev => [...prev,{
                userName: user.firstName + ' ' + user.lastName,
                avatar: {uri: user.avatarUrl},
                roomId: element,
              }])
            })
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
      {roomchat.length === 0 ? (
        <></>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Messages</Text>
            <Button style={styles.filterButton}>
              <Filter />
            </Button>
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
            <Text style={styles.title}>Messages</Text>
            <View style={styles.messageList}>
              <FlatList
                data={
                listUserfilter.length === 0 ? 
                roomchat : listUserfilter}
                extraData={listUserfilter}
                style={styles.messageList}
                renderItem={({item}) => (
                  <MessageBox
                    roomId={item.roomId}
                    image={item.avatar}
                    username={item.userName}
                    unreadCount={item.unread}
                    hasStory={item.story}
                    onPress={() => onOpenModal(item)} message={''} time={''}                  />
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
      )}
    </>
  );
};
