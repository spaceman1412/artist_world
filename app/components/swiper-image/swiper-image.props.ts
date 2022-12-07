import {ImageSourcePropType} from 'react-native';

export interface SwiperImageProps {
  images: Array<ImageSourcePropType>;
  name: string;
  age: string;
  width?: number;
  height?: number;
  userId?: string;
}
