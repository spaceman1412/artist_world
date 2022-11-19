import {CommonType} from '@utils/types';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Flag from '@components/flag/flag';
import { images } from '@assets/images';
import { color } from '@theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 128,
    paddingHorizontal: 40,
  },
  title:{
    fontSize: 14,
    lineHeight: 21,
    color: color.storybookTextColor,
    width: 295,
    marginBottom: 32,
  },
  headingText: {
    fontWeight: '700',
    fontSize: 34,
    color: color.storybookTextColor,
  },
  phoneBox:{
    width: 295,
    height: 58,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'rgba(232, 230, 234, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
  },
  flags:{
    width: 20,
    height: 15,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  countryPicker:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: color.palette.mischka,
    width: 100,
    
  },
  inputText:{
    color: color.storybookTextColor,
    fontSize: 14,
  },
  input:{
    width: 160,
    color: color.storybookTextColor,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  icon:{
    width: 10,
    height: 10,
    margin: 2,
  }
});

interface Props {}

export const PhoneLogin: CommonType.AppScreenProps<'phoneLogin', Props> = ({
  navigation,
  route
}) => {
  var countryCode = 'VN'
  var countryNumber = '+84 '
  if(route.params?.flagCode)
  {
    countryCode = route.params?.flagCode
    countryNumber = route.params?.flagNumber
  }
  const [phone, setPhone] = React.useState('');
  const onPressContinue = () => {
    const phoneNumber = countryNumber + phone 
    console.log('phone Number', phoneNumber)
    auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(resolve => {
        navigation.navigate('otpVerify', {
          confirm: resolve,
        });
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>My mobile</Text>
      <Text style={styles.title}>
        Please enter your valid phone number. We will send you a 6-digit code to
        verify your account.{' '}
      </Text>
      <View style={styles.phoneBox}>
      <TouchableOpacity 
      style={styles.countryPicker}
      onPress={() => navigation.navigate('selectCountry')}>
        <Flag code={countryCode}
        style={styles.flags}/>
        <Text style={styles.inputText}>({countryNumber})</Text>
        <Image source={images.dropdown} style={styles.icon}/>
      </TouchableOpacity>
      <TextInput
        value={phone}
        onChangeText={text => setPhone(text)}
        style={styles.input}
        keyboardType='numeric'
        maxLength={11}
        />
        </View>

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
