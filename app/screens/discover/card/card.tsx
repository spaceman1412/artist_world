import {SwiperImage} from '@components/swiper-image/swiper-image';
import * as React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CardProps} from './card.props';

export const Card = (props: CardProps) => {
  const {data, swipe, tiltSign, isFirst, ...rest} = props;
  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['8deg', '0deg', '-8deg'],
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), {rotate: rotate}],
  };
  return (
    <Animated.View
      style={isFirst ? [animatedCardStyle, styles.container] : styles.container}
      {...rest}>
      <SwiperImage
        userId={data.id}
        images={data.images}
        name={data.name}
        age={data.age}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    Zindex: 10,
    position: 'absolute',
  },
});
