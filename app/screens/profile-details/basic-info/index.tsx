import {Button, UploadImage} from '@components';
import {CommonType} from '@utils/types';
import * as React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import DateTimePicker from '@components/date-time-picker/date-time-picker';
import GlobalStyles from '@theme/styles/global-style';
import SizedBox from '@components/sized-box';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {styles} from '../style';
import auth from '@react-native-firebase/auth';

interface Props {}

export const BasicInfo: CommonType.ProfileDetailsScreenProps<
  'basicInfo',
  Props
> = ({navigation}) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('Choose your birth date');
  const uid = auth().currentUser.uid;

  const [dateTimePicker, setDateTimePicker] = React.useState(false);

  const [imagePath, setImagePath] = React.useState(null);

  const onValidate = () => {
    if (
      firstName !== '' &&
      lastName !== '' &&
      birthDate !== 'Choose your birth date' &&
      imagePath
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onConfirm = async () => {
    try {
      const fileName = await uploadFile();

      const ref = storage().ref(fileName);

      const validate = await onValidate();

      if (ref && validate) {
        ref.getDownloadURL().then(url => {
          firestore()
            .collection('Users')
            .doc(uid)
            .set({
              firstName: firstName,
              lastName: lastName,
              birthDate: birthDate,
              avatarUrl: url,
            })
            .then(() => {
              navigation.navigate('discover');
            });
        });
      } else {
        Alert.alert('Your data is invalid');
      }
    } catch (error) {
      console.log(imagePath);
      Alert.alert('Error', 'Some error occurred. Please try again');
    }
  };

  const uploadFile = async () => {
    if (imagePath) {
      const split = imagePath.split('/');
      const fileName = split[split.length - 1];
      const reference = await storage().ref(`${uid}-${fileName}`);

      const pathToFile = imagePath;
      const url = await reference.putFile(pathToFile);
      return url.metadata.fullPath;
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        {/* <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonContent}>Skip</Text>
        </TouchableOpacity> */}
        <Text style={styles.title}>Profile details</Text>
        <SizedBox height={20} />
        <View style={GlobalStyles.itemCenter}>
          <UploadImage onUpload={value => setImagePath(value)} />
        </View>

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
        <TouchableOpacity
          style={styles.birthdayButton}
          onPress={() => setDateTimePicker(true)}>
          <Text style={styles.textButtonBirthday}>{birthDate}</Text>
        </TouchableOpacity>
        <SizedBox height={20} />
        <Button
          text={'Confirm'}
          style={styles.buttonConfirmStyle}
          onPress={onConfirm}
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
