import {color} from '@theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  headerButton: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    fontWeight: '700',
    lineHeight: 24,
    fontSize: 16,
  },
  headerButtonContent: {
    color: color.primary,
    fontWeight: '700',
  },
  title: {
    fontWeight: '700',
    fontSize: 34,
    lineHeight: 51,
    color: color.storybookTextColor,
    alignSelf: 'flex-start',
  },
  buttonConfirmStyle: {
    width: 295,
    height: 56,
    backgroundColor: color.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  birthdayButton: {
    backgroundColor: color.palette.wispPink,
    width: 295,
    height: 58,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13,
  },
  textButtonBirthday: {
    color: color.primary,
    textAlign: 'center',
    fontWeight: '700',
  },
  inputContainer: {
    height: 60,
    marginVertical: 10,
  },
  inputWrapper: {
    width: 295,
    height: 58,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: color.palette.mischka,
    color: color.storybookTextColor,
    marginTop: -8,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 12,
    color: color.palette.GrayWithOpacity(0.3),
    backgroundColor: color.palette.white,
    zIndex: 2,
    width: 68,
    textAlign: 'center',
    fontWeight: '700',
  },
  input: {
    color: color.storybookTextColor,
    marginHorizontal: 20,
    fontSize: 14,
    flex: 1,
  },
  mainContainer: {flex: 1, backgroundColor: color.whiteBackground},
});
