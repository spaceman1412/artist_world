import {Button} from '@components';
import {color} from '@theme';
import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const City = () => {
  return (
    <Button style={{backgroundColor: color.primary, paddingHorizontal: 16}}>
      <View style={{flexGrow: 1}}>
        <Text style={{color: color.whiteBackground, fontSize: 16}}>aaa</Text>
      </View>

      <Icon name="check" color={color.whiteBackground} size={20} />
    </Button>
  );
};

export default City;
