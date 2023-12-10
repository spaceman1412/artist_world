import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileDetailsNavigatorParamList} from './navigator-param-list';
import * as SCREENS from '@screens';

const Stack = createStackNavigator<ProfileDetailsNavigatorParamList>();

export const ProfileStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="basicInfo">
      <Stack.Screen
        name="basicInfo"
        component={SCREENS.BasicInfo}
        options={{
          headerShown: true,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="sexSelect"
        component={SCREENS.SexSelect}
        options={{
          headerShown: false,
          headerTitle: 'Gender',
        }}
      />
      <Stack.Screen
        name="interests"
        component={SCREENS.Interests}
        options={{
          headerShown: false,
          headerTitle: 'Interests',
        }}
      />
      <Stack.Screen
        name="role"
        component={SCREENS.Role}
        options={{
          headerShown: false,
          headerTitle: 'Roles',
        }}
      />
    </Stack.Navigator>
  );
};
