import {StyleSheet} from 'react-native';

const GlobalStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  itemCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  flexStart: {
    alignItems: 'flex-start',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyEvenly: {
    justifyContent: 'space-evenly',
  },
  alignCenter: {
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },

  /// Dimension

  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  halfWidth: {
    width: '50%',
  },
  halfHeight: {
    height: '50%',
  },
});

export default GlobalStyles;
