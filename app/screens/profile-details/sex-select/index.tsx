import React, {useState} from 'react';
import {CommonType} from '@utils/types';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {color} from '@theme';
import Icon from 'react-native-vector-icons/Entypo';
import {Button} from '@components';
import {getSize} from '@utils/responsive';
import SizedBox from '@components/sized-box';

import {useAppDispatch} from '@store/hook';
import {ProfileActions} from '@store/profile/reducer';

interface Props {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.whiteBackground,
    paddingHorizontal: 40,
    paddingVertical: 48,
    alignItems: 'center',
  },
  header: {
    fontWeight: '700',
    fontSize: getSize.font(35),
    color: 'black',
  },
  button: {
    paddingHorizontal: 20,
    borderRadius: 20,
    width: getSize.v(320),
    height: getSize.v(80),
    borderWidth: 1,
  },
  textButton: {
    fontWeight: '700',
    fontSize: getSize.font(16),
    flex: 1,
  },
});

export const SexSelect: CommonType.ProfileDetailsScreenProps<
  'sexSelect',
  Props
> = ({navigation}) => {
  const [selected, setSelected] = useState<'man' | 'woman' | 'not'>('man');
  const dispatcher = useAppDispatch();

  const onSubmit = () => {
    dispatcher(ProfileActions.updateSex(selected));
    navigation.navigate('interests');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>I am a</Text>
      <SizedBox height={90} />

      <Button
        style={[
          styles.button,
          {
            backgroundColor:
              selected === 'woman' ? color.primary : color.palette.white,
            borderColor:
              selected === 'woman' ? color.primary : color.palette.mischka,
          },
        ]}
        onPress={() => setSelected('woman')}>
        <Text
          style={[
            styles.textButton,
            {
              color:
                selected === 'woman'
                  ? color.palette.white
                  : color.palette.black,
            },
          ]}>
          Woman
        </Text>
        <Icon name="check" color={color.palette.white} size={20} />
      </Button>

      <SizedBox height={10} />

      <Button
        style={[
          styles.button,
          {
            backgroundColor:
              selected === 'man' ? color.primary : color.palette.white,
            borderColor:
              selected === 'man' ? color.primary : color.palette.mischka,
          },
        ]}
        onPress={() => setSelected('man')}>
        <Text
          style={[
            styles.textButton,
            {
              color:
                selected === 'man' ? color.palette.white : color.palette.black,
            },
          ]}>
          Man
        </Text>
        <Icon name="check" color={color.palette.white} size={20} />
      </Button>
      <SizedBox height={10} />

      <Button
        style={[
          styles.button,
          {
            backgroundColor:
              selected === 'not' ? color.primary : color.palette.white,
            borderColor:
              selected === 'not' ? color.primary : color.palette.mischka,
          },
        ]}
        onPress={() => setSelected('not')}>
        <Text
          style={[
            styles.textButton,
            {
              color:
                selected === 'not' ? color.palette.white : color.palette.black,
            },
          ]}>
          Don't want to share
        </Text>
        <Icon name="check" color={color.palette.white} size={20} />
      </Button>

      <View style={{flex: 1}} />
      <Button
        text="Continue"
        style={[styles.button, {backgroundColor: '#E94057'}]}
        textStyle={{
          fontSize: getSize.font(18),
        }}
        onPress={onSubmit}
      />
    </View>
  );
};
