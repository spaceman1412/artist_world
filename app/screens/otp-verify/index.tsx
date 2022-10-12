import * as React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Pressable,
} from 'react-native';

const NumericInput = ({value, onChangeText}) => {
  return (
    <TextInput
      onChangeText={onChangeText}
      value={value}
      style={styles.input}
      maxLength={1}
      keyboardType="numeric"
      returnKeyType="next"
    />
  );
};

const OTPverify = ({navigation}) => {
  const [seconds, setSeconds] = useState(60);
  const [codes, setCodes] = React.useState({
    1: '',
    2: '',
    3: '',
    4: '',
  });

  const setCode = (key: number, value: string) => {
    setCodes(prev => ({...prev, [key]: value}));
  };

  const countdown = setInterval(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    } else {
      setSeconds(60);
      clearInterval(countdown);
    }
  }, 1000);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.text}>
          Code has been send to{' '}
          <Text style={styles.phoneNumber}>+0705980780</Text>
        </Text>
        <View style={styles.inputGroup}>
          <NumericInput
            value={codes[1]}
            onChangeText={(value: string) => setCode(1, value)}
          />
          <NumericInput
            value={codes[2]}
            onChangeText={(value: string) => setCode(2, value)}
          />
          <NumericInput
            value={codes[3]}
            onChangeText={(value: string) => setCode(3, value)}
          />
          <NumericInput
            value={codes[4]}
            onChangeText={(value: string) => setCode(4, value)}
          />
        </View>
        <Text style={styles.text}>
          Resend code in <Text style={styles.phoneNumber}>{seconds}</Text> s
        </Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('resetPassword')}>
        <Text style={styles.buttonContent}>Verify</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  view: {
    display: 'flex',
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 250,
  },
  text: {
    fontSize: 16,
  },
  phoneNumber: {
    fontWeight: 'bold',
  },
  input: {
    height: 60,
    width: 60,
    fontSize: 22,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e06c75',
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
  },
  inputGroup: {
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  button: {
    padding: 10,
    width: 370,
    backgroundColor: '#e06c75',
    height: 55,
    borderRadius: 30,
    marginBottom: 20,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonContent: {
    color: 'white',
    fontWeight: '500',
    fontSize: 25,
  },
});

export default OTPverify;
