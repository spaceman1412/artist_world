import {Button} from '@components';
import {color} from '@theme';
import {CommonType} from '@utils/types';
import * as React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import UserCart from './user-card';
import SortArrow from '@assets/images/sort-two.svg';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useAppDispatch, useAppSelector} from '@store/hook';
import {MatchAction} from '@store/match/reducer';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.whiteBackground,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 40,
  },
  matchedListContainer: {
    marginHorizontal: 40,
    marginTop: 20,
    flex: 1,
  },
  title: {
    color: color.storybookTextColor,
    fontSize: 34,
    fontWeight: '700',
  },
  sortButton: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: color.transparent,
    borderWidth: 1,
    borderColor: color.palette.mischka,
  },
  introduce: {
    fontSize: 16,
    color: color.storybookTextColor,
    lineHeight: 24,
    marginHorizontal: 40,
  },
});

interface Props {}

export const MatchList: CommonType.AppScreenProps<'matchList', Props> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const {fetch} = useAppSelector(state => state.match);
  const [userlist, setUserlist] = React.useState([]);
  const fetchUserMatch = async () => {
    const data = await firestore()
      .collection('user-match')
      .doc(auth().currentUser.uid)
      .get()
      .then(valueData => {
        if (valueData.exists) {
          const value = valueData.data();
          dispatch(MatchAction.updateMatchList(value.matches));
          dispatch(MatchAction.updateMatchListFlag(true));
          let userInfoList = Promise.all(
            value.matches.map(async item => {
              let value = await firestore().collection('Users').doc(item).get();
              return {value: value.data(), item};
            }),
          );
          userInfoList.then(value => setUserlist(value));

          return value;
        } else {
          dispatch(MatchAction.createNewMatchUser());
          dispatch(MatchAction.updateMatchListFlag(true));
          return [];
        }
      });
    return data;
  };
  React.useEffect(() => {
    fetchUserMatch().catch(console.error);
  }, [fetch]);

  const handleReload = () => {
    fetchUserMatch().catch(console.error);
  };

  const handleHeartPress = () => {};
  const handleUnMatchPress = (userId: string) => {
    dispatch(MatchAction.removeMatchUser(userId));
    setUserlist(userlist.filter(item => item.item !== userId));
  };
  const handleGotoDetail = (userId: string) => {
    navigation.navigate('profileDetail', {
      uid: userId,
    });
  };
  console.log('render');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Matches</Text>
        <Button onPress={handleReload} style={styles.sortButton}>
          <Icon size={25} name={'reload'} color={color.primary} />
        </Button>
      </View>
      <Text style={styles.introduce}>
        This is a list of people who have liked you and your matches
      </Text>
      <View style={styles.matchedListContainer}>
        <FlatList
          data={userlist}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <UserCart
              image={item.value.avatarUrl}
              name={item.value.firstName + ' ' + item.value.lastName}
              onPress={() => handleGotoDetail(item.item.trim())}
              userID={item.item}
              onHeartPress={handleHeartPress}
              onStokePress={() => handleUnMatchPress(item.item)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
