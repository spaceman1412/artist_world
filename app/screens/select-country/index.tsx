import {StyleSheet, Text, View} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import flags from '@components/flag/flags';
import * as React from 'react';
import Country from './country/country';
import { CommonType } from '@utils/types';
import { color } from '@theme';
import {images} from '@assets/images'
import { Button } from '@components';
interface Props{}
export const SelectCountry: CommonType.AppScreenProps<'selectCountry', Props> = 
({navigation}) => {
  const [countrySelection, setCountrySelection] = React.useState({flagNumber: '', flagCode: ''});
  const [listFlag, setListFlag] = React.useState(flags);
  const [search, setSearch] = React.useState('');
  const [inputting, setInputting] = React.useState(false);
  const typingTimeOut = React.useRef<any>();
  const handleClearInput = () => {
    setSearch('');
    setInputting(false);
    setListFlag(flags);
  };
  const handleChangeSearch = (e: any) => {
    if (typingTimeOut.current) {
      clearTimeout(typingTimeOut.current);
    }
    typingTimeOut.current = setTimeout(() => {
      let search = e;
      let filter = flags!.filter(item => {
        if (search === '') {
          setInputting(false);
          return item;
        } else {
          return item.name.toLowerCase().includes(search.toLowerCase().trim());
        }
      });
      setListFlag(filter);
    }, 600);
    setSearch(e);
  };
  const handleNextButton = () =>{
    navigation.navigate('phoneLogin',{
      flagCode: countrySelection.flagCode,
      flagNumber: countrySelection.flagNumber
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="black"
          ref={typingTimeOut}
          value={search}
          onChange={() => setInputting(true)}
          onChangeText={e => handleChangeSearch(e)}
        />
        {!inputting ? (
          <TouchableOpacity>
            <Image
              source={images.search}
              style={{ width: 18, height: 18}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleClearInput}>
           <Image
              source={images.close}
              style={{ width: 18, height: 18}}
            />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.optionContainer}>
        {listFlag.length > 0 ? (
          listFlag.map(item => (
            <Country
              flagName={item.name}
              flagNumber={item.phone}
              flagCode={item.code}
              checked={countrySelection.flagNumber === item.phone}
              onChecked={setCountrySelection}
              key={item.code}
            />
          ))
        ) : (
          <Text style={styles.inform}>
            Sorry we would support your country soon :(
          </Text>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
        text='Next'
        textStyle={styles.buttonContent}
        style={
        countrySelection.flagCode === '' ?
        styles.buttonNext : 
        styles.buttonNextActive}
        disabled={countrySelection.flagCode === '' 
        ? true : false}
        onPress={handleNextButton}
        />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.palette.white,
    flex: 1,
    padding: 10,
    paddingHorizontal: 25,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: color.palette.aquaHaze,
    borderRadius: 40,
    paddingHorizontal: 23,
    paddingVertical: 5,
    alignItems: 'center',
    margin: 10,
  },
  searchInput: {
    width: '90%',
    color: color.storybookTextColor,
    fontSize: 17,
  },
  optionContainer: {
    height: '70%',
  },
  buttonContainer: {
    height: 100,
    borderTopWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNext: {
    width: 295,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    backgroundColor: color.palette.seaPink,
    margin: 10,
  },
  buttonNextActive: {
    width: 295,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    backgroundColor: color.palette.primary,
    margin: 10,
  }
  ,
  buttonContent: {
    color: color.palette.white,
    fontSize: 20,
    fontWeight: '500',
  },
  inform: {
    justifyContent: 'center',
    color: color.storybookTextColor,
    marginHorizontal: 25,
    fontSize: 25,
  },
});
