import {Button} from '@components';
import {getSize} from '@utils/responsive';
import {CommonType} from '@utils/types';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {firebase} from '@react-native-firebase/app-check';
import {images} from '@assets/images';
import {color, radius} from '@theme';
import Heart from '@assets/images/heart.svg';

interface Props {}
export const FindOutMatch: CommonType.AppScreenProps<'findOutMatch', Props> = ({
  navigation,
}) => {
  const user = 'Jack';
  const userImage = images.man;
  const matchImage = images.girl;

  const appCheckForDefaultApp = firebase.appCheck();

  return (
    <SafeAreaView>
      <View style={styles.contentContainer}>
        <View style={styles.coupleImageContainer}>
          <View
            style={[
              Platform.OS === 'android'
                ? styles.androidShadow
                : styles.iosShadow,
              styles.userContainer,
            ]}>
            <Image source={userImage} style={styles.userImageContent} />
            <View style={styles.matchIcon1}>
              <Image source={images.heart} style={styles.image} />
            </View>
          </View>

          <View
            style={[
              Platform.OS === 'android'
                ? styles.androidShadow
                : styles.iosShadow,
              styles.matchContainer,
            ]}>
            <Image source={matchImage} style={styles.matchImageContent} />

            <View style={styles.matchIcon2}>
              <Image source={images.heart} style={styles.image} />
            </View>
          </View>
        </View>
        <Text style={styles.headerText}>It's a match, {user}</Text>
        <Text style={styles.bodyText}>
          start a conversation with eachother!
        </Text>
        <Button
          text="Say hello"
          // preset="primary"
          textStyle={styles.buttonText1}
          style={styles.button1}
          onPress={() => navigation.navigate('home')}
        />
        <Button
          text="Keep swiping"
          preset="outline"
          textStyle={styles.buttonText2}
          style={styles.button2}
          onPress={() => navigation.navigate('home')}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  iosShadow: {
    shadowColor: color.palette.black,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  androidShadow: {
    borderColor: color.palette.black,
    elevation: 3,
    shadowColor: color.palette.black,
  },
  contentContainer: {
    top: 40,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coupleImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'space-between',
    padding: 40,
  },
  userContainer: {top: 20, transform: [{rotateZ: '-10deg'}]},
  matchContainer: {transform: [{rotateZ: '10deg'}]},
  userImageContent: {
    width: getSize.v(160),
    height: getSize.v(240),
    borderRadius: 10,
    alignContent: 'center',
  },
  matchImageContent: {
    width: getSize.v(160),
    height: getSize.v(240),
    borderRadius: 10,
  },

  headerText: {
    top: 40,
    fontWeight: '700',
    fontSize: 36,
    padding: 20,
    textAlign: 'center',
    color: color.primary,
  },
  bodyText: {
    top: 10,
    fontWeight: '500',
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
    color: color.storybookTextColor,
  },
  button1: {
    width: getSize.v(295),
    height: getSize.v(56),
    position: 'absolute',
    bottom: getSize.v(-160),
    borderRadius: radius.ML,
    color: color.primary,
    backgroundColor: color.primary,
  },
  buttonText1: {color: color.palette.white},
  button2: {
    width: getSize.v(295),
    height: getSize.v(56),
    position: 'absolute',
    bottom: getSize.v(-230),
    borderRadius: radius.ML,
    color: color.palette.secondary,
  },
  buttonText2: {color: color.primary},
  matchIcon1: {
    position: 'absolute',
    left: getSize.v(-20),
    top: getSize.v(210),
    width: getSize.v(50),
    height: getSize.v(50),
    borderRadius: 90,
    alignContent: 'center',
    borderColor: color.palette.black,
    justifyContent: 'center',
    backgroundColor: color.palette.white,
  },
  image: {
    display: 'flex',
    width: getSize.v(35),
    height: getSize.v(35),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  matchIcon2: {
    position: 'absolute',
    left: getSize.v(-22),
    top: getSize.v(-22),
    width: getSize.v(50),
    height: getSize.v(50),
    borderRadius: 90,
    alignContent: 'center',
    borderColor: color.palette.black,
    justifyContent: 'center',
    backgroundColor: color.palette.white,
  },
});
