import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppNavigatorParamList} from './navigator-param-list';
import * as SCREENS from '@screens';
import {ProfileStack} from './profile-stack';
import auth from '@react-native-firebase/auth';
import {TabStack} from './tab-stack';
import {EditProfileStack} from './edit-profile-stack';
import firestore from '@react-native-firebase/firestore';

const Stack = createStackNavigator<AppNavigatorParamList>();

const checkUserDatabase = async () => {
  // Check if user has in database or not
  const uid = await auth().currentUser.uid;

  const res = await firestore().collection('Users').doc(uid).get();

  if (res.data()) {
    return true;
  } else {
    return false;
  }
};

export const AppStack = () => {
  const initialRouteName = auth().currentUser
    ? checkUserDatabase()
      ? 'tab'
      : 'profileDetails'
    : 'login';

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="tab"
        component={TabStack}
        options={{headerShown: false, headerTitle: 'Home'}}
      />
      <Stack.Screen name="home" component={SCREENS.Home} />
      <Stack.Screen
        name="resetDone"
        component={SCREENS.ResetDone}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="findOutMatch"
        component={SCREENS.FindOutMatch}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="resetPassword"
        component={SCREENS.ResetPassword}
        options={{title: 'Reset Password'}}
      />
      <Stack.Screen
        name="forgot"
        component={SCREENS.ForgotPassWord}
        options={{title: 'Forgot Password'}}
      />
      <Stack.Screen
        name="otpVerify"
        component={SCREENS.OTPverify}
        options={{
          title: 'OTP Verification',
        }}
      />
      <Stack.Screen
        name="profileDetails"
        component={ProfileStack}
        options={{
          headerShown: false,
          headerTitle: 'Profile Details',
        }}
      />
      <Stack.Screen
        name="counter"
        component={SCREENS.Counter}
        options={{
          title: 'Counter',
        }}
      />

      <Stack.Screen name="prologue" component={SCREENS.Prologue} />
      <Stack.Screen name="selectCountry" component={SCREENS.SelectCountry} />
      <Stack.Screen
        name="phoneLogin"
        component={SCREENS.PhoneLogin}
        options={{headerTitle: 'Phone Login'}}
      />

      <Stack.Screen
        name="createAccount"
        component={SCREENS.CreateAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="login"
        component={SCREENS.Login}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="messages"
        component={SCREENS.Messages}
        options={{
          headerTitle: 'Messages',
        }}
      />
      <Stack.Screen name="discover" component={SCREENS.Discover} />
      <Stack.Screen name="profile" component={SCREENS.Profile} />
      <Stack.Screen
        name="profileDetail"
        component={SCREENS.ProfileDetail}
        options={{headerShown: false, headerTitle: 'Profile Detail'}}
      />
      <Stack.Screen
        name="editProfiles"
        component={EditProfileStack}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="selectCity"
        component={SCREENS.SelectCity}
        options={{headerTitle: 'Select City'}}
      />
    </Stack.Navigator>
  );
};
