import {Button} from '@components';
import FilterSearch from '@components/filterSearch/filterSearch';
import GlobalStyles from '@theme/styles/global-style';
import {getSize} from '@utils/responsive';
import {CommonType} from '@utils/types';
import  React from 'react';
import {SafeAreaView} from 'react-native';
import {firebase} from '@react-native-firebase/app-check';


interface Props {}

export const Home: CommonType.AppScreenProps<'home', Props> = ({
  navigation,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [age, setAge]= React.useState([15,28])
  const [gender,setGender] = React.useState('')
  const [location,setLocation]= React.useState('')
  const [distance,setDistance] = React.useState([0])
  const locations = [
    {id: '1', label : 'Hanoi'},
      {id: '2', label: 'SaiGon'},
      {id: '3', label: 'Da Lat'},
      {id: '4', label: 'Da Nang'},
     {id: '5', label : 'Ca Mau'}]
  const appCheckForDefaultApp = firebase.appCheck();

  console.log(appCheckForDefaultApp);
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
      onCloseModal={setModalVisible}
      genderValue = {gender}
      setGender={setGender}
      locationValue = {location}
      setLocation = {setLocation}
      LocationData = {locations}
      distance = {distance}
      setDistance={setDistance}
      age = {age}
      setAge={setAge}
      animationType={'slide'}
      />
      
    </SafeAreaView>
  );
};