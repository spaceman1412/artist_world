import React, {useEffect, useState} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {CommonType} from '@utils/types';
import SizedBox from '@components/sized-box';
import auth from '@react-native-firebase/auth';

interface Props {}
export const CreateAccount: CommonType.AppScreenProps<
  'createAccount',
  Props
> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email.trim(), password.trim())
      .then(() => {
        navigation.navigate('profileDetails');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const create = () => {
    auth()
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('profileDetails');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{width: 70}}>Email</Text>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize={'none'}
          style={{
            width: 200,
            height: 50,
            borderColor: 'black',
            borderWidth: 1,
            padding: 5,
          }}
        />
      </View>

      <SizedBox height={20} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{width: 70}}>Password</Text>

        <TextInput
          style={{
            width: 200,
            height: 50,
            borderColor: 'black',
            borderWidth: 1,
            padding: 5,
          }}
          value={password}
          autoCapitalize={'none'}
          onChangeText={text => setPassword(text)}
        />
      </View>

      <SizedBox height={10} />

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 50,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={login}>
          <Text style={{color: 'white'}}>Login</Text>
        </TouchableOpacity>

        <SizedBox width={10} />
        <TouchableOpacity
          style={{
            width: 100,
            height: 50,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={create}>
          <Text style={{color: 'white'}}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
