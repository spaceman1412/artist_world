import {Button} from '@components';
import {color} from '@theme';
import {CommonType} from '@utils/types';
import * as React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import UserCart from './user-card';
import SortArrow from '@assets/images/sort-two.svg';
import {matchList} from './data';

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
  const handleHeartPress = () => {};
  const handleUnMatchPress = () => {};
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
              name={item.name}
              age={item.age}
              image={item.image}
              onHeartPress={handleHeartPress}
              onStokePress={handleUnMatchPress}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
