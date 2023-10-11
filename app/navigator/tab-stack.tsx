import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as SCREENS from '@screens';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {color} from '@theme';
import {useAppDispatch, useAppSelector} from '@store/hook';
import {ProfileActions} from '@store/profile/reducer';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {showMatch} from '@utils/constant';
import {MatchAction} from '@store/match/reducer';

const Tab = createBottomTabNavigator();

export const TabStack = () => {
  const dispatch = useAppDispatch();

  // const {matchedList, count} = useAppSelector(state => state.match);

  const matchedList = React.useRef([]);
  const count = React.useRef(0);

  const checkMatch = async () => {
    try {
      firestore()
        .collection('user-match')
        .doc(auth().currentUser.uid.trim())
        .onSnapshot(async documentSnapshot => {
          //snapshot variable not update
          if (documentSnapshot.exists) {
            const data = documentSnapshot.data();

            if (count.current === 0) {
              // dispatch(MatchAction.updateMatchedList(data.matched));
              // dispatch(MatchAction.updateCounters());
              matchedList.current = data.matched;
              count.current = count.current + 1;
            } else if (
              data.matched.length > 0 &&
              data.matched !== matchedList.current &&
              count.current > 0
            ) {
              console.log(data.matched, matchedList);
              matchedList.current = data.matched;
              count.current = count.current + 1;

              showMatch({userId: data.matched[data.matched.length]});
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    let userinfo = await firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .get();
    let user = userinfo.data();
    dispatch(
      ProfileActions.updateUserFullInfo({
        avatarUrl: user.avatarUrl ? user.avatarUrl : '',
        firstName: user.firstName ? user.firstName : '',
        lastName: user.lastName ? user.lastName : '',
        birthDate: user.birthDate ? user.birthDate : '',
        musicInterests: user.musicInterests ? user.musicInterests : [],
        musicRoles: user.musicRoles ? user.musicRoles : [],
        gallery: user.gallery ? user.gallery : [],
        sex: user.sex ? user.sex : 'not',
        about: user.about ? user.about : '',
        location: user.location ? user.location : '',
        favouriteSong: user.favouriteSong ? user.favouriteSong : '',
      }),
    );
  };

  // load user data
  React.useEffect(() => {
    getUsers();
    checkMatch();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'discover') {
            iconName = 'cards';
          } else if (route.name === 'matchList') {
            iconName = 'heart';
          } else if (route.name === 'messages') {
            iconName = 'message-text';
          } else if (route.name === 'profile') {
            iconName = 'account';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: color.palette.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {backgroundColor: color.palette.GrayTab},
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="discover"
        component={SCREENS.Discover}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="matchList"
        component={SCREENS.MatchList}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="messages"
        component={SCREENS.Messages}
        options={{headerShown: false, unmountOnBlur: true}}
      />

      <Tab.Screen
        name="profile"
        component={SCREENS.Profile}
        options={{headerShown: false, unmountOnBlur: true}}
      />
    </Tab.Navigator>
  );
};
