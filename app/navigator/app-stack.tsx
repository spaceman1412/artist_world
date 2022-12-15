import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppNavigatorParamList} from './navigator-param-list';
import * as SCREENS from '@screens';
import {ProfileStack} from './profile-stack';
import auth from '@react-native-firebase/auth';
import {TabStack} from './tab-stack';
import {EditProfileStack} from './edit-profile-stack';
import firestore from '@react-native-firebase/firestore';
import {LoaderScreen} from 'react-native-ui-lib';
import {color} from '@theme/color';

const Stack = createStackNavigator<AppNavigatorParamList>();

export const AppStack = () => {
  const [loginRoute, setLoginRoute] = React.useState();
  const initialRouteName = auth().currentUser ? loginRoute : 'login';
  console.log(auth().currentUser);

  React.useEffect(() => {
    const getUserData = async () => {
      const uid = await auth().currentUser.uid;

      const res = await firestore().collection('Users').doc(uid).get();

      console.log(res.data());

      if (res.data()) {
        setLoginRoute('tab');
      } else {
        setLoginRoute('profileDetails');
      }
    };

    getUserData().catch(console.error);
  });

  return !loginRoute && auth().currentUser ? (
    <LoaderScreen message="Happy waiting..." color={color.primary} />
  ) : (
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
    </Stack.Navigator>
  );
};
