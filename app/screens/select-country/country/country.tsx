// @flow
import Flag from '@components/flag/flag';
import RadioButton from '@components/radioButton/radioButton';
import { color } from '@theme';
import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { CountryProps } from './country.props';


const Country = ({
    flagName,
    flagNumber,
    flagCode,
    checked, 
    onChecked}: 
    CountryProps) => {
  return (
    <TouchableOpacity
      onPress={() => onChecked(flagNumber)}
      style={!checked ? styles.container : [styles.container, {borderColor: color.palette.primary}]}>
      <View style={styles.flagContainer}>
        <Flag code={flagCode} />
        <Text style={styles.code}>{flagCode}</Text>
        <Text style={styles.name}>{flagName} </Text>
      </View>
      <RadioButton checked={checked} 
      onPress={() => onChecked(flagCode)} />
    </TouchableOpacity>
  );
};

export default Country;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    margin: 10,
    borderColor: color.palette.mischka,
    borderWidth: 1,
    borderRadius: 20,
  },
  radioButton: {
    flexDirection: 'row-reverse',
  },

  code: {
    marginHorizontal: 20,
    color: color.primary,
    fontWeight: '500',
  },
  name: {
    color: color.storybookTextColor,
    fontWeight: '500',
  },
  flagContainer: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
