import {Button} from '@components';
import DropDown from '@components/dropdown/dropdown';
import FilterSearch from '@components/filterSearch/filterSearch';
import GlobalStyles from '@theme/styles/global-style';
import {getSize} from '@utils/responsive';
import {CommonType} from '@utils/types';
import React from 'react';
import {SafeAreaView} from 'react-native';

interface Props {}

export const Home: CommonType.AppScreenProps<'home', Props> = ({
  navigation,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [select,setSelect]= React.useState('');
  const data  = [{id: '1', label:'asd'}]
  return (
    <SafeAreaView
      style={[
        GlobalStyles.flex,
        GlobalStyles.alignCenter,
        GlobalStyles.justifyCenter,
      ]}>
      <Button
        text="aaa"
        preset="primary"
        onPress={() => setModalVisible(!modalVisible)}
        style={{width: getSize.v(100), height: getSize.v(100)}}
      />
      <FilterSearch
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
      animationType='slide'
      onclear={() => console.log('clear')}
      />
      <DropDown
      value={select}
      onSelect={() => setSelect} 
      data={[
      {id: '1', label: '2'},
      {id: '2', label: '3'}]} />
      
    </SafeAreaView>
  );
};
