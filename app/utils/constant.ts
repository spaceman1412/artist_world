import {Dimensions} from 'react-native';
const {height, width, fontScale, scale} = Dimensions.get('window');

export class AppDims {
  static width: number = width;
  static height: number = height;
  static fontScale: number = fontScale;
  static scale: number = scale;

  static get DESIGN_WIDTH() {
    return 375;
  }

  static get DESIGN_HEIGHT() {
    return 812;
  }
}
