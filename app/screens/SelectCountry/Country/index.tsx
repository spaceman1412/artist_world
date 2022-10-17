// @flow
import Flag from '@components/Flag';
import RadioButton from '@components/RadioButton';
import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
type CountryProps = {
  flagsName: string;
  flagsCode: string;
  checked?: boolean;
  onChecked?: any;
};
const Country = ({flagsName, flagsCode, checked, onChecked}: CountryProps) => {
  return (
    <TouchableOpacity
      onPress={() => onChecked(flagsCode)}
      style={!checked ? styles.container : styles.selected}>
      <View style={styles.flagContainer}>
        <Flag code={flagsCode} />
        <Text style={styles.code}>{flagsCode}</Text>
        <Text style={styles.name}>{flagsName}</Text>
      </View>
      <RadioButton checked={checked} onPress={() => onChecked(flagsCode)} />
    </TouchableOpacity>
  );
};

export default Country;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 25,
    margin: 10,
    borderColor: '#f4f6f9',
    borderWidth: 1,
    borderRadius: 20,
  },
  selected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    margin: 10,
    borderColor: '#ff4d67',
    borderWidth: 2,
    borderRadius: 20,
  },
  radioButton: {
    flexDirection: 'row-reverse',
  },

  code: {
    marginHorizontal: 20,
    color: '#bdc0c4',
    fontWeight: '500',
  },
  name: {
    color: 'black',
    fontWeight: '500',
  },
  flagContainer: {
    width: '60%',
    flexDirection: 'row',

    alignItems: 'center',
  },
});
