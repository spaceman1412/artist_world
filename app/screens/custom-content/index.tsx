import {Button} from '@components';
import {getSize} from '@utils/responsive';
import {CommonType} from '@utils/types';
import React from 'react';
import {SafeAreaView, Text, Image, StyleSheet, View} from 'react-native';
import {firebase} from '@react-native-firebase/app-check';
import {images} from '@assets/images';
import {color} from '@theme';
interface Props {}
export const CustomContent: CommonType.AppScreenProps<
  'CustomContent',
  Props
> = ({navigation}) => {
  const appCheckForDefaultApp = firebase.appCheck();

  console.log(appCheckForDefaultApp);

  return (
    <SafeAreaView>
      <View style={Styles.skipContainer}>
        <Text
          style={Styles.skipButton}
          onPress={() => navigation.navigate('home')}>
          Skip
        </Text>
      </View>
      <View style={Styles.contentContainer}>
        <Image source={images.abstractShape} style={Styles.imageContent} />
        <Text style={Styles.headerText}>Search friend's</Text>
        <Text style={Styles.bodyText}>
          You can find friends from your contant lists to conected
        </Text>
        <Button
          text="button"
          preset="primary"
          style={Styles.button}
          onPress={() => navigation.navigate('home')}
        />
      </View>
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  skipContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 40,
  },
  skipButton: {
    color: color.palette.purple,
    fontWeight: '500',
    fontSize: 20,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContent: {
    width: getSize.v(240),
    height: getSize.v(240),
    padding: 20,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 30,
    padding: 10,
    textAlign: 'center',
  },
  bodyText: {
    fontWeight: '500',
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
  },
  button: {
    width: getSize.v(295),
    height: getSize.v(42),
    position: 'absolute',
    bottom: getSize.v(-220),
  },
});
