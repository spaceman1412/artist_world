import {color} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    height: getSize.v(1325),
  },
  circleList: {
    top: getSize.v(320),
    zIndex: 2,
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
  },
  locationButton: {
    height: 34,
  },
  info: {
    zIndex: 1,
    overflow: 'visible',
    marginTop: -getSize.v(40),
    borderTopEndRadius: getSize.v(50),
    borderTopStartRadius: getSize.v(50),
  },
  galleryImage: {
    width: getSize.v(250),
    height: getSize.v(300),
    borderRadius: 5,
  },
});
