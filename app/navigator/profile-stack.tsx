import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileDetailsNavigatorParamList} from './navigator-param-list';
import * as SCREENS from '@screens';

const Stack = createStackNavigator<ProfileDetailsNavigatorParamList>();

export const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="basicInfo">
      <Stack.Screen name="basicInfo" component={SCREENS.BasicInfo} />
      <Stack.Screen name="sexSelect" component={SCREENS.SexSelect} />
      <Stack.Screen name="interests" component={SCREENS.Interests} />
      <Stack.Screen name="role" component={SCREENS.Role} />
    </Stack.Navigator>
  );
};
