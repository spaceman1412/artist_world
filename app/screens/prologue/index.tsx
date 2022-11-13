import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {images} from '@assets/images/index';
import {CommonType} from '@utils/types';
import {getSize} from '@utils/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  button: {
    width: 295,
    height: 56,
    backgroundColor: 'rgba(233, 64, 87, 1)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: getSize.v(235),
    height: getSize.v(360),
    borderRadius: 15,
  },
  text: {color: 'white', fontSize: getSize.font(16)},
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  textButton: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.7)',
  },
  textBottom: {
    color: 'rgba(233, 64, 87, 1)',
    fontSize: getSize.font(16),
  },
});

interface Props {}

export const Prologue: CommonType.AppScreenProps<'prologue', Props> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Image source={images.girl} style={styles.imageContainer} />
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('createAccount')}>
          <Text style={styles.text}>Create an account</Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <Text style={styles.textButton}>Already have an account? </Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('phoneLogin')}>
            <Text style={styles.textBottom}>Sign In!</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};
