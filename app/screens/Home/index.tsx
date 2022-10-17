import React from 'react';
import {View, SafeAreaView, Button} from 'react-native';


const Home = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'black'}} />
      <Button title='Press Me' onPress={() => navigation.navigate('forgot')}/>
    </SafeAreaView>
  );
};

export default Home;
