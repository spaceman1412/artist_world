import {userCartProps} from './user-card.props';
import * as React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color} from '@theme';
import Heart from '@assets/images/heart.svg';
import Stroke from '@assets/images/stroke.svg';
import firestore from '@react-native-firebase/firestore';
import { images } from '@assets/images';

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 200,
    borderRadius: 15,
    margin: 10,
  },
  image: {
    width: 140,
    height: 200,
  },
  imageBlur: {
    width: 140,
    height: 160,
    position: 'absolute',
  },

  buttonContainer: {
    height: 40,
    width: '100%',
    backgroundColor: color.palette.GrayWithOpacity(0.6),
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    left: 0,
  },
  button: {
    backgroundColor: color.transparent,
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLeft: {
    borderLeftWidth: 1,
    borderLeftColor: color.palette.white,
  },
  text: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    fontWeight: '700',
    fontSize: 16,
    color: color.text,
    margin: 5,
    lineHeight: 24,
  },
  surround: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const UserCart = (props: userCartProps) => {
  const {userID, onHeartPress, onStokePress, ...rest} = props;
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    firestore()
      .collection('Users')
      .doc(userID)
      .get()
      .then(value => {
        const data = value.data();
        setUser({
          image: {uri: data.avatarUrl},
          name: data.firstName + ' ' + data.lastName,
        });
      });
  }, []);
  return (
    <TouchableOpacity style={styles.surround} {...rest}>
      <View style={styles.container}>
        {user !== null ? (
          <ImageBackground
            onLoadEnd={() => setLoading(false)}
            blurRadius={15}
            borderRadius={15}
            style={styles.image}
            resizeMode="stretch"
            source={loading ? images.placeholder : user.image}>
            <ImageBackground
              onLoadEnd={ () => setLoading(false)}
              style={styles.imageBlur}
              borderTopLeftRadius={15}
              borderTopRightRadius={15}
              resizeMode={'stretch'}
              source={loading ? images.placeholder : user.image}>
              <Text numberOfLines={1} style={styles.text}>
                {user.name}
              </Text>
            </ImageBackground>
          </ImageBackground>
        ) : (
          <></>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onStokePress} style={styles.button}>
            <Stroke width={14} height={14} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onHeartPress}
            style={[styles.button, styles.buttonLeft]}>
            <Heart width={16} height={16} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCart;
