import {color} from '@theme/color';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  imageContainer: {
    width: 300,
    height: 500,
    borderRadius: 20,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: color.whiteBackground,
    paddingHorizontal: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonHeader: {
    width: 52,
    height: 52,
    borderColor: color.palette.mischka,
    backgroundColor: color.transparent,
    borderWidth: 1,
    borderRadius: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: getSize.v(15),
    left: getSize.v(85),
  },
  circleButton: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passButton: {
    width: 78,
    height: 78,
    backgroundColor: color.palette.outOfGreyWithOpacity(0.07),
    borderWidth: 0.1,
    borderColor: color.palette.blackWithOpacity(0.3),
  },
  carouselContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 500,
  },
  heartButton: {
    width: 99,
    height: 99,
    backgroundColor: color.primary,
  },
  starButton: {
    width: 78,
    height: 78,
    backgroundColor: color.palette.outOfGreyWithOpacity(0.07),
    borderWidth: 0.1,
    borderColor: color.palette.blackWithOpacity(0.3),
  },
  title: {
    color: color.storybookTextColor,
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 28.5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  bottomContainer: {
    backgroundColor: color.palette.blackBlur,
    height: getSize.v(83),
    padding: 16,
  },
  firstText: {color: 'white', fontSize: 24, fontWeight: '700'},
  secondText: {color: 'white', fontSize: 14},
});
