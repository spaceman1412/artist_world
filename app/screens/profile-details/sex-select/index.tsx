import React from 'react';
import {CommonType} from '@utils/types';
import {Text, View, StyleSheet} from 'react-native';
import {color} from '@theme';
import {SelectiveButton} from '@components/selective_button/selective_button';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.whiteBackground,
    paddingHorizontal: 40,
    paddingVertical: 48,
  },
  header: {
    fontWeight: '700',
    fontSize: 32,
  },
});

export const SexSelect: CommonType.ProfileDetailsScreenProps<
  'sexSelect',
  Props
> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>I am a</Text>
      <Icon name="rocket" size={30} color="#900" />
      <SelectiveButton />
    </View>
  );
};
