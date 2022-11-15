import React from 'react';
import {ColorValue, View} from 'react-native';

interface Props {
  children?: React.ReactElement;
  height?: number | string;
  width?: number | string;
  backgroundColor?: ColorValue | string;
}

const SizedBox: React.FC<Props> = ({
  children,
  height,
  width,
  backgroundColor,
}) => {
  return <View style={{height, width, backgroundColor}}>{children}</View>;
};

export default SizedBox;
