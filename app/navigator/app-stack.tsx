import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ForgotPassWord from '@screens/forgot-password';
import Home from '@screens/Home';
import ResetDone from '@screens/reset-done';
import ResetPassword from '@screens/reset-password';
import OTPverify from '@screens/otp-verify';
// import Counter from '@screens/counter';
import Prologue from '@screens/prologue';
import PhoneLogin from '@screens/phone-login';
import SelectCountry from '@screens/SelectCountry';
import EditProfile from '@screens/Edit-profile';

const Stack = createStackNavigator();
export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="editProfile">
      <Stack.Screen name='editProfile'
      component={EditProfile}
      options={{
        title: 'Fill Your Profile'
      }}/>
      <Stack.Screen 
      name='selectCountry'
      component={SelectCountry}
      options={{
        title: 'Select Your Country'
      }}/>
      <Stack.Screen name="home"
       component={Home} />
      <Stack.Screen
        name="resetDone"
        component={ResetDone}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="resetPassword"
        component={ResetPassword}
        options={{title: 'Reset Password'}}
      />
      <Stack.Screen
        name="forgot"
        component={ForgotPassWord}
        options={{title: 'Forgot Password'}}
      />
      <Stack.Screen
        name="otpVerify"
        component={OTPverify}
        options={{
          title: 'Forgot Password',
        }}
      />

      {/* <Stack.Screen
        name="counter"
        component={Counter}
        options={{
          title: 'Counter',
        }}
      /> */}
      

      <Stack.Screen name="prologue" component={Prologue} />

      <Stack.Screen name="phoneLogin" component={PhoneLogin} />
    </Stack.Navigator>
  );
};
