import {Button} from '@components';
import {color} from '@theme';
import {CommonType} from '@utils/types';
import * as React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import UserCart from './user-card';
import SortArrow from '@assets/images/sort-two.svg';
import {matchList} from './data';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import { useAppDispatch, useAppSelector } from '@store/hook';
import { MatchAction } from '@store/match/reducer';

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
  const {matchList} = useAppSelector(state => state.match)
  const fetchUserMatch = async() =>{
    const data = await firestore()
    .collection('user-match')
    .doc(auth().currentUser.uid)
    .get()
    .then((valueData) =>{
      if(valueData.exists)
      {
        const value = valueData.data();
        dispatch(MatchAction.updateMatchList(value.matches))
        return value;
      }
      else{
        dispatch(MatchAction.createNewMatchUser())
        return []
      }
    })
    return data;
  }

  React.useEffect(() =>{
    fetchUserMatch().catch(console.error)
  },[])

  const handleHeartPress = () => {};
  const handleUnMatchPress = (userId: string) => {
    dispatch(MatchAction.removeMatchUser(userId))
  };
  const handleGotoDetail= (userId: string) =>{
    navigation.navigate('profileDetail',{
      uid: userId
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Matches</Text>
        <Button style={styles.sortButton}>
          <SortArrow />
        </Button>
      </View>
      <Text style={styles.introduce}>
        This is a list of people who have liked you and your matches
      </Text>
      <View style={styles.matchedListContainer}>
        <FlatList
          data={matchList}
          numColumns={2}
          renderItem={({item}) => (
            <UserCart
              onPress={() => handleGotoDetail(item.trim())}
              userID ={item}
              onHeartPress={handleHeartPress}
              onStokePress={() => handleUnMatchPress(item)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
