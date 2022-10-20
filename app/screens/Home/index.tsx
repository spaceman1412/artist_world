import {Button} from '@components';
import GlobalStyles from '@theme/styles/global-style';
import React from 'react';
import {SafeAreaView} from 'react-native';

const Home = ({navigation}) => {
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

export default Home;
