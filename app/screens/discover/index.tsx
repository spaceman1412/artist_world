import {CommonType} from '@utils/types';
import * as React from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {color} from '@theme';
import {Button} from '@components';
import Stroke from '@assets/images/stroke.svg';
import Heart from '@assets/images/heart.svg';
import Star from '@assets/images/star.svg';
import firestore from '@react-native-firebase/firestore';
import {useAppDispatch, useAppSelector} from '@store/hook';
import {MatchAction} from '@store/match/reducer';
import auth from '@react-native-firebase/auth';
import {createNewMatchUser, handleMeters} from '@utils/constant';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';
import SizedBox from '@components/sized-box';
import GlobalStyles from '@theme/styles/global-style';
import {useState} from 'react';
import {LoaderScreen} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/EvilIcons';
import Swiper from 'react-native-deck-swiper';
import {getSize} from '@utils/responsive';
import {getDistance} from 'geolib';

interface Props {}

let swiperRef;

export const Discover: CommonType.AppScreenProps<'discover', Props> = ({
  navigation,
}) => {
  const index = React.useRef(0);
  const [userList, setUserList] = useState([]);
  const {matchList, fetch} = useAppSelector(state => state.match);
  const {coordinates} = useAppSelector(state => state.profile);

  const dispatch = useAppDispatch();
  const getAge = (date: string) => {
    const today = new Date();
    const birthDate = new Date(date);

    return today.getFullYear() - birthDate.getFullYear();
  };

  //TODO: Add empty card to swiper

  const swiped = (direction, userId) => {
    // Them dieu kien la khi list khong co
    // Bug undefined list
    console.log(userId);
    if (userList.length > 0) {
      index.current = index.current + 1;
      if (direction === 'right') {
        handleMatch(userId);
      } else if (direction === 'left') {
      }
    }
  };

  const sortUserList = userList => {
    if (coordinates !== null) {
      userList.sort((user1, user2) => {
        var coordinates1 = user1.coordinates,
          coordinates2 = user2.coordinates;

        if (!coordinates1) {
          return 1;
        }
        if (!coordinates2) {
          return -1;
        }

        var distance1 = getDistance(coordinates, coordinates1),
          distance2 = getDistance(coordinates, coordinates2);

        if (distance1 < distance2) {
          return -1;
        }
        if (distance1 > distance2) {
          return 1;
        }
        return 0;
      });
      return userList;
    } else {
      return userList;
    }
  };

  const Card = ({user}) => {
    const [imageState, setImageState] = useState<'loading' | 'end'>('end');
    let distance;

    // console.log(user.name);
    // console.log(coordinates);
    if (
      user.coordinates !== undefined &&
      user.coordinates !== null &&
      coordinates !== null
    ) {
      distance = handleMeters(getDistance(coordinates, user.coordinates));
    }
    const secondText =
      user.musicRoles.length > 0
        ? user.musicRoles.map((text, index) => {
            if (index === user.musicRoles.length - 1) {
              return secondText || '' + ` ${text}`;
            }

            return secondText || '' + ` ${text},`;
          })
        : 'Musician';
    return (
      <>
        {imageState === 'loading' && (
          <LoaderScreen
            containerStyle={[
              styles.imageContainer,
              {backgroundColor: color.palette.Gray},
            ]}
          />
        )}

        <View
          style={{
            alignItems: 'center',
            paddingTop: getSize.v(40),
            paddingLeft: getSize.v(10),
            flex: 1,
          }}>
          <FastImage
            source={{
              uri:
                user.images[0].uri === null
                  ? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
                  : user.images[0].uri,
              priority: FastImage.priority.high,
            }}
            onLoadStart={() => {
              setImageState('loading');
            }}
            onLoadEnd={() => {
              setImageState('end');
            }}
            style={[
              styles.imageContainer,
              {height: imageState === 'loading' ? 0 : 500},
            ]}>
            {distance && (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(93, 93, 94, 0.7)',
                  width: 80,
                  height: 34,
                  marginLeft: 20,
                  marginTop: 20,
                  flexDirection: 'row',
                  borderRadius: 7,
                }}>
                <Icon name={'location'} size={20} color={'white'} />
                <Text
                  style={{textAlign: 'center', fontSize: 12, color: 'white'}}>
                  {String(distance)}
                </Text>
              </View>
            )}

            <View style={GlobalStyles.flex} />
            <View style={styles.bottomContainer}>
              <Text style={styles.firstText}>
                {user.name}, {user.age}
              </Text>
              <SizedBox height={5} />
              <Text style={styles.secondText}>{secondText}</Text>
            </View>
          </FastImage>
        </View>
      </>
    );
  };

  const fetchUser = async userMatches => {
    let results = [];

    let filter = await firestore().collection('Users').get();

    // Loc ra nhung nguoi da match roi

    filter.forEach(userData => {
      let user = userData.data();
      if (userMatches.length > 0) {
        if (
          !userMatches.includes(userData.id.trim()) &&
          userData.id.trim() !== auth().currentUser.uid.trim()
        ) {
          results.push({
            id: userData.id,
            name: user.firstName + ' ' + user.lastName,
            images: [{uri: user.avatarUrl}],
            musicInterests: user!.musicInterests,
            musicRoles: user!.musicRoles,
            age: getAge(user!.birthDate),
            coordinates: user.coordinates,
          });
        }
      } else if (userData.id.trim() !== auth().currentUser.uid.trim()) {
        results.push({
          id: userData.id,
          name: user.firstName + ' ' + user.lastName,
          images: [{uri: user.avatarUrl}],
          musicInterests: user!.musicInterests,
          musicRoles: user!.musicRoles,
          age: getAge(user!.birthDate),
          coordinates: user.coordinates,
        });
      }
    });

    return results;
  };

  const fetchUserMatch = async () => {
    const data = await firestore()
      .collection('user-match')
      .doc(auth().currentUser.uid)
      .get()
      .then(valueData => {
        if (valueData.exists) {
          const value = valueData.data();
          const matches = [...value.waiting, ...value.matched];
          dispatch(MatchAction.updateMatchList(matches));
          dispatch(MatchAction.updateMatchListFlag(true));
          return matches;
        } else {
          createNewMatchUser(auth().currentUser.uid);
          return [];
        }
      });
    return data;
  };

  const EmptyCard = () => {
    return (
      <View
        style={[
          GlobalStyles.flex,
          GlobalStyles.itemCenter,
          {marginBottom: getSize.v(50)},
        ]}>
        <View
          style={[
            styles.imageContainer,
            {backgroundColor: color.palette.primary},
            GlobalStyles.itemCenter,
          ]}>
          <Text
            style={{
              color: color.whiteBackground,
              fontSize: 24,
              fontWeight: '600',
            }}>
            There are no user to match
          </Text>
        </View>
      </View>
    );
  };

  const SwiperUserCardList = () => {
    return React.useMemo(
      () =>
        index.current < userList.length ? (
          <Swiper
            ref={swiper => {
              swiperRef = swiper;
            }}
            cards={userList}
            renderCard={card => {
              return <Card user={card} />;
            }}
            keyExtractor={cardData => {
              return cardData && cardData.id;
            }}
            cardIndex={index.current}
            backgroundColor="transparent"
            showSecondCard
            stackSize={4}
            disableBottomSwipe
            disableTopSwipe
            stackScale={10}
            onSwipedRight={index => swiped('right', userList[index].id)}
            onSwipedLeft={index => swiped('left', userList[index].id)}
            onTapCard={index => {
              navigation.navigate('profileDetail', {uid: userList[index].id});
            }}
            stackSeparation={getSize.v(40)}
            cardVerticalMargin={getSize.v(50)}
            animateOverlayLabelsOpacity
            animateCardOpacity
            overlayLabels={{
              left: {
                title: 'NOPE',
                style: {
                  label: {
                    backgroundColor: color.palette.Red,
                    borderColor: color.palette.Red,
                    color: color.palette.white,
                    borderWidth: 1,
                    fontSize: 24,
                    marginTop: getSize.v(50),
                    marginRight: getSize.v(50),
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                  },
                },
              },
              right: {
                title: 'LIKE',
                style: {
                  label: {
                    backgroundColor: color.palette.Blue40,
                    borderColor: color.palette.Blue40,
                    color: color.palette.white,
                    borderWidth: 1,
                    fontSize: 24,
                    marginTop: getSize.v(50),
                    marginLeft: getSize.v(50),
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  },
                },
              },
            }}
          />
        ) : (
          <EmptyCard />
        ),
      [coordinates],
    );
  };

  React.useEffect(() => {
    const fetchData = async () => {
      if (!fetch) {
        const match = await fetchUserMatch();
        let fetchU = await fetchUser(match);
        const sortedUserList = await sortUserList(fetchU);
        setUserList(sortedUserList);
      } else {
        let fetchU = await fetchUser(matchList);
        const sortedUserList = await sortUserList(fetchU);

        setUserList(sortedUserList);
      }
    };
    fetchData().catch(console.error);
  }, []);

  const checkMatch = async (userId, matchedUserId) => {
    const data = await firestore()
      .collection('user-match')
      .doc(matchedUserId)
      .get();
    if (!data.exists) {
      createNewMatchUser(matchedUserId.trim());
      return 'not exists';
    } else {
      let documents = data.data().waiting;

      if (documents.includes(userId.trim())) {
        return 'matched';
      } else {
        return 'unmatched';
      }
    }
  };

  const handleMatch = async (userId: string) => {
    dispatch(MatchAction.addMatchList(userId.trim()));

    const status = await checkMatch(
      auth().currentUser.uid.trim(),
      userId.trim(),
    );
    console.log(status);
    if (status === 'matched') {
      // match function is not right yet
      dispatch(MatchAction.updateMatchedMatchFirebase());
    } else if (status === 'unmatched') {
      dispatch(MatchAction.updateWaitingMatchFirebase());
    }
  };

  // console.log(index);
  // console.log(userList.length);
  // console.log(index.current < userList.length);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
      </View>

      {React.useMemo(
        () =>
          userList.length > 0 && index.current < userList.length ? (
            <SwiperUserCardList />
          ) : (
            <EmptyCard />
          ),
        [userList, index, coordinates],
      )}

      <View style={styles.footer}>
        <Button
          onPress={() =>
            userList.length > 0 &&
            index.current < userList.length &&
            swiperRef.swipeLeft()
          }
          style={[styles.circleButton, styles.passButton]}>
          <Stroke />
        </Button>
        <SizedBox width={getSize.v(100)} />
        <Button
          onPress={() =>
            userList.length > 0 &&
            index.current < userList.length &&
            swiperRef.swipeRight()
          }
          style={[styles.circleButton, styles.heartButton]}>
          <Heart />
        </Button>
      </View>
      <SizedBox height={30} />
    </SafeAreaView>
  );
};
