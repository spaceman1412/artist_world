import * as React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Button} from '@components';
import {images } from '@assets/images';
import { ListRenderItem } from 'react-native'
import {color} from '@theme';
interface INumberPadProps {
    onPress?: () => void,
    id: string,
}

const NumberPad: ListRenderItem<INumberPadProps> = (props) => {
  const {onPress, id} = props.item;
    return id === 'delete' ?
     <Button
            onPressIn={onPress}
            textStyle={styles.contentNumberButton}
            style={styles.numberButton}>
            <Image source={images.delete} style={{width: 22, height: 16}} />
      </Button> : 
          id === 'space'? 
          <View style={styles.numberButton}></View>:
     <Button
            text={id}
            textStyle={styles.contentNumberButton}
            style={styles.numberButton}
            onPressIn={onPress}
          />;
};

const styles = StyleSheet.create({
    numberButton: {
    width: '33%',
    padding: 10,
    margin: 3,
    height: 60,
    backgroundColor: color.transparent,
    
  },
    contentNumberButton: {
    fontSize: 24,
    color: color.storybookTextColor,
    fontWeight: '400',
  },
})
export default NumberPad;
