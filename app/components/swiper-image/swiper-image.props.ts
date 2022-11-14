import {ImageSourcePropType} from 'react-native';

export interface SwiperImageProps {
  images: Array<{image: ImageSourcePropType; age: string; name: string}>;
  width?: number;
  height?: number;
}
