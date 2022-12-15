import {FlatList, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TextInput, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as React from 'react';
import {CommonType} from '@utils/types';
import {color} from '@theme';
import {images} from '@assets/images';
import {Button} from '@components';
import {cityList} from '@utils/constant';
import Icon from 'react-native-vector-icons/Entypo';
import SizedBox from '@components/sized-box';
import {useAppDispatch} from '@store/hook';
import {ProfileActions} from '@store/profile/reducer';

interface Props {}

export const SelectCity: CommonType.AppScreenProps<'selectCity', Props> = ({
  navigation,
}) => {
  const [selectedCity, setSelectedCity] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [inputting, setInputting] = React.useState(false);
  const [filterCity, setFilterCity] = React.useState(cityList);
  const dispatcher = useAppDispatch();

  const typingTimeOut = React.useRef<any>();

  const handleClearInput = () => {
    setSearch('');
    setInputting(false);
  };

  const handleChangeSearch = (e: any) => {
    if (typingTimeOut.current) {
      clearTimeout(typingTimeOut.current);
    }
    typingTimeOut.current = setTimeout(() => {
      let search = e;
      let filter = cityList.filter(item => {
        if (search === '') {
          setInputting(false);
          return item;
        } else {
          return item.toLowerCase().includes(search.toLowerCase().trim());
        }
      });

      setFilterCity(filter);
    }, 600);
    setSearch(e);
  };

  const handleNextButton = () => {
    dispatcher(ProfileActions.updateLocation(selectedCity));
    navigation.goBack();
  };

  const renderItem = ({item}) => {
    return (
      <>
        <Button
          style={
            selectedCity === item
              ? styles.buttonContainerChoosed
              : styles.buttonContainerNotChoose
          }
          onPress={() => {
            setSelectedCity(item.trim());
            console.log(selectedCity);
          }}>
          <View style={{flexGrow: 1}}>
            <Text
              style={{
                color:
                  selectedCity === item
                    ? color.whiteBackground
                    : color.palette.black,
                fontSize: 16,
              }}>
              {item}
            </Text>
          </View>
          {selectedCity === item && (
            <Icon name="check" color={color.whiteBackground} size={20} />
          )}
        </Button>
        <SizedBox height={10} />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="black"
          autoCapitalize="none"
          ref={typingTimeOut}
          value={search}
          onChange={() => setInputting(true)}
          onChangeText={e => handleChangeSearch(e)}
        />

        {!inputting ? (
          <TouchableOpacity>
            <Image source={images.search} style={{width: 18, height: 18}} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleClearInput}>
            <Image source={images.close} style={{width: 18, height: 18}} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        style={styles.optionContainer}
        showsVerticalScrollIndicator={false}>
        <FlatList data={filterCity} renderItem={renderItem} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          text="Next"
          textStyle={styles.buttonContent}
          style={
            selectedCity === '' ? styles.buttonNext : styles.buttonNextActive
          }
          disabled={selectedCity === '' ? true : false}
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
    flex: 1,
    padding: 10,
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
  },
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
  buttonContainerChoosed: {
    backgroundColor: color.primary,
    paddingHorizontal: 16,
  },
  buttonContainerNotChoose: {
    backgroundColor: color.whiteBackground,
    borderWidth: 1,
    borderColor: color.outLine,
    paddingHorizontal: 16,
  },
});
