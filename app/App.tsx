
import * as React from 'react';
import Home from './screens/Home';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassWord from './screens/ForgotPassWord';



const App = () => {
  const Stack = createNativeStackNavigator();
 
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
        name='Home'
        component={Home}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
