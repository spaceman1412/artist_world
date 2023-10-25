import React, {useEffect, useState} from 'react';
import {CommonType} from '@utils/types';
import {color} from '@theme';
import GlobalStyles from '@theme/styles/global-style';
import {
  ScrollView,
  FlatList,
  Linking,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import BackIcon from '@assets/images/back-arrow.svg';
import Location from '@assets/images/location.svg';
import TextShowMore from './show-more-text';
import {Button as ThienButton} from '@components';
import {Button, View, Text, LoaderScreen} from 'react-native-ui-lib';
import firestore from '@react-native-firebase/firestore';
import ImageView from 'react-native-image-viewing';
import InterestItem from './interest-item';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';
import SizedBox from '@components/sized-box';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {getSize} from '@utils/responsive';

interface Props {}

export const ProfileDetail: CommonType.AppScreenProps<
  'profileDetail',
  Props
> = ({navigation, route}) => {
  const uid = route.params?.uid || auth().currentUser.uid;
  const [data, setData] = useState(undefined);
  const [age, setAge] = useState('');
  const {width} = Dimensions.get('window');

  const images = data?.gallery.map(item => {
    return {uri: item};
  });

  const [visible, setIsVisible] = useState(false);

  console.log(data?.gallery);
  const location = (data && data.location) || 'Việt Nam';
  const LENGTH = data?.gallery.length;

  let NUM_ITEM_PER_ROW;
  if (LENGTH === 3 || LENGTH === 5) {
    NUM_ITEM_PER_ROW = 3;
  } else if (LENGTH === 2 || LENGTH === 4) {
    NUM_ITEM_PER_ROW = 2;
  } else {
    NUM_ITEM_PER_ROW = 1;
  }

  useEffect(() => {
    const getUserData = async () => {
      const res = await firestore().collection('Users').doc(uid).get();

      setData(res.data());
    };

    getUserData().catch(console.error);
  }, []);

  useEffect(() => {
    if (data && data.birthDate) {
      const today = new Date();
      const birthDate = new Date(data.birthDate);

      if (today.getFullYear() - birthDate.getFullYear() > 0) {
        setAge(`${today.getFullYear() - birthDate.getFullYear()}`);
      }
    }
  }, [data]);

  const GalleryImage = ({item, index}) => {
    const WIDTH =
      (width - getSize.v(10) * NUM_ITEM_PER_ROW) / NUM_ITEM_PER_ROW -
      getSize.v(20);
    const HEIGHT = WIDTH + getSize.v(40);

    return (
      <>
        <FastImage
          key={item}
          source={{uri: item}}
          style={[
            styles.galleryImage,
            {width: WIDTH, height: HEIGHT, resizeMode: 'contain'},
          ]}
        />
        <SizedBox width={10} />
      </>
    );
  };

  const handleGoogleMaps = () => {
    const queryLocationName = location.replace(' ', '+');

    const url = `https://www.google.com/maps/search/?api=1&query=${queryLocationName}`;
    Linking.openURL(url);
  };

  //FIXME: The ScrollView cannot be resized on content changing
  return (
    <View flex backgroundColor={color.whiteBackground}>
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
              onPress={() => navigation.goBack()}
              children={<BackIcon />}
            />

            <View
              centerV
              paddingT-40
              paddingB-40
              paddingH-40
              style={[GlobalStyles.fullWidth, styles.info]}
              backgroundColor={color.whiteBackground}>
              <View row spread flex>
                <View>
                  <Text text50>
                    {`${data.firstName} ${data.lastName}, ${age}`}
                  </Text>
                  {data.musicRoles && (
                    <Text text80 style={styles.secondaryText} numberOfLines={1}>
                      {data.musicRoles.join(', ')}
                    </Text>
                  )}
                </View>
                <ThienButton
                  onPress={() =>
                    data.favouriteSong && Linking.openURL(data.favouriteSong)
                  }
                  style={styles.messageButton}
                  children={
                    <Icon
                      name="youtube"
                      size={getSize.v(30)}
                      color={color.primary}
                    />
                  }
                />
              </View>
              <View marginT-30 row spread centerV>
                <View>
                  <Text text60 marginB-5>
                    Location
                  </Text>
                  <Text text80 style={styles.secondaryText}>
                    {location}
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
                  onPress={handleGoogleMaps}
                  label="Google Maps"
                  style={styles.locationButton}
                  labelStyle={styles.mainText}
                />
              </View>
              {data.about && (
                <View marginT-30>
                  <Text text60 marginB-5>
                    About
                  </Text>
                  <TextShowMore numberOfLines={3} style={styles.secondaryText}>
                    {data.about}
                  </TextShowMore>
                </View>
              )}

              {data.musicInterests && (
                <View marginT-30>
                  <Text text60 marginB-5>
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

              <ImageView
                images={images}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
              />

              {data?.gallery?.length > 0 && (
                <View marginT-20>
                  <View flex>
                    <View row spread>
                      <Text text60 marginB-5>
                        Gallery
                      </Text>
                      <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => setIsVisible(true)}>
                        <Text
                          style={{
                            color: color.palette.primary,
                            textAlign: 'center',
                            alignItem: 'center',
                            fontWeight: '700',
                            fontSize: 14,
                          }}>
                          See all
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <SizedBox height={10} />

                    <FlatList
                      data={data.gallery}
                      numColumns={NUM_ITEM_PER_ROW}
                      key={'_'}
                      keyExtractor={item => '_' + item}
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
    </View>
  );
};
