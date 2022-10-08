import * as React from 'react';
import Home from './screens/Home';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassWord from './screens/ForgotPassWord';
import OTPverify from './screens/OTPverify';
import ResetPassword from './screens/ResetPassword';
import ResetDone from './screens/ResetDone';

const App = () => {
  const Stack = createNativeStackNavigator();
 
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
        name='Home'
        component={Home}
        />
        <Stack.Screen
        name='ResetDone'
       component={ResetDone}
       options={{
        headerShown: false,
        }}/>

        <Stack.Screen
        name='ResetPassword'
        component={ResetPassword}
        options={
          {title: 'Reset Password'}
        }/>
        <Stack.Screen
        name='Forgot'
        component={ForgotPassWord}
        options={{title: 'Forgot Password'}}
        />
        <Stack.Screen
        name="OTPverify"
        component={OTPverify}
        options={
          {
            title: 'Forgot Password'
          }
        }/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
