import {TouchableOpacity, StyleSheet, Image, Text, View} from 'react-native';
import {getSize} from '@utils/responsive';
import type {MessageBoxProps} from './message-box.props';
import {color, spacing, size} from '@theme';
import LinearGradient from 'react-native-linear-gradient';

export const MessageBox = (props: MessageBoxProps) => {
  const {
    username,
    message,
    image,
    time,
    hasStory = false,
    unreadCount = 0,
  } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        {hasStory ? (
          <LinearGradient
            colors={[
              color.palette.orange,
              color.palette.primary,
              color.palette.purple,
            ]}
            style={styles.imageWrapper}>
            <Image source={image} style={styles.image} />
          </LinearGradient>
        ) : (
          <View style={styles.imageWrapper}>
            <Image source={image} style={styles.image} />
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.info}>
        <View style={styles.content}>
          <Text style={[styles.text, styles.username]} numberOfLines={1}>
            {username}
          </Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.text} numberOfLines={1}>
            {message}
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
    width: getSize.v(295),
    height: getSize.v(56),
    backgroundColor: color.background,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: spacing.small,
    borderBottomWidth: size.XXS,
    borderBottomColor: color.line,
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
