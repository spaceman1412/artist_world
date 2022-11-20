import {Button} from '@components';
import {getSize} from '@utils/responsive';
import {CommonType} from '@utils/types';
import React from 'react';
import {SafeAreaView, Text, Image, StyleSheet, View} from 'react-native';
import {firebase} from '@react-native-firebase/app-check';
import {images} from '@assets/images';
import {color} from '@theme';

interface Props {}
export const FindOutMatch: CommonType.AppScreenProps<'findOutMatch', Props> = ({
  navigation,
}) => {
  const user = 'Jack';
  const userImage = images.man;
  const matchImage = images.girl;
  const appCheckForDefaultApp = firebase.appCheck();

  console.log(appCheckForDefaultApp);

  return (
    <SafeAreaView>
      <View style={styles.contentContainer}>
        <View style={styles.coupleImageContainer}>
          <View>
            <Image source={userImage} style={styles.userImageContent} />
            <Image source={images.heart} style={styles.matchIcon1} />
          </View>
          <View>
            <Image source={matchImage} style={styles.matchImageContent} />
            <Image source={images.heart} style={styles.matchIcon2} />
          </View>
        </View>
        <Text style={styles.headerText}>It's a match, {user}</Text>
        <Text style={styles.bodyText}>
          start a conversation with eachother!
        </Text>
        <Button
          text="Say hello"
          preset="primary"
          style={styles.button1}
          onPress={() => navigation.navigate('home')}
        />
        <Button
          text="Keep swiping"
          preset="outline"
          style={styles.button2}
          onPress={() => navigation.navigate('home')}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  skipButton: {
    color: color.palette.purple,
    fontWeight: '500',
    fontSize: 20,
  },
  contentContainer: {
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
  userImageContent: {
    top: 40,
    width: getSize.v(160),
    height: getSize.v(240),
    borderRadius: 10,
    padding: 20,
    alignContent: 'center',
    transform: [{rotateZ: '-10deg'}],
  },
  matchImageContent: {
    width: getSize.v(160),
    height: getSize.v(240),
    borderRadius: 10,
    padding: 20,
    alignContent: 'center',
    transform: [{rotateZ: '10deg'}],
    elevation: -1,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 36,
    padding: 20,
    textAlign: 'center',
    color: color.palette.Red,
  },
  bodyText: {
    fontWeight: '500',
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
  },
  button1: {
    width: getSize.v(295),
    height: getSize.v(56),
    position: 'absolute',
    bottom: getSize.v(-160),
  },
  button2: {
    width: getSize.v(295),
    height: getSize.v(56),
    position: 'absolute',
    bottom: getSize.v(-230),
  },
  matchIcon1: {
    position: 'absolute',
    left: getSize.v(7),
    top: getSize.v(256),
    width: getSize.v(50),
    height: getSize.v(50),
    borderRadius: 90,
    alignContent: 'center',
    borderColor: color.palette.black,
    justifyContent: 'center',
    backgroundColor: color.palette.white,
  },
  matchIcon2: {
    position: 'absolute',
    left: getSize.v(7),
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
