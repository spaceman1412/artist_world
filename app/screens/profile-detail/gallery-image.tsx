import React from 'react';
import {StyleSheet} from 'react-native';
import {getSize} from '@utils/responsive';
import FastImage from 'react-native-fast-image';

const GalleryImage = (item, index) => {
  return (
    <FastImage key={item} source={{uri: item}} style={styles.galleryImage} />
  );
};

const styles = StyleSheet.create({
  galleryImage: {
    width: getSize.v(299),
    height: getSize.v(322),
    borderRadius: 5,
  },
});

export default GalleryImage;
