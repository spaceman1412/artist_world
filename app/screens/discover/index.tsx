import {CommonType} from '@utils/types';
import * as React from 'react';
import {Card} from './card/card';
import {
  Animated,
  PanResponder,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {Dimensions} from 'react-native';
import {color} from '@theme';
import {Button} from '@components';
import Stroke from '@assets/images/stroke.svg';
import Heart from '@assets/images/heart.svg';
import Star from '@assets/images/star.svg';
import BackIcon from '@assets/images/back-arrow.svg';
import FilterIcon from '@assets/images/filter.svg';
import FilterSearch from '@components/filterSearch/filterSearch';
import firestore from '@react-native-firebase/firestore';
import {useAppDispatch, useAppSelector} from '@store/hook';
import {MatchAction} from '@store/match/reducer';
import auth from '@react-native-firebase/auth';
import {showMatch} from '@utils/constant';

interface Props {}

export const Discover: CommonType.AppScreenProps<'discover', Props> = ({
  navigation,
}) => {
  const swipe = React.useRef(new Animated.ValueXY()).current;
  const tiltSign = React.useRef(new Animated.Value(1)).current;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [age, setAge] = React.useState([15, 28]);
  const [gender, setGender] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [distance, setDistance] = React.useState([0]);
  const [userList, setUserList] = React.useState([]);
  const {matchList, fetch} = useAppSelector(state => state.match);
  const locations = [
    {id: '1', label: 'Hanoi'},
    {id: '2', label: 'SaiGon'},
    {id: '3', label: 'Da Lat'},
    {id: '4', label: 'Da Nang'},
    {id: '5', label: 'Ca Mau'},
  ];
  const {width} = Dimensions.get('screen');
  const dispatch = useAppDispatch();
  const getAge = (date: string) => {
    const today = new Date();
    const birthDate = new Date(date);
  
    return today.getFullYear() - birthDate.getFullYear();
  };
  const fetchUser = async userMatches => {
    let results = []


    let filter = await firestore()
      .collection('Users')
      .get();

    filter.forEach(userData => {
          let user = userData.data();
          if (userMatches.matches?.length > 0) {
            if (
              !userMatches.matches.some(
                value =>
                  value.trim() === userData.id ||
                  userData.id.trim() === auth().currentUser.uid.trim(),
              )
            ) {
              results.push(  {
                id: userData.id,
                name: user.firstName + ' ' + user.lastName,
                // images: user?.gallery ?  
                // [...user?.gallery ,user?.avatarUrl]
                // .map(image => ({uri: image})) 
                // : [{uri: user.avatarUrl}] ,
                images : [{uri: user.avatarUrl}],
                musicInterests: user!.musicInterests,
                musicRoles: user!.musicRoles,
                age: getAge(user!.birthDate)
                //
              })
              
            }
          } 
          else {
            if (userData.id.trim() !== auth().currentUser.uid.trim()) {
              results.push({
                id: userData.id,
                  name: user.firstName + ' ' + user.lastName,
                  images: [{uri: user.avatarUrl}],
                  musicInterests: user!.musicInterests,
                  musicRoles: user!.musicRoles,
                  age: getAge(user!.birthDate)
              })
  };}})

  return results
}
  const fetchUserMatch = async () => {
    const data = await firestore()
      .collection('user-match')
      .doc(auth().currentUser.uid)
      .get()
      .then(valueData => {
        if (valueData.exists) {
          const value = valueData.data();
          dispatch(MatchAction.updateMatchList(value.matches));
          dispatch(MatchAction.updateMatchListFlag(true))
          return value;
        } else {
          dispatch(MatchAction.createNewMatchUser());
          return [];
        }
      });
    return data;
  };
  
  React.useEffect(() => {
    const fetchData = async () => {
      if(!fetch)
      {
        const match = await fetchUserMatch();
        let fetchU = await fetchUser(match);
        setUserList(fetchU)
      }
      else
      {
        let fetchU = await fetchUser(matchList);
        setUserList(fetchU)
      }
    
    };
    fetchData().catch(console.error);
  }, []);

  
  const checkMatch = async (userId, matchedUserId) => {
    return firestore()
      .collection('user-match')
      .doc(matchedUserId)
      .get()
      .then(documentSnapshot => {
        if (!documentSnapshot.exists) {
          console.log('not exist');
        } else {
          let documents = documentSnapshot.data().matches;
          documents.forEach((userData: string) => {
            if (userData.trim() === userId.trim()) {
              alert(matchedUserId.trim());
              return;
            } else {
            }
          });
        }
      });
  };
  const alert = userId => {
    showMatch({userId: userId});
  };

  const handleMatch = (userId: string) => {
    dispatch(MatchAction.addMatchList(userId.trim()));
    dispatch(MatchAction.updateDataFirebase());
    checkMatch(auth().currentUser.uid.trim(), userId);
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      // allow to move free
      // onPanResponderMove: (e, { dx, dy, y0 }) => {
      //   tiltSign.setValue(y0 > height / 2 ? 1 : -1);
      //   swipe.setValue({ x: dx, y: dy });
      // },
      //
      onPanResponderRelease: (e, {dx, dy}) => {
        const direction = Math.sign(dx);
        const userAction = Math.abs(dx) > 100;
        if (userAction) {
          Animated.timing(swipe, {
            duration: 200,
            toValue: {
              x: direction * (width + width * 0.9),
              y: dy,
            },
            useNativeDriver: true,
          }).start(() => transitionNext(direction));
        } else {
          Animated.spring(swipe, {
            friction: 5,
            toValue: {
              x: 0,
              y: 0,
            },
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;
  const transitionNext = React.useCallback(
    value => {
      setUserList(prevState => prevState.slice(1));

      swipe.setValue({x: 0, y: 0});
    },
    [swipe],
  );

  const handleChoise = React.useCallback(
    (sign, userId) => {
      if (sign === 1) {
        //callAPI here
        handleMatch(userId);
      } else {
        // call API here
        console.log('unmatch');
      }
      Animated.timing(swipe.x, {
        duration: 500,
        toValue: sign * (width + width * 0.9),
        useNativeDriver: true,
      }).start(() => transitionNext(sign));
    },
    [swipe.x, transitionNext],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        {/* <Button
          onPress={() => setModalVisible(true)}
          style={styles.buttonHeader}>
          <FilterIcon />
        </Button> */}
      </View>
      <View style={styles.carouselContainer}>
        {userList.length > 0 ? (
          userList
            .map((vale, index) => {
              const isFirst = index === 0;
              const panHandlers = isFirst ? panResponder.panHandlers : {};
              return (
                <Card
                  isFirst={isFirst}
                  swipe={swipe}
                  tiltSign={tiltSign}
                  data={vale}
                  {...panHandlers}
                  key={index}
                />
              );
            })
            .reverse()
        ) : (
          <Text style={{color: color.storybookTextColor}}>
            There is No one here
          </Text>
        )}
      </View>

      <View style={styles.footer}>
        <Button
          onPress={() => handleChoise(-1, userList[0])}
          style={[styles.circleButton, styles.passButton]}>
          <Stroke />
        </Button>
        <Button style={[styles.circleButton, styles.heartButton]}>
          <Heart />
        </Button>
        <Button
          onPress={() => handleChoise(1, userList[0].id)}
          style={[styles.circleButton, styles.starButton]}>
          <Star />
        </Button>
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.whiteBackground,
    justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonHeader: {
    width: 52,
    height: 52,
    borderColor: color.palette.mischka,
    backgroundColor: color.transparent,
    borderWidth: 1,
    borderRadius: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  circleButton: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passButton: {
    width: 78,
    height: 78,
    backgroundColor: color.palette.outOfGreyWithOpacity(0.07),
    borderWidth: 0.1,
    borderColor: color.palette.blackWithOpacity(0.3),
  },
  carouselContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 500,
  },
  heartButton: {
    width: 99,
    height: 99,
    backgroundColor: color.primary,
  },
  starButton: {
    width: 78,
    height: 78,
    backgroundColor: color.palette.outOfGreyWithOpacity(0.07),
    borderWidth: 0.1,
    borderColor: color.palette.blackWithOpacity(0.3),
  },
  title: {
    color: color.storybookTextColor,
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 28.5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
