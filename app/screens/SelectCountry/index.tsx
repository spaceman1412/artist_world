import {StyleSheet, Text, View} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import flags from '@components/Flag/flags';
import * as React from 'react';
import Country from './Country';

const SelectCountry = ({navigation}) => {
  const [countrySelection, setCountrySelection] = React.useState('');
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="search"
          style={styles.searchInput}
          placeholderTextColor="black"
          ref={typingTimeOut}
          value={search}
          onChange={() => setInputting(true)}
          onChangeText={e => handleChangeSearch(e)}
        />
        {!inputting ? (
          <TouchableOpacity>
            <AntDesign
              name="search1"
              style={{color: '#8c939b', fontSize: 25}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleClearInput}>
            <AntDesign name="close" style={{color: '#8c939b', fontSize: 25}} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.optionContainer}>
        {listFlag.length > 0 ? (
          listFlag.map(item => (
            <Country
              flagsName={item.name}
              flagsCode={item.code}
              checked={countrySelection === item.code}
              onChecked={setCountrySelection}
              key={item.code}
            />
          ))
        ) : (
          <Text style={styles.inform}>
            Sorry we would support your company soon :(
          </Text>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonNext}
          onPress={() => navigation.navigate('')}>
          <Text style={styles.buttonContent}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#f4f6f9',
    borderRadius: 40,
    paddingHorizontal: 25,
    paddingVertical: 8,
    alignItems: 'center',
    margin: 10,
  },
  searchInput: {
    width: '90%',
    color: 'black',
    fontSize: 18,
  },
  optionContainer: {
    height: '70%',
  },
  buttonContainer: {
    height: '20%',
    borderTopWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopColor: '#f4f6f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNext: {
    width: 370,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#ee8f9d',
    margin: 10,
  },
  buttonContent: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  inform: {
    justifyContent: 'center',
    color: 'black',
    marginHorizontal: 25,
    fontSize: 25,
  },
});
export default SelectCountry;
