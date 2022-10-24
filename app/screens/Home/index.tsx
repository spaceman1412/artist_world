import {Button} from '@components';
import GlobalStyles from '@theme/styles/global-style';
import {CommonType} from '@utils/types';
import React from 'react';
import {SafeAreaView} from 'react-native';

interface Props {}

export const Home: CommonType.AppScreenProps<'home', Props> = ({
  navigation,
}) => {
  return (
    <SafeAreaView
      style={[
        GlobalStyles.flex,
        GlobalStyles.alignCenter,
        GlobalStyles.justifyCenter,
      ]}>
      <Button text="aaa" preset="primary" style={{width: 100, height: 100}} />
    </SafeAreaView>
  );
};
