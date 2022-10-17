import {
  Image,
  Pressable,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import { images } from '@assets/images';

const ForgotPassWord = ({navigation}) => {
  const [choice, setChoice] = React.useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={images.forgot_Password}
          style={{width: 250, height: 200}}
        />
      </View>
      <View>
        <Text style={styles.text}>
          Select which contact details should we use to reset your password
        </Text>
        <View>
          <Pressable
            style={choice === 1 ? styles.selected : styles.options}
            onPress={() => setChoice(1)}>
            <Image source={images.message} />
            <View style={styles.boxContent}>
              <Text style={styles.title}>Via SMS</Text>
              <Text style={styles.boxInfor}>+6282*******39</Text>
            </View>
          </Pressable>
          <Pressable
            style={choice === 2 ? styles.selected : styles.options}
            onPress={() => setChoice(2)}>
            <Image source={images.mail} />
            <View style={styles.boxContent}>
              <Text style={styles.title}>Via Email</Text>
              <Text style={styles.boxInfor}>ex***le@yourdomain.com</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('otpVerify')}>
        <Text style={styles.buttonContent}>Continue</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },

  selected: {
    flexDirection: 'row',
    padding: 17,
    borderColor: '#a57777',
    borderStyle: 'solid',
    borderRadius: 15,
    borderWidth: 3,
    marginTop: 10,
  },
  options: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  boxContent: {
    marginLeft: 20,
  },
  boxInfor: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#a57777',
    height: 55,
    borderRadius: 30,
    width: 370,
    marginBottom: 20,
  },
  buttonContent: {
    color: 'white',
    fontWeight: '500',
    fontSize: 25,
  },
});

export default ForgotPassWord;
