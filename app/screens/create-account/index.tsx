import React, {useState} from 'react';
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
import {CommonActions} from '@react-navigation/native';

interface Props {}
export const CreateAccount: CommonType.AppScreenProps<
  'createAccount',
  Props
> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (email !== '' && password !== '') {
      return true;
    }
    return false;
  };

  const login = () => {
    if (validate()) {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email.trim(), password.trim())
        .then(() => {
          navigation.navigate('tab', {
            screen: 'discover',
          });
        })
        .catch(error => {
          Alert.alert('Wrong username or password, please try again');
        });
    } else {
      Alert.alert('Please enter a username and password');
    }
  };

  const create = () => {
    !loading &&
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: 'profileDetails',
            },
          ],
        }),
      );
  };

  return (
    <>
      <View style={styles.header}>
        <Button
          style={styles.buttonHeader}
          onPress={() => !loading && navigation.goBack()}>
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
            disabled={loading}
            onPress={login}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {loading ? 'Logining....' : 'Login'}
            </Text>
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
