import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileDetailsNavigatorParamList} from './navigator-param-list';
import * as SCREENS from '@screens';

const Stack = createStackNavigator<ProfileDetailsNavigatorParamList>();

export const ProfileStack = ({navigation}) => {
  React.useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [{name: 'profileDetails'}],
    });
  }, []);

  return (
    <Stack.Navigator initialRouteName="basicInfo">
      <Stack.Screen
        name="basicInfo"
        component={SCREENS.BasicInfo}
        options={{
          headerShown: false,
          headerTitle: 'Basic Info',
        }}
      />
      <Stack.Screen
        name="sexSelect"
        component={SCREENS.SexSelect}
        options={{
          headerTitle: 'Gender',
        }}
      />
      <Stack.Screen
        name="interests"
        component={SCREENS.Interests}
        options={{
          headerTitle: 'Interests',
        }}
      />
      <Stack.Screen
        name="role"
        component={SCREENS.Role}
        options={{
          headerTitle: 'Roles',
        }}
      />
    </Stack.Navigator>
  );
};
