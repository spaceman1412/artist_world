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
import Stroke from '@assets/images/stroke.svg';
import {getSize} from '@utils/responsive';
import {images} from '@assets/images';

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 200,
    borderRadius: 15,
    margin: 10,
  },
  image: {
    width: getSize.v(140),
    height: getSize.v(200),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  imageBlur: {
    width: 120,
    height: 180,
    position: 'absolute',
    borderRadius: 25,
    zIndex: 1,
  },

  buttonContainer: {
    height: 45,
    width: 45,
    backgroundColor: color.whiteBackground,
    borderWidth: 1,
    position: 'absolute',
    top: -5,
    zIndex: 2,
    borderRadius: 50,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    right: -8,
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
  const {userID, onHeartPress, onStokePress, image, name, ...rest} = props;

  // React.useEffect(() => {
  //   firestore()
  //     .collection('Users')
  //     .doc(userID)
  //     .get()
  //     .then(value => {
  //       const data = value.data();
  //       setUser({
  //         image: {uri: data.avatarUrl},
  //         name: data.firstName + ' ' + data.lastName,
  //       });
  //     });
  // }, []);
  return (
    <TouchableOpacity style={styles.surround} {...rest}>
      <View style={styles.container}>
        {name !== null ? (
          <>
            <ImageBackground
              // onLoadEnd={() => setLoading(false)}
              blurRadius={15}
              borderRadius={15}
              style={styles.image}
              resizeMode="stretch"
              source={image ? {uri: image} : images.placeholder}>
              <ImageBackground
                // onLoadEnd={ () => setLoading(false)}
                style={styles.imageBlur}
                borderTopLeftRadius={15}
                borderTopRightRadius={15}
                resizeMode={'stretch'}
                source={{uri: image}}>
                <Text numberOfLines={1} style={styles.text}>
                  {name}
                </Text>
              </ImageBackground>
            </ImageBackground>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onStokePress} style={styles.button}>
                <Stroke width={14} height={14} />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <></>
        )}

        {/* <TouchableOpacity
            onPress={onHeartPress}
            style={[styles.button, styles.buttonLeft]}>
            <Heart width={16} height={16} />
          </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};

export default UserCart;
