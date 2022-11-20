import {Button, UploadImage} from '@components';
import SizedBox from '@components/sized-box';
import {color} from '@theme';
import {CommonType} from '@utils/types';
import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Incubator} from 'react-native-ui-lib';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
  const [pic, setPic] = React.useState('');
  const onSend = async () => {
    var parts = pic.split('/');
    var picRef = parts[parts.length - 1];
    console.log(picRef);
    const ref = storage().ref(picRef);
    await ref.putFile(pic);
    const url = await storage().ref(picRef).getDownloadURL();

    firestore()
      .collection('Users')
      .add({
        name: 'Ada Lovelace',
        age: 30,
        pic: url,
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
