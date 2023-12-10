import React, {useState} from 'react';
import {CommonType} from '@utils/types';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {color} from '@theme';
import {Button} from '@components';
import {getSize} from '@utils/responsive';
import SizedBox from '@components/sized-box';
import GlobalStyles from '@theme/styles/global-style';
import {useAppDispatch} from '@store/hook';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {ProfileActions} from '@store/profile/reducer';

interface Props {}

const styles = StyleSheet.create({
  header: {
    fontWeight: '700',
    fontSize: 32,
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: color.whiteBackground,
    paddingHorizontal: 40,
    paddingVertical: 48,
  },
  columnWrapper: {
    flex: 1,
    justifyContent: 'space-around',
  },
  button: {
    width: getSize.v(140),
    height: getSize.v(45),
    borderRadius: 15,
    borderWidth: 1,
  },
  primaryButton: {
    backgroundColor: color.primary,
    width: getSize.v(320),
    height: getSize.v(80),
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

const DATA = ['Guitarist', 'Pianonist', 'Vocalist', 'Producer', 'Composer'];

export const Role: CommonType.ProfileDetailsScreenProps<'role', Props> = () => {
  const [selected, setSelected] = useState([]);
  const dispatcher = useAppDispatch();
  const navigation = useNavigation();

  const onConfirm = () => {
    dispatcher(ProfileActions.updateMusicRoles(selected));
    dispatcher(ProfileActions.updateDataFirebase());
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'tab',
          },
        ],
      }),
    );
  };

  const renderItem = ({item}) => {
    return (
      <Button
        text={item}
        style={[
          styles.button,
          {
            backgroundColor: selected.includes(item)
              ? color.primary
              : color.palette.white,
            borderColor: selected.includes(item)
              ? color.primary
              : color.palette.mischka,
          },
        ]}
        textStyle={{
          color: selected.includes(item)
            ? color.palette.white
            : color.palette.black,
        }}
        onPress={() => {
          if (!selected.includes(item)) {
            setSelected([...selected, item]);
          } else {
            setSelected(selected.filter(value => value !== item));
          }
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your role</Text>

      <Text style={{color: 'rgba(0, 0, 0, 0.7)'}}>
        Select a few of your kind of musicians you are and let everyone know
        what you’re passionate about.
      </Text>
      <SizedBox height={32} />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        columnWrapperStyle={styles.columnWrapper}
        keyExtractor={item => item}
        numColumns={2}
        ItemSeparatorComponent={() => <SizedBox height={10} />}
      />

      <View style={GlobalStyles.flex} />

      <Button
        text="Continue"
        style={styles.primaryButton}
        onPress={onConfirm}
        textStyle={{fontSize: getSize.font(18)}}
      />
    </View>
  );
};
