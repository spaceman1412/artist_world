import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {CommonType} from '@utils/types';
import SizedBox from '@components/sized-box';
import auth from '@react-native-firebase/auth';
import LoginIcon from '@assets/images/login-screen-icon.svg';
import {color} from '@theme';
import {Button} from '@components';
import BackIcon from '@assets/images/back-arrow.svg';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

interface Props {}
export const CreateAccount: CommonType.AppScreenProps<
  'createAccount',
  Props
> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toggle, setToggle] = useState(true);
  const [error, setError] = useState({isError: false, message: ''});

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email.trim(), password.trim())
      .then(() => {
        navigation.navigate('tab', {
          screen: 'discover',
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const create = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Please enter your email address/ password');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('profileDetails');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setError({
            isError: true,
            message: 'That email address is already in use!',
          });
          setEmail('');
          setPassword('');
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setError({isError: true, message: 'That email address is invalid!'});
          setEmail('');
          setPassword('');
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <>
      <View style={styles.header}>
        <Button style={styles.buttonHeader} onPress={() => navigation.goBack()}>
          <BackIcon />
        </Button>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '50%',
          backgroundColor: color.palette.white,
        }}>
        <View>
          <LoginIcon />
        </View>

        {/* <SizedBox height={50} /> */}

        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              width: 70,
              fontWeight: 'bold',
              color: color.primary,
              alignSelf: 'flex-start',
              marginLeft: '10%',
            }}>
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            autoCapitalize={'none'}
            style={{
              width: '80%',
              height: 40,
              borderBottomColor: 'grey',
              borderBottomWidth: 2,
              padding: 5,
              fontWeight: 'bold',
              color: color.storybookTextColor,
            }}
          />
        </View>

        {/* <SizedBox height={50} /> */}

        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              width: 70,
              fontWeight: 'bold',
              color: color.primary,
              alignSelf: 'flex-start',
              marginLeft: '10%',
            }}>
            Password
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              // alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              style={{
                width: '80%',
                height: 40,
                borderBottomColor: 'grey',
                borderBottomWidth: 2,
                padding: 5,
                fontWeight: 'bold',
                color: color.storybookTextColor,
              }}
              secureTextEntry={toggle ? true : false}
              value={password}
              autoCapitalize={'none'}
              onChangeText={text => setPassword(text)}
            />
            {/* <SizedBox width={-10}/> */}
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                // backgroundColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: -30,
              }}
              onPress={() => setToggle(!toggle)}>
              {toggle ? (
                <Icon name="eye-outline" size={20} />
              ) : (
                <Icon name="eye-off-outline" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={{alignItems: 'flex-start', width: '80%'}}>
          {error.isError && (
            <>
              <Text style={styles.error}>{error.message}</Text>
            </>
          )}
        </View>
        {/* <SizedBox height={10} /> */}

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              width: 200,
              height: 50,
              backgroundColor: color.primary,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
            }}
            onPress={login}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Login</Text>
          </TouchableOpacity>

          <SizedBox width={20} />
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              borderColor: color.primary,
              borderWidth: 1,
            }}
            onPress={create}>
            <Text style={{color: color.primary, fontWeight: 'bold'}}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 10,
    height: 10,
    margin: 2,
  },
  error: {
    color: color.error,
  },
  header: {
    paddingVertical: 46,
    paddingHorizontal: 16,
    backgroundColor: color.palette.white,
  },
  buttonHeader: {
    width: 52,
    height: 52,
    borderColor: color.palette.mischka,
    backgroundColor: color.transparent,
    borderWidth: 1,
    borderRadius: 15,
  },
  title: {
    color: color.storybookTextColor,
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 28.5,
  },
});
