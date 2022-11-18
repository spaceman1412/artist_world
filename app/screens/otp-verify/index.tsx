import {CommonType} from '@utils/types';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  FlatList,
  LogBox,
} from 'react-native';
import GlobalStyles from '@theme/styles/global-style';
import NumericInput from './NumbericInput/NumbericInput';
import {color} from '@theme';
import * as React from 'react';
import NumberPad from './NumberPad/NumberPad';

interface Props {}
export const OTPverify: CommonType.AppScreenProps<'otpVerify', Props> = ({
  navigation,
  route,
}) => {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const confirmation = route.params.confirm;
  const [seconds, setSeconds] = React.useState(60);
  const [inputting, setInputting] = React.useState(0);
  const [codes, setCodes] = React.useState(Array(6).fill(''));

  async function confirmCode(code: string) {
    try {
      const result = await confirmation.confirm(code);

      console.log('Login done --> ', result)
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  const setCode = (value: string) => {
    setCodes(prev => {
        prev[inputting] = value;
        return prev;
    });
    setInputting(inputting + 1);

    if (inputting === codes.length - 1) {
      const codeConfirm = codes.join('');
      confirmCode(codeConfirm);
    }
  };

  const handleDelete = () => {
    setCodes(prev => {
        prev[inputting] = '';
        return prev;
    });

    if (inputting > 0) {
      setInputting(inputting - 1);
    }
  };

  React.useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds === 0) {
        navigation.navigate('phoneLogin');
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [navigation, seconds]);

  const Data = [
    {id: '1', onPress: () => setCode('1')},
    {id: '2', onPress: () => setCode('2')},
    {id: '3', onPress: () => setCode('3')},
    {id: '4', onPress: () => setCode('4')},
    {id: '5', onPress: () => setCode('5')},
    {id: '6', onPress: () => setCode('6')},
    {id: '7', onPress: () => setCode('7')},
    {id: '8', onPress: () => setCode('8')},
    {id: '9', onPress: () => setCode('9')},
    {id: 'space'},
    {id: '0', onPress: () => setCode('0')},
    {id: 'delete', onPress: () => handleDelete()},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.countDownContainer}>
        <Text style={[styles.countDown, GlobalStyles.textCenter]}>
          {seconds === 60
            ? '01:00'
            : seconds < 10
            ? '00:0' + seconds
            : '00:' + seconds}
        </Text>
        <Text style={styles.text}>Type the verification code</Text>
        <Text style={styles.text}>we've sent you</Text>
      </View>
      <View style={styles.inputGroup}>
        <NumericInput
          inputting={inputting === 0}
          filled={codes[0] !== ''}
          value={codes[0]}
          onPress={() => setInputting(0)}
        />
        <NumericInput
          value={codes[1]}
          inputting={inputting === 1}
          filled={codes[1] !== ''}
          onPress={() => setInputting(1)}
        />
        <NumericInput
          value={codes[2]}
          inputting={inputting === 2}
          filled={codes[2] !== ''}
          onPress={() => setInputting(2)}
        />
        <NumericInput
          value={codes[3]}
          inputting={inputting === 3}
          filled={codes[3] !== ''}
          onPress={() => setInputting(3)}
        />
        <NumericInput
          value={codes[4]}
          inputting={inputting === 4}
          filled={codes[4] !== ''}
          onPress={() => setInputting(4)}
        />
        <NumericInput
          value={codes[5]}
          inputting={inputting === 5}
          filled={codes[5] !== ''}
          onPress={() => setInputting(5)}
        />
      </View>

      <View style={[styles.numberPad]}>
        <FlatList data={Data} renderItem={NumberPad} numColumns={3} />
      </View>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('resetPassword')}>
        <Text style={styles.buttonContent}>Send again</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    backgroundColor: color.whiteBackground,
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: color.storybookTextColor,
  },
  phoneNumber: {
    fontWeight: 'bold',
  },
  inputGroup: {
    width: '100%',
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 85,
    height: 24,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonContent: {
    color: color.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  numberPad: {
    width: '100%',
    paddingHorizontal: 10,
  },
  countDown: {
    fontSize: 34,
    fontWeight: '700',
    color: color.storybookTextColor,
    height: 51,
  },
  countDownContainer: {
    margin: 15,
  },
});
