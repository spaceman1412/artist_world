import * as React from 'react';
import {CommonType} from '@utils/types';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@components';
import LoginIcon from '@assets/images/login-screen-icon.svg';
import Google from '@assets/images/google-icon.svg';
import {color} from '@theme';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    color: color.storybookTextColor,
  },
  image: {
    width: 110,
    height: 100,
  },
  buttonEmail: {
    width: 295,
    height: 56,
    backgroundColor: color.primary,
    borderRadius: 15,
    marginVertical: 20,
  },
  textEmailButton: {
    fontSize: 16,
    fontWeight: '700',
  },
  buttonPhone: {
    width: 295,
    height: 56,
    borderRadius: 15,
    borderColor: color.palette.mischka,
  },
  textPhoneButton: {
    color: color.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  buttonsContainer: {
    marginVertical: 10,
  },
  dividerContainer: {
    width: 295,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dividerText: {
    width: 94,
    backgroundColor: color.palette.white,
    color: color.storybookTextColor,
    fontSize: 12,
    textAlign: 'center',
  },
  divider: {
    height: 0.5,
    width: 94,
    backgroundColor: color.palette.blackWithOpacity(0.4),
  },
  otherLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherLoginButton: {
    width: 64,
    height: 64,
    borderRadius: 15,
    borderColor: color.palette.mischka,
    marginHorizontal: 20,
  },
});

interface Props {}

export const Login: CommonType.AppScreenProps<'login', Props> = ({
  navigation,
}) => {
  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true}).then(
        async value => {
          if (value) {
            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = await auth.GoogleAuthProvider.credential(
              idToken,
            );

            // Sign-in the user with the credential

            const userCedential = await auth().signInWithCredential(
              googleCredential,
            );

            if (userCedential.user) {
              if (userCedential.additionalUserInfo.isNewUser === true) {
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
              } else {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [
                      {
                        name: 'tab',
                      },
                    ],
                  }),
                );
              }
            }
          }
        },
      );
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <LoginIcon />
      <View>
        <Text style={styles.title}>Sign up to continue</Text>
        <View style={styles.buttonsContainer}>
          <Button
            text={'Continue with email'}
            style={styles.buttonEmail}
            textStyle={styles.textEmailButton}
            onPress={() => navigation.navigate('createAccount')}
          />
        </View>
      </View>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or sign up with</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.otherLoginContainer}>
        <Button
          preset="outline"
          onPress={onGoogleButtonPress}
          style={styles.otherLoginButton}>
          <Google />
        </Button>
      </View>
    </View>
  );
};
