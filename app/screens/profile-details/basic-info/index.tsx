import {Button, UploadImage} from '@components';
import {CommonType} from '@utils/types';
import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import DateTimePicker from '@components/date-time-picker/date-time-picker';
import SizedBox from '@components/sized-box';
import {styles} from '../style';
import {useAppDispatch, useAppSelector} from '@store/hook';
import {ProfileActions} from '@store/profile/reducer';
import {color} from '@theme';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

interface Props {}

export const BasicInfo: CommonType.ProfileDetailsScreenProps<
  'basicInfo',
  Props
> = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('Choose your birth date');
  const [toggle, setToggle] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatcher = useAppDispatch();

  const location = useAppSelector(state => state.profile.location);

  const [dateTimePicker, setDateTimePicker] = useState(false);

  const create = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Please enter your email address/ password');
      return;
    }
    await auth()
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then(() => {
        console.log('User account created & signed in!');
        if (onValidate()) {
          const data = {
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            location: location,
          };
          dispatcher(ProfileActions.updateBasicInfo(data));
          navigation.navigate('sexSelect');
        } else {
          Alert.alert('Wrong data input');
        }
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setEmail('');
          setPassword('');
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setEmail('');
          setPassword('');
          Alert.alert('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const onValidate = () => {
    // dua validate vao ham create
    console.log(firstName, lastName, location, birthDate);
    if (
      firstName !== '' &&
      lastName !== '' &&
      location !== '' &&
      birthDate !== 'Choose your birth date'
    ) {
      return true;
    } else {
      return false;
    }
  };

  // const uploadFile = async () => {
  //   if (imagePath) {
  //     const split = imagePath.split('/');
  //     const fileName = split[split.length - 1];
  //     const reference = await storage().ref(`${uid}-${fileName}`);

  //     const pathToFile = imagePath;
  //     const url = await reference.putFile(pathToFile);
  //     return url.metadata.fullPath;
  //   }
  // };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile details</Text>
        <SizedBox height={20} />

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>First name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={firstName}
              onChangeText={text => setFirstName(text)}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Last name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={lastName}
              onChangeText={text => setLastName(text)}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={password}
              secureTextEntry={toggle ? true : false}
              onChangeText={text => setPassword(text)}
              autoCapitalize="none"
              style={styles.input}
            />
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginEnd: 15,
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

        <Button
          style={styles.birthdayButton}
          textStyle={{color: color.palette.Blue30, fontSize: 16}}
          text={location || 'Choose Your City'}
          onPress={() => navigation.navigate('selectCity')}
        />

        <TouchableOpacity
          style={styles.birthdayButton}
          onPress={() => setDateTimePicker(true)}>
          <Text style={styles.textButtonBirthday}>{birthDate}</Text>
        </TouchableOpacity>
        <SizedBox height={20} />
        <Button
          text={'Create the account'}
          style={styles.buttonConfirmStyle}
          onPress={create}
        />

        <DateTimePicker
          visible={dateTimePicker}
          onSave={value => {
            setBirthDate(value);
            setDateTimePicker(false);
          }}
          onBackPress={() => setDateTimePicker(false)}
        />
      </View>
    </SafeAreaView>
  );
};
