import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './app-stack';
import {MatchModal} from '@components/MatchBottomSheet';
import {matchModalRef} from '@utils/constant';

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack />
      <MatchModal ref={matchModalRef} />
    </NavigationContainer>
  );
};
