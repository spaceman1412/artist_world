import React, {useState} from 'react';
import {color} from '@theme';
import {Button, Text, Hint} from 'react-native-ui-lib';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

const InterestItem = ({item, index}) => {
  const [hintVisible, setHintVisible] = useState(false);

  return (
    <Button
      center
      marginB-10
      onPress={() => setHintVisible(!hintVisible)}
      outline
      outlineColor={color.primary}
      style={[
        styles.interestItem,
        // eslint-disable-next-line react-native/no-inline-styles
        {marginHorizontal: index % 3 === 1 ? getSize.v(10) : 0},
      ]}>
      <Hint
        message={item}
        visible={hintVisible}
        position={Hint.positions.TOP}
        color={color.primary}
        onBackgroundPress={() => setHintVisible(false)}>
        <Text
          numberOfLines={1}
          text90BO
          color={color.primary}
          children={item}
        />
      </Hint>
    </Button>
  );
};

const styles = StyleSheet.create({
  interestItem: {
    width: getSize.v(92),
    borderRadius: 5,
  },
});

export default InterestItem;
