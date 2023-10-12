import {CommonType} from '@utils/types';
import * as React from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {color} from '@theme';
import {Button} from '@components';
import Stroke from '@assets/images/stroke.svg';
import Heart from '@assets/images/heart.svg';
import Star from '@assets/images/star.svg';
import FilterSearch from '@components/filterSearch/filterSearch';
import firestore from '@react-native-firebase/firestore';
import {useAppDispatch, useAppSelector} from '@store/hook';
import {MatchAction} from '@store/match/reducer';
import auth from '@react-native-firebase/auth';
import {createNewMatchUser} from '@utils/constant';
import TinderCard from 'react-tinder-card';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';
import SizedBox from '@components/sized-box';
import GlobalStyles from '@theme/styles/global-style';
import {useState} from 'react';
import {LoaderScreen} from 'react-native-ui-lib';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {}

export const Discover: CommonType.AppScreenProps<'discover', Props> = ({
  navigation,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [age, setAge] = useState([15, 28]);
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState([0]);
  const [userList, setUserList] = useState([]);
  const {matchList, fetch} = useAppSelector(state => state.match);

  const locations = [
    {id: '1', label: 'Hanoi'},
    {id: '2', label: 'SaiGon'},
    {id: '3', label: 'Da Lat'},
    {id: '4', label: 'Da Nang'},
    {id: '5', label: 'Ca Mau'},
  ];

  const dispatch = useAppDispatch();
  const cardRef = React.useRef();
  const getAge = (date: string) => {
    const today = new Date();
    const birthDate = new Date(date);

    return today.getFullYear() - birthDate.getFullYear();
  };

  const swiped = (direction, userId) => {
    // Them dieu kien la khi list khong co
    // Bug undefined list
    if (userList.length > 0) {
      if (direction === 'right') {
        handleMatch(userId);
        setUserList(prevState => prevState.slice(1));
      } else if (direction === 'left') {
        setUserList(prevState => prevState.slice(1));
      }
    }
  };

  const outOfFrame = () => {};

  const Card = ({user}) => {
    const [imageState, setImageState] = useState<'loading' | 'end'>('end');
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

        <TinderCard
          ref={cardRef}
          onSwipe={direction => swiped(direction, user.id)}
          onCardLeftScreen={outOfFrame}
          preventSwipe={['top', 'bottom']}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('profileDetail', {
                uid: user.id,
              })
            }>
            <FastImage
              source={{
                uri: user.images[0].uri,
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
              <View style={GlobalStyles.flex} />
              <View style={styles.bottomContainer}>
                <Text style={styles.firstText}>
                  {user.name}, {user.age}
                </Text>
                <SizedBox height={5} />
                <Text style={styles.secondText}>{secondText}</Text>
              </View>
            </FastImage>
          </TouchableOpacity>
        </TinderCard>
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
          //
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

  React.useEffect(() => {
    const fetchData = async () => {
      if (!fetch) {
        const match = await fetchUserMatch();
        let fetchU = await fetchUser(match);
        setUserList(fetchU);
      } else {
        let fetchU = await fetchUser(matchList);
        setUserList(fetchU);
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
      </View>

      {userList.length > 0 ? (
        <View style={[GlobalStyles.flex, GlobalStyles.itemCenter]}>
          <Card user={userList[0]} />
        </View>
      ) : (
        <View style={[GlobalStyles.flex, GlobalStyles.itemCenter]}>
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
      )}

      <View style={styles.footer}>
        <Button
          onPress={() => {
            swiped('left', userList[0].id);
          }}
          style={[styles.circleButton, styles.passButton]}>
          <Stroke />
        </Button>
        <Button style={[styles.circleButton, styles.heartButton]}>
          <Heart />
        </Button>
        <Button
          onPress={() => {
            swiped('right', userList[0].id);
          }}
          style={[styles.circleButton, styles.starButton]}>
          <Star />
        </Button>
      </View>
      <SizedBox height={30} />
      <FilterSearch
        visible={modalVisible}
        onCloseModal={setModalVisible}
        genderValue={gender}
        setGender={setGender}
        locationValue={location}
        setLocation={setLocation}
        LocationData={locations}
        distance={distance}
        setDistance={setDistance}
        age={age}
        setAge={setAge}
        animationType={'slide'}
        onRequestClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};
