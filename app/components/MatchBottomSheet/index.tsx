import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, View, Text, Platform, Image} from 'react-native';
import {ModalTypes} from '@utils/types';
import {getSize} from '@utils/responsive';
import {color} from '@theme/color';
import {radius} from '@theme';
import {Button} from '@components';
import {images} from '@assets/images';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const INITIAL_MATCH_STATE: ModalTypes.Match = {
  isVisible: false,
  userId: '',
};

export interface MatchModalRef {
  show: (params: Omit<ModalTypes.Match, 'isVisible'>) => void;
  hide: () => void;
}

export const MatchModal = forwardRef<MatchModalRef>((_, ref) => {
  const [state, setState] = useState(INITIAL_MATCH_STATE);
  const navigation = useNavigation();
  const userImage = images.man;
  const matchImage = images.girl;
  const [disbaleOnPress, setDisableOnPress] = useState(false);

  const createNewMessageRoom = userId => {
    setDisableOnPress(true);
    const authUser = auth().currentUser.uid.trim();
    const postReference = firestore().collection('chat-messages').doc();
    const lastMessage = {
      _id: '1',
      createAt: new Date(),
      sendBy: authUser.toString(),
      text: 'Hello',
    };
    const sendMessage = firestore().runTransaction(async transaction => {
      await transaction
        .set(postReference, {
          lastMessage: lastMessage,
          members: [authUser, userId],
        })
        .set(postReference.collection('messages').doc('1'), {
          ...lastMessage,
        })
        .get(postReference);
      await addNewMessageRoom(authUser, postReference.id.trim());
      await addNewMessageRoom(userId, postReference.id.trim());
      // navigation.navigate('messages')
    });
    sendMessage
      .then(() => {
        setTimeout(() => navigation.navigate('messages'), 2000);
      })
      .finally(hide);
  };

  const addNewMessageRoom = async (userId: string, idRoom: string) => {
    const getUserRoom = await firestore()
      .doc(`user-chat/${userId.trim()}`)
      .get();
    if (!getUserRoom.exists) {
      firestore()
        .collection('user-chat')
        .doc(userId.trim())
        .set({
          roomId: [idRoom],
        });
    } else {
      firestore()
        .collection('user-chat')
        .doc(userId.trim())
        .update({
          roomId: firestore.FieldValue.arrayUnion(idRoom),
        });
    }
  };

  const show: MatchModalRef['show'] = params => {
    setState({...INITIAL_MATCH_STATE, ...params, isVisible: true});
  };

  const hide: MatchModalRef['hide'] = () => {
    setState(INITIAL_MATCH_STATE);
  };

  useImperativeHandle(ref, () => ({show, hide}), []);

  useEffect(() => {
    if (!ref) {
      throw new Error('Chưa đăng kí ref');
    }
  }, []);

  return (
    <Modal isVisible={state.isVisible} style={styles.modalContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.coupleImageContainer}>
          <View
            style={[
              Platform.OS === 'android'
                ? styles.androidShadow
                : styles.iosShadow,
              styles.userContainer,
            ]}>
            <Image source={userImage} style={styles.userImageContent} />
            <View style={styles.matchIcon1}>
              <Image source={images.heart} style={styles.image} />
            </View>
          </View>

          <View
            style={[
              Platform.OS === 'android'
                ? styles.androidShadow
                : styles.iosShadow,
              styles.matchContainer,
            ]}>
            <Image source={matchImage} style={styles.matchImageContent} />

            <View style={styles.matchIcon2}>
              <Image source={images.heart} style={styles.image} />
            </View>
          </View>
        </View>
        <Text style={styles.headerText}>It's a match</Text>
        <Text style={styles.bodyText}>
          start a conversation with eachother!
        </Text>
        <Button
          text={disbaleOnPress ? '...Loading' : 'Say Hello'}
          disabled={disbaleOnPress}
          textStyle={styles.buttonText1}
          style={styles.button1}
          onPress={() => createNewMessageRoom(state.userId)}
        />
        <Button
          text="Keep swiping"
          preset="outline"
          textStyle={styles.buttonText2}
          style={styles.button2}
          onPress={hide}
        />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0, // This is the important style you need to set
    backgroundColor: color.whiteBackground,
  },
  iosShadow: {
    shadowColor: color.palette.black,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  androidShadow: {
    borderColor: color.palette.black,
    elevation: 3,
    shadowColor: color.palette.black,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  coupleImageContainer: {
    flexDirection: 'row',
    paddingBottom: 100,
  },
  userContainer: {top: 20, transform: [{rotateZ: '-10deg'}]},
  matchContainer: {transform: [{rotateZ: '10deg'}]},
  userImageContent: {
    width: getSize.v(160),
    height: getSize.v(240),
    borderRadius: 10,
    alignContent: 'center',
  },
  matchImageContent: {
    width: getSize.v(160),
    height: getSize.v(240),
    borderRadius: 10,
  },

  headerText: {
    top: 40,
    fontWeight: '700',
    fontSize: 36,
    padding: 20,
    textAlign: 'center',
    color: color.primary,
  },
  bodyText: {
    top: 10,
    fontWeight: '500',
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
    color: color.storybookTextColor,
  },
  button1: {
    width: getSize.v(295),
    height: getSize.v(56),
    position: 'absolute',
    bottom: getSize.v(0),
    borderRadius: radius.ML,
    color: color.primary,
    backgroundColor: color.primary,
  },
  buttonText1: {color: color.palette.white},
  button2: {
    width: getSize.v(295),
    height: getSize.v(56),
    position: 'absolute',
    bottom: getSize.v(-70),
    borderRadius: radius.ML,
    color: color.palette.secondary,
  },
  buttonText2: {color: color.primary},
  matchIcon1: {
    position: 'absolute',
    left: getSize.v(-20),
    top: getSize.v(210),
    width: getSize.v(50),
    height: getSize.v(50),
    borderRadius: 90,
    alignContent: 'center',
    borderColor: color.palette.black,
    justifyContent: 'center',
    backgroundColor: color.palette.white,
  },
  image: {
    display: 'flex',
    width: getSize.v(35),
    height: getSize.v(35),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  matchIcon2: {
    position: 'absolute',
    left: getSize.v(-22),
    top: getSize.v(-22),
    width: getSize.v(50),
    height: getSize.v(50),
    borderRadius: 90,
    alignContent: 'center',
    borderColor: color.palette.black,
    justifyContent: 'center',
    backgroundColor: color.palette.white,
  },
});
