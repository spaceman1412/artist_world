import {Button} from '@components';
import SizedBox from '@components/sized-box';
import {color} from '@theme';
import {CommonType} from '@utils/types';
import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Incubator} from 'react-native-ui-lib';
import firestore from '@react-native-firebase/firestore';

interface Props {}

const styles = StyleSheet.create({
  header: {
    fontWeight: '700',
    fontSize: 34,
  },
});

export const Profile: CommonType.AppScreenProps<'profile', Props> = ({
  navigation,
}) => {
  const onSend = () => {
    firestore()
      .collection('Users')
      .add({
        name: 'Ada Lovelace',
        age: 30,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  return (
    <View
      style={{flex: 1, backgroundColor: color.whiteBackground, padding: 40}}>
      <Text style={styles.header}>Profile details</Text>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 25,
          backgroundColor: 'red',
        }}
      />

      <SizedBox height={10} />

      <Incubator.TextField
        placeholder={'Placeholder'}
        floatingPlaceholder
        containerStyle={{backgroundColor: 'gray'}}
      />
      <SizedBox height={10} />
      <Incubator.TextField
        placeholder={'Placeholder'}
        floatingPlaceholder
        containerStyle={{backgroundColor: 'gray'}}
      />

      <SizedBox height={10} />

      <Button text="Send" onPress={onSend} />
    </View>
  );
};

export default Profile;
