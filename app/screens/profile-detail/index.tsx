import React, {useState} from 'react';
import {CommonType} from '@utils/types';
import {color} from '@theme';
import {images} from 'assets/images';
import {getSize} from '@utils/responsive';
import GlobalStyles from '@theme/styles/global-style';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LeftArrow from '@assets/images/left-arrow.svg';
import PaperPlane from '@assets/images/paper-plane.svg';
import Location from '@assets/images/location.svg';
import TextShowMore from './show-more-text';
import {FlatList} from 'react-native-gesture-handler';

interface Props {}

const data = [
  {text: 'Travelling'},
  {text: 'Book'},
  {text: 'Music'},
  {text: 'Dancing'},
  {text: 'Modelling'},
  {text: 'Lmao'},
];

export const ProfileDetail: CommonType.AppScreenProps<
  'profileDetail',
  Props
> = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          <TouchableOpacity
            style={[styles.backButton, GlobalStyles.itemCenter]}
            onPress={() => navigation.navigate('home')}>
            <LeftArrow />
          </TouchableOpacity>
          <Image
            source={images.girl}
            style={[GlobalStyles.fullWidth, styles.mainImage]}
          />
          <View
            style={[
              styles.buttonList,
              GlobalStyles.row,
              GlobalStyles.itemCenter,
            ]}>
            <TouchableOpacity
              style={[styles.sideButton, GlobalStyles.itemCenter]}>
              <LeftArrow />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.matchButton, GlobalStyles.itemCenter]}>
              <LeftArrow />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sideButton, GlobalStyles.itemCenter]}>
              <LeftArrow />
            </TouchableOpacity>
          </View>
          <View style={[styles.info, GlobalStyles.justifyCenter]}>
            <View style={[GlobalStyles.row, GlobalStyles.justifyBetween]}>
              <View>
                <Text style={styles.name}>Jessica Parker, 23</Text>
                <Text style={styles.secondaryText}>Proffesional model</Text>
              </View>
              <TouchableOpacity
                style={[GlobalStyles.itemCenter, styles.messageButton]}>
                <PaperPlane />
              </TouchableOpacity>
            </View>
            <View style={styles.section}>
              <View>
                <Text style={styles.title}>Location</Text>
                <Text style={styles.secondaryText}>
                  Chicago, IL United States
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  GlobalStyles.row,
                  GlobalStyles.justifyEvenly,
                  GlobalStyles.alignCenter,
                  styles.locationButton,
                ]}>
                <Location />
                <Text style={styles.locationText}>1 km</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.section}>
              <View>
                <Text style={styles.title}>About</Text>
                <TextShowMore numberOfLines={3} style={[styles.secondaryText]}>
                  Lorem ipsum dolor sit amet, officia excepteur ex fugiat
                  reprehenderit enim labore culpa sint ad nisi Lorem pariatur
                  mollit ex esse exercitation amet. Nisi anim cupidatat
                  excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem
                  est aliquip amet voluptate voluptate dolor minim nulla est
                  proident. Nostrud officia pariatur ut officia. Sit irure elit
                  esse ea nulla sunt ex occaecat reprehenderit commodo officia
                </TextShowMore>
              </View>
            </View>
            <View style={styles.section}>
              <View style={GlobalStyles.flex}>
                <Text style={styles.title}>Interests</Text>
                <FlatList
                  data={data}
                  numColumns={3}
                  columnWrapperStyle={GlobalStyles.justifyBetween}
                  renderItem={({item}) => (
                    <View
                      style={[styles.interestItem, GlobalStyles.itemCenter]}>
                      <Text style={styles.interestText}>{item.text}</Text>
                    </View>
                  )}
                />
              </View>
            </View>
            <View style={styles.section}>
              <View style={GlobalStyles.flex}>
                <Text style={styles.title}>Gallery</Text>
                <View style={GlobalStyles.row}>
                  <Image source={images.girl} style={styles.galleryImage} />
                  <Image source={images.girl} style={styles.galleryImage} />
                  <Image source={images.girl} style={styles.galleryImage} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: color.whiteBackground,
    height: 1325,
  },
  buttonList: {
    position: 'absolute',
    top: getSize.v(337),
    left: 0,
    right: 0,
    zIndex: 1,
  },
  matchButton: {
    width: 99,
    height: 99,
    borderRadius: 49.5,
    marginHorizontal: 20,
    backgroundColor: color.primary,
    shadowColor: color.primary,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  sideButton: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: color.whiteBackground,
    shadowColor: color.palette.black,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.07,
    shadowRadius: 15,
  },
  messageButton: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: color.line,
  },
  locationButton: {
    width: 61,
    height: 34,
    backgroundColor: color.palette.primaryWithOpacity(0.1),
    borderRadius: 7,
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
  locationText: {
    fontSize: 12,
    fontWeight: '700',
    color: color.primary,
  },
  info: {
    position: 'absolute',
    top: getSize.v(386),
    paddingHorizontal: 40,
    paddingTop: 90,
    paddingBottom: 40,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    backgroundColor: color.whiteBackground,
  },
  name: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 36,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
  },
  secondaryText: {
    color: color.palette.blackBlur,
    lineHeight: 21,
    fontWeight: '400',
  },
  section: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  interestItem: {
    height: 32,
    width: 91,
    borderWidth: 1,
    borderColor: color.primary,
    marginBottom: 10,
    borderRadius: 5,
  },
  interestText: {
    fontWeight: '700',
    color: color.primary,
  },
  galleryImage: {
    width: 92,
    margin: 5,
    height: 122,
    borderRadius: 5,
  },
});
