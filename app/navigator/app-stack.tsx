import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppNavigatorParamList} from './navigator-param-list';
import * as SCREENS from '@screens';
import {ProfileStack} from './profile-stack';
import auth from '@react-native-firebase/auth';
import {TabStack} from './tab-stack';

const Stack = createStackNavigator<AppNavigatorParamList>();

const initialRouteName = auth().currentUser ? 'findOutMatch' : 'login';

export const AppStack = () => {
  return (

    <Stack.Navigator initialRouteName={'tab'}>
      <Stack.Screen
        name="tab"
        component={TabStack}
        options={{headerShown: false}}
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
          title: 'Forgot Password',
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
      <Stack.Screen name="phoneLogin" component={SCREENS.PhoneLogin} />

      <Stack.Screen name="createAccount" component={SCREENS.CreateAccount} />
      <Stack.Screen
        name="login"
        component={SCREENS.Login}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="messages"
        component={SCREENS.Messages}
        options={{headerShown: false}}
      />
      <Stack.Screen name="discover" component={SCREENS.Discover} />
      <Stack.Screen name="profile" component={SCREENS.Profile} />

        name="profileDetail"
        component={SCREENS.ProfileDetail}
        options={{headerShown: false}}
      />

    </Stack.Navigator>
  );
};
