import React from 'react';
import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

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

const PhoneLogin = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>My mobile</Text>
      <Text>
        Please enter your valid phone number. We will send you a 4-digit code to
        verify your account.{' '}
      </Text>
      <TextInput
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
        onPress={() => navigation.navigate('otpVerify')}>
        <Text style={{fontWeight: '700', fontSize: 16, color: 'white'}}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneLogin;
