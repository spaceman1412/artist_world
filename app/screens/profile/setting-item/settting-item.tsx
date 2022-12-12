import React from 'react';
import {images} from '@assets/images';
import {color} from '@theme';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

interface settingItemProps extends TouchableOpacityProps {
  text: string;
  icon: any;
}

export const SettingItem = (props: settingItemProps) => {
  const {text, icon, ...rest} = props;
  return (
    <TouchableOpacity {...rest} style={styles.container}>
      <View style={styles.leftContent}>
        <View style={styles.iconButton}>
          <Icon name={icon} size={20} color={color.primary} />
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.rightContent} />
      <Image source={images.nextArrow} style={styles.nextArrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: color.palette.mischka,
    borderBottomWidth: 1,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  iconButton: {
    width: 50,
    height: 50,
    backgroundColor: color.palette.PrimaryWithOpacity(0.1),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: color.storybookTextColor,
    fontWeight: '700',
    marginStart: 15,
  },
  rightContent: {
    flexGrow: 1,
  },
  nextArrow: {
    width: 20,
    height: 20,
  },
});
