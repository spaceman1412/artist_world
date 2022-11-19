import {ReactNode, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  LayoutChangeEvent,
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

  const onLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    const maxHeight = numberOfLines * 21; // maxLine * lineHeight

    setShowMore(numberOfLines > 0 && height > maxHeight);
  };

  return (
    <>
      <Text
        style={style}
        numberOfLines={!showAllText ? numberOfLines : 0}
        onLayout={onLayout}>
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
