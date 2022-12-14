import { images } from '@assets/images';
import {color} from '@theme';
import * as React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {OnboardingItemProps} from './onboardingItem.props';

export const OnboardingItem = (props: OnboardingItemProps) => {
  const {image, name, age, width = 300, height = 500} = props;
  const [loading, setLoading] = React.useState(true);
  const sizeStyle = {width, height};
  return (
    <View style={[sizeStyle, styles.container]}>
      <Image
        onLoadEnd={() => setLoading(false)}
        source={loading ? images.placeholder : image}
        resizeMode="stretch"
        style={[sizeStyle, styles.container]}
      />
      <View style={styles.information}>
        <Text style={styles.name}>
          {name}, {age}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
  },
  information: {
    width: '100%',
    height: '20%',
    backgroundColor: color.palette.blackWithOpacity(0.7),
    position: 'absolute',
    bottom: 0,
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  name: {
    fontSize: 30,
    color: color.text,
    fontWeight: '700',
  },
});
