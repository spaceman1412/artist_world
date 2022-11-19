import * as React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {SwiperImageProps} from './swiper-image.props';
import {OnboardingItem} from './onboardItem/onboardItem';
import {color} from '@theme';

export function SwiperImage(props: SwiperImageProps) {
  const {
  images, 
  width = 295, 
  height = 500,
  name, 
  age,
  } = props;
  const [imgActive, setImgActive] = React.useState(0);
  const sizeStyle = [{width, height}];
  const onSlide = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.y / nativeEvent.layoutMeasurement.height,
      );
      if (slide !== imgActive) {
        setImgActive(slide);
      }
    }
  };

  return (
    <View  style={[styles.container, sizeStyle]}>
      <View style={sizeStyle}>
        <ScrollView
          onScroll={({nativeEvent}) => onSlide(nativeEvent)}
          pagingEnabled
          style={sizeStyle}>
          {images.map((item, index) => (
            <OnboardingItem
              key={index}
              image={item}
              name={name}
              age={age}
              width={width}
              height={height}
              
            />
          ))}
        </ScrollView>
        <View style={styles.wrapDot}>
          {images.map((e, index) => (
            <View
              key={index}
              style={
                imgActive === index ? styles.dotActive : styles.dot
              }></View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 15,
  },
  wrapDot: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
    top: '35%',
    backgroundColor: color.palette.GrayWithOpacity(0.6),
    borderTopStartRadius: 15,
    borderBottomStartRadius: 15,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
    overflow: 'hidden',
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: color.palette.lightGrey,
    borderRadius: 50,
    margin: 3,
  },
  dotActive: {
    width: 4,
    height: 4,
    backgroundColor: color.palette.white,
    borderRadius: 50,
    margin: 3,
  },
});
