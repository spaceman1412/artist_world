import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ForgotPassWord from '@screens/ForgotPassWord';
import Home from '@screens/Home';
import ResetDone from '@screens/ResetDone';
import ResetPassword from '@screens/ResetPassword';
import OTPverify from '@screens/OTPverify';
import Counter from '@screens/Counter';

const Stack = createStackNavigator();
export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Counter">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ResetDone"
        component={ResetDone}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{title: 'Reset Password'}}
      />
      <Stack.Screen
        name="Forgot"
        component={ForgotPassWord}
        options={{title: 'Forgot Password'}}
      />
      <Stack.Screen
        name="OTPverify"
        component={OTPverify}
        options={{
          title: 'Forgot Password',
        }}
      />

      <Stack.Screen
        name="Counter"
        component={Counter}
        options={{
          title: 'Counter',
        }}
      />
    </Stack.Navigator>
  );
};
