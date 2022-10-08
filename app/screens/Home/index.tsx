import React from 'react';
import {View, SafeAreaView, Button} from 'react-native';


const Home = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
        <View style={{ backgroundColor: 'black'}} />
        <Button onPress={() => navigation.push('Forgot')}
        title='Click me'></Button>
      </SafeAreaView>
    )
};

export default Home;