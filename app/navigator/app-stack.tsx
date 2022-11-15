import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppNavigatorParamList} from './navigator-param-list';
import * as SCREENS from '@screens';

const Stack = createStackNavigator<AppNavigatorParamList>();
export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="customContent"
        component={SCREENS.CustomContent}
        options={{title: 'Custom Content'}}
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
    </Stack.Navigator>
  );
};
