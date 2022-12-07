import React, {useEffect, useState} from 'react';
import {CommonType} from '@utils/types';
import {color} from '@theme';
import {getSize} from '@utils/responsive';
import GlobalStyles from '@theme/styles/global-style';
import {ScrollView, StyleSheet, FlatList} from 'react-native';
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
import {images} from '@assets/images';
import InterestItem from './interest-item';
import FastImage from 'react-native-fast-image';
import {mapListComponent} from '@utils/constant';
import {styles} from './styles';
import SizedBox from '@components/sized-box';

interface Props {}

const getAge = (date: string) => {
  const today = new Date();
  const birthDate = new Date(date);

  return today.getFullYear() - birthDate.getFullYear();
};

const GalleryImage = ({item, index}) => {
  return (
    <FastImage key={item} source={{uri: item}} style={styles.galleryImage} />
  );
};

export const ProfileDetail: CommonType.AppScreenProps<
  'profileDetail',
  Props
> = ({navigation, route}) => {
  const uid = route.params?.uid || '57ix0KpC41a91UNZF32SpKkxgNW2';
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const getUserData = async () => {
      const res = await firestore().collection('Users').doc(uid).get();

      setData(res.data());
    };

    getUserData().catch(console.error);
  });

  //FIXME: The ScrollView cannot be resized on content changing
  return (
    <>
      {!data ? (
        <LoaderScreen message="Happy waiting..." color={color.primary} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} bounces>
          <View flex>
            <FastImage
              source={
                data.avatarUrl ? {uri: data.avatarUrl} : images.placeholder
              }
              resizeMode={'cover'}
              style={styles.mainImage}
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
              style={[GlobalStyles.fullWidth, styles.info]}
              backgroundColor={color.whiteBackground}>
              <View row spread flex>
                <View>
                  <Text text50>
                    {`${data.firstName} ${data.lastName}, ${getAge(
                      data.birthDate,
                    )}`}
                  </Text>
                  {data.musicRoles && (
                    <Text text80 style={styles.secondaryText} numberOfLines={1}>
                      {data.musicRoles.join(', ')}
                    </Text>
                  )}
                </View>
                <ThienButton
                  onPress={() => navigation.navigate('messages')}
                  style={styles.messageButton}
                  children={<PaperPlane />}
                />
              </View>
              <View marginT-30 row spread centerV>
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
                  backgroundColor={color.palette.PrimaryWithOpacity(0.1)}
                  iconSource={(_: any) => (
                    <View marginR-4 children={<Location />} />
                  )}
                  borderRadius={7}
                  label="1 km"
                  style={styles.locationButton}
                  labelStyle={styles.mainText}
                />
              </View>
              {data.about && (
                <View marginT-30>
                  <Text text70BO marginB-5>
                    About
                  </Text>
                  <TextShowMore numberOfLines={3} style={styles.secondaryText}>
                    {data.about}
                  </TextShowMore>
                </View>
              )}

              {data.musicInterests && (
                <View marginT-30>
                  <Text text70BO marginB-5>
                    Interests
                  </Text>

                  <FlatList
                    data={data.musicInterests}
                    numColumns={3}
                    renderItem={({item, index}) => (
                      <InterestItem item={item} index={index} key={index} />
                    )}
                  />
                </View>
              )}

              {data.gallery && (
                <View marginT-20>
                  <View flex>
                    <View row spread>
                      <Text text70BO marginB-5>
                        Gallery
                      </Text>
                    </View>
                    <SizedBox height={10} />
                    <FlatList
                      data={data.gallery}
                      renderItem={GalleryImage}
                      contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      ItemSeparatorComponent={() => <SizedBox height={10} />}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};
