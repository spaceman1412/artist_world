import React, {useEffect, useState} from 'react';
import {CommonType} from '@utils/types';
import {color} from '@theme';
import {images} from 'assets/images';
import {getSize} from '@utils/responsive';
import GlobalStyles from '@theme/styles/global-style';
import {ScrollView, StyleSheet, Image, FlatList} from 'react-native';
import LeftArrow from '@assets/images/left-arrow.svg';
import PaperPlane from '@assets/images/paper-plane.svg';
import Location from '@assets/images/location.svg';
import TextShowMore from './show-more-text';
import Heart from '@assets/images/heart.svg';
import XStroke from '@assets/images/stroke.svg';
import Star from '@assets/images/star.svg';
import {Button as ThienButton} from '@components';
import {Button, View, Text, LoaderScreen} from 'react-native-ui-lib';
import firestore from '@react-native-firebase/firestore';

interface Props {}

// TODO: Replace with prop's uid
const uid = '57ix0KpC41a91UNZF32SpKkxgNW2';

export const ProfileDetail: CommonType.AppScreenProps<
  'profileDetail',
  Props
> = ({navigation}) => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const getUserData = async () => {
      const res = await firestore().collection('Users').doc(uid).get();

      setData(res.data());
    };

    getUserData().catch(console.error);
  });

  const getAge = () => {
    const today = new Date();
    const birthDate = new Date(data.birthDate);

    return today.getFullYear() - birthDate.getFullYear();
  };

  return (
    <>
      {!data ? (
        <LoaderScreen
          message={'Few minutes to look inside'}
          color={color.primary}
        />
      ) : (
        <View useSafeArea>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.screen} backgroundColor={color.whiteBackground}>
              <Image
                source={{uri: data.avatarUrl}}
                style={[GlobalStyles.fullWidth, styles.mainImage]}
              />
              <ThienButton
                style={styles.backButton}
                onPress={() => navigation.navigate('discover')}
                children={<LeftArrow />}
              />
              <View row center absH style={styles.circleList}>
                <Button
                  round
                  style={styles.sideCircle}
                  backgroundColor={color.whiteBackground}
                  children={<XStroke />}
                />
                <Button
                  round
                  marginH-20
                  style={styles.matchCircle}
                  backgroundColor={color.primary}
                  children={<Heart />}
                />
                <Button
                  round
                  style={styles.sideCircle}
                  backgroundColor={color.whiteBackground}
                  children={<Star />}
                />
              </View>
              <View
                centerV
                paddingT-90
                paddingB-40
                paddingH-40
                style={styles.info}
                backgroundColor={color.whiteBackground}>
                <View row spread>
                  <View>
                    <Text text50>
                      {`${data.firstName} ${data.lastName}, ${getAge()}`}
                    </Text>
                    <Text text80 style={styles.secondaryText} numberOfLines={1}>
                      {data.musicRoles.join(', ')}
                    </Text>
                  </View>
                  <ThienButton
                    onPress={() => navigation.navigate('messages')}
                    style={styles.messageButton}
                    children={<PaperPlane />}
                  />
                </View>
                <View marginT-30 row spread>
                  <View>
                    <Text text70BO marginB-5>
                      Location
                    </Text>
                    <Text text80 style={styles.secondaryText}>
                      Chicago, IL United States
                    </Text>
                  </View>
                  <Button
                    text90
                    size={Button.sizes.xSmall}
                    backgroundColor={color.palette.primaryWithOpacity(0.1)}
                    iconSource={(_: any) => (
                      <View marginR-4 children={<Location />} />
                    )}
                    borderRadius={7}
                    label="1 km"
                    style={styles.locationButton}
                    labelStyle={styles.mainText}
                  />
                </View>
                <View marginT-30>
                  <Text text70BO marginB-5>
                    About
                  </Text>
                  <TextShowMore numberOfLines={3} style={styles.secondaryText}>
                    Lorem ipsum dolor sit amet, qui minim labore adipisicing
                    minim sint cillum sint consectetur cupidatat. Lorem ipsum
                    dolor sit amet, qui minim labore adipisicing minim sint
                    cillum sint consectetur cupidatat.
                  </TextShowMore>
                </View>
                <View marginT-30>
                  <Text text70BO marginB-5>
                    Interests
                  </Text>
                  <ScrollView horizontal>
                    <FlatList
                      data={data.musicInterests}
                      numColumns={3}
                      renderItem={({item}) => (
                        <View
                          marginR-5
                          marginB-10
                          paddingH-10
                          style={styles.interestItem}
                          center>
                          <Text
                            numberOfLines={2}
                            text90BO
                            style={styles.mainText}>
                            {item}
                          </Text>
                        </View>
                      )}
                    />
                  </ScrollView>
                </View>
                <View marginT-30>
                  <View flex>
                    <View row spread>
                      <Text text70BO marginB-5>
                        Gallery
                      </Text>
                      <Button
                        link
                        text80BO
                        linkColor={color.primary}
                        label="See all"
                      />
                    </View>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}>
                      <Image source={images.girl} style={styles.galleryImage} />
                      <Image source={images.girl} style={styles.galleryImage} />
                      <Image source={images.girl} style={styles.galleryImage} />
                      <Image source={images.girl} style={styles.galleryImage} />
                      <Image
                        source={{uri: data.avatarUrl}}
                        style={styles.galleryImage}
                      />
                    </ScrollView>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: getSize.v(1325),
  },
  circleList: {
    top: getSize.v(337),
    zIndex: 1,
  },
  mainText: {
    color: color.primary,
  },
  secondaryText: {
    color: color.palette.blackBlur,
  },
  matchCircle: {
    width: 99,
    height: 99,
    shadowRadius: 15,
    shadowOpacity: 0.2,
    shadowColor: color.primary,
    shadowOffset: {
      width: 0,
      height: 15,
    },
  },
  sideCircle: {
    width: 78,
    height: 78,
    shadowRadius: 15,
    shadowOpacity: 0.07,
    shadowColor: color.palette.black,
    shadowOffset: {
      width: 0,
      height: 20,
    },
  },
  messageButton: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: color.line,
    backgroundColor: color.whiteBackground,
  },
  backButton: {
    top: 15,
    left: 15,
    width: 52,
    height: 52,
    position: 'absolute',
    backgroundColor: color.palette.whiteWithOpacity(0.2),
    borderWidth: 1,
    borderRadius: 15,
    borderColor: color.line,
  },
  mainImage: {
    height: getSize.v(415),
    zIndex: -1,
  },
  locationButton: {
    height: 34,
  },
  info: {
    position: 'absolute',
    top: getSize.v(386),
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  interestItem: {
    width: 92,
    height: 32,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.primary,
  },
  galleryImage: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
  },
});
