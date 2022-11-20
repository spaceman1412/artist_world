import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileDetailsNavigatorParamList} from './navigator-param-list';
import * as SCREENS from '@screens';

const Stack = createStackNavigator<ProfileDetailsNavigatorParamList>();

export const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="sexSelect">
      <Stack.Screen name="basicInfo" component={SCREENS.BasicInfo} />
      <Stack.Screen name="sexSelect" component={SCREENS.SexSelect} />
    </Stack.Navigator>
  );
};
