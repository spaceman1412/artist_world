import {CommonType} from '@utils/types';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 128,
    paddingHorizontal: 40,
  },

  headingText: {
    fontWeight: '700',
    fontSize: 34,
  },
});

interface Props {}

export const PhoneLogin: CommonType.AppScreenProps<'otpVerify', Props> = ({
  navigation,
}) => {
  const [phone, setPhone] = React.useState('');
  const [confirm, setConfirm] = React.useState(null);
  const onPressContinue = () => {
    auth()
      .signInWithPhoneNumber(phone)
      .then(resolve => {
        navigation.navigate('otpVerify', {
          confirm: resolve,
        });
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>My mobile</Text>
      <Text>
        Please enter your valid phone number. We will send you a 4-digit code to
        verify your account.{' '}
      </Text>
      <TextInput
        value={phone}
        onChangeText={text => setPhone(text)}
        style={{
          width: 295,
          height: 58,
          borderWidth: 1,
          borderRadius: 15,
          borderColor: 'rgba(232, 230, 234, 1)',
          marginTop: 32,
        }}
      />

      <TouchableOpacity
        style={{
          width: 295,
          height: 56,
          backgroundColor: 'rgba(233, 64, 87, 1)',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 64,
        }}
        onPress={onPressContinue}>
        <Text style={{fontWeight: '700', fontSize: 16, color: 'white'}}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};
