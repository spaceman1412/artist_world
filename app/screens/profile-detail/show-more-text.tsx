import {React, ReactNode, useState} from 'react';
import {
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from 'react-native';
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
        <TouchableOpacity onPress={onPressShowMore}>
          <Text style={styles.textShowMore}>
            {!showAllText ? 'Read more' : 'Show less'}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textShowMore: {
    color: color.primary,
    fontWeight: '700',
    marginTop: 5,
  },
});

export default TextShowMore;
