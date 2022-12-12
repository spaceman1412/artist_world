import {color} from '@theme';
import {CommonType} from '@utils/types';
import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {SettingItem} from './setting-item/settting-item';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';
import {images} from '@assets/images';
import {getSize} from '@utils/responsive';

interface Props {}

const styles = StyleSheet.create({
  header: {
    fontWeight: '700',
    fontSize: 34,
  },
  container: {
    flex: 1,
    backgroundColor: color.whiteBackground,
    padding: 20,
  },
  avatarContainer: {
    borderBottomColor: color.palette.mischka,
    borderBottomWidth: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatarBox: {
    margin: 10,
  },
  image: {
    width: getSize.v(120),
    height: getSize.v(120),
    borderRadius: 100,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: color.primary,
  },
  iconEditButton: {
    width: 18,
    height: 18,
  },
  name: {
    color: color.storybookTextColor,
    fontSize: 30,
    fontWeight: '700',
  },
  loadingImage: {
    width: 155,
    height: 155,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  placeHoler: {
    width: 155,
    height: 155,
    borderRadius: 100,
  },
});

export const Profile: CommonType.AppScreenProps<'profile', Props> = ({
  navigation,
}) => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const getUsers = firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .onSnapshot(value => {
        const data = value.data();
        setUser(data);
      });
    getUsers;
  }, []);
  const handleLogout = async () => {
    const logout = auth().signOut();
    logout.finally(() => navigation.navigate('login'));
  };
  const handleOnEditProfile = () => {
    navigation.navigate('editProfiles');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        {user ? (
          <>
            <FastImage style={styles.image} source={{uri: user.avatarUrl}} />

            <Text style={styles.name}>
              {user.firstName + ' ' + user.lastName}
            </Text>
          </>
        ) : (
          <View style={styles.loadingImage}>
            <Image style={styles.placeHoler} source={images.placeholder} />
          </View>
        )}
      </View>

      <SettingItem
        icon={'face-man-profile'}
        text={'My Profile'}
        onPress={() => navigation.navigate('profileDetail')}
      />

      <SettingItem
        icon={'account'}
        text={'Edit Profile'}
        onPress={handleOnEditProfile}
      />
      <SettingItem icon={'logout'} text={'Logout'} onPress={handleLogout} />
    </SafeAreaView>
  );
};

export default Profile;
