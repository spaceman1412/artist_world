import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from 'react-native';

const ResetPassword = ({navigation}) => {
  const [inputting, setInputting] = React.useState('');
  const [hidePassword, setHidePassword] = React.useState([true, true]);
  const [password, setPassword] = React.useState('');
  console.log(password);
  const [secondpassword, setSecondPassword] = React.useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{width: 200, height: 200}}
        source={require('./img/rotation_lock.png')}
      />
      <View style={styles.contentContainer}>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 26,
            color: 'black',
            fontWeight: '700',
          }}>
          Create new password
        </Text>
        <View>
          <Text style={styles.title}>
            New Password <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TouchableOpacity
            onPress={() => setInputting('newpass')}
            style={
              inputting === 'newpass' ? styles.inputting : styles.inputPassword
            }>
            <TextInput
              secureTextEntry={hidePassword[0]}
              style={{fontSize: 17, width: 300}}
              onPressIn={() => setInputting('newpass')}
              placeholder={'New Password'}
              value={secondpassword}
              onChangeText={text => setSecondPassword(text)}
            />
            <Pressable
              onPress={() => setHidePassword([!hidePassword[0], true])}>
              <Image
                source={
                  !hidePassword[0]
                    ? require('./img/eye.png')
                    : require('./img/eye_off.png')
                }
              />
            </Pressable>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>
            Confirm New Password <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TouchableOpacity
            style={
              inputting === 'confirm' ? styles.inputting : styles.inputPassword
            }
            onPress={() => setInputting('confirm')}>
            <TextInput
              onPressIn={() => setInputting('confirm')}
              secureTextEntry={hidePassword[1]}
              style={{fontSize: 17, width: 300}}
              placeholder={'Confirm New Password'}
              value={password}
              onChangeText={(e: any) => setPassword(e)}
            />
            <Pressable
              onPress={() => setHidePassword([true, !hidePassword[1]])}>
              <Image
                source={
                  !hidePassword[1]
                    ? require('./img/eye.png')
                    : require('./img/eye_off.png')
                }
              />
            </Pressable>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 30}}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('resetDone')}>
          <Text style={styles.buttonContent}>Save</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  contentContainer: {
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 5,
    fontWeight: '500',
    color: 'gray',
  },

  inputPassword: {
    borderWidth: 2,
    borderColor: '#e8eaed',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 30,
    height: 50,
  },
  inputting: {
    borderWidth: 3,
    borderColor: '#a57777',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 30,
    height: 49,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    width: 370,
    backgroundColor: '#a57777',
    height: 55,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonContent: {
    color: 'white',
    fontWeight: '500',
    fontSize: 25,
  },
});
export default ResetPassword;
