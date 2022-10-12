import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './app-stack';

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};
