import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {getSize} from '@utils/responsive';
import type {MessageBoxProps} from './message-box.props';
import {color, spacing, size} from '@theme';
import LinearGradient from 'react-native-linear-gradient';
import * as React from 'react';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import {images} from '@assets/images';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export const MessageBox = (props: MessageBoxProps) => {
  const {
    username,
    image,
    hasStory = false,
    unreadCount = 0,
    roomId,
    onPress,
    userId,
  } = props;

  const [lastMessage, setLastMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    const getLastMessage = async () => {
      firestore()
        .collection('chat-messages')
        .doc(roomId.trim())
        .onSnapshot(value => {
          const message = value.data();
          setLastMessage(message.lastMessage);
        });
    };
    getLastMessage().catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('profileDetail', {
            uid: userId,
          })
        }>
        {hasStory ? (
          <LinearGradient
            colors={[
              color.palette.orange,
              color.palette.primary,
              color.palette.purple,
            ]}
            style={styles.imageWrapper}>
            <FastImage
              source={image || images.placeholder}
              style={styles.image}
            />
          </LinearGradient>
        ) : (
          <View style={styles.imageWrapper}>
            <FastImage
              onLoadEnd={() => setLoading(false)}
              source={
                loading || image.uri === null ? images.placeholder : image
              }
              style={styles.image}
            />
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.info} onPress={onPress}>
        <View style={styles.content}>
          <Text style={[styles.text, styles.username]} numberOfLines={1}>
            {username}
          </Text>
          <Text style={styles.time} />
        </View>
        <View style={styles.content}>
          <Text style={styles.text} numberOfLines={1}>
            {lastMessage && lastMessage.sendBy === auth().currentUser.uid && (
              <Text style={[styles.text, {color: color.palette.Gray}]}>
                You:{' '}
              </Text>
            )}

            {lastMessage !== null ? lastMessage.text : null}
          </Text>
          {unreadCount > 0 && (
            <View style={styles.unread}>
              <Text style={styles.unreadCount}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: getSize.v(56),
    backgroundColor: color.transparent,
    marginVertical: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: spacing.small,
    borderBottomWidth: size.XXS,
    backgroundColor: color.palette.mischka,
    padding: 10,
    borderRadius: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.tiny,
  },
  imageWrapper: {
    width: getSize.v(52),
    height: getSize.v(52),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getSize.v(26),
  },
  unread: {
    width: size.M,
    height: size.M,
    justifyContent: 'center',
    borderRadius: size.M / 2,
    backgroundColor: color.primary,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '700',
    color: color.text,
    textAlign: 'center',
  },
  time: {
    color: color.dim,
    fontSize: 12,
  },
  text: {
    fontSize: 14,
    width: getSize.v(189),
    color: color.storybookTextColor,
  },
  username: {
    fontWeight: '700',
  },
  image: {
    width: getSize.v(size.XL),
    height: getSize.v(size.XL),
    borderWidth: size.XXS,
    borderRadius: getSize.v(size.XL / 2),
    borderColor: color.palette.white,
  },
});
