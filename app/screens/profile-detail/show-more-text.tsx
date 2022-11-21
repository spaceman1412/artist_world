import React, {ReactNode, useState} from 'react';
import {
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from 'react-native';
import {TouchableOpacity, Text} from 'react-native-ui-lib';
import {color} from '@theme';

interface Props {
  children?: ReactNode;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
}

const TextShowMore = ({style, children, numberOfLines}: Props) => {
  const [showMore, setShowMore] = useState(false);
  const [showAllText, setAllText] = useState(false);

  const onPressShowMore = () => {
    setAllText(!showAllText);
  };

  const onTextLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
    //FIXME: do not work very well on IOS
    // as it always return the same number of line with truncated text
    const lines = event.nativeEvent.lines;

    setShowMore(lines.length >= numberOfLines);
  };

  return (
    <>
      <Text
        style={style}
        numberOfLines={!showAllText ? numberOfLines : 0}
        onTextLayout={onTextLayout}>
        {children}
      </Text>
      {showMore && (
        <TouchableOpacity activeOpacity={0.6} onPress={onPressShowMore}>
          <Text text80BO marginT-5 color={color.primary}>
            {!showAllText ? 'Read more' : 'Show less'}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default TextShowMore;
