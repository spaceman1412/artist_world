import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as SCREENS from '@screens';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {color} from '@theme';
import {useAppDispatch} from '@store/hook';
import {ProfileActions} from '@store/profile/reducer';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {showMatch} from '@utils/constant';
import Geolocation from '@react-native-community/geolocation';

const Tab = createBottomTabNavigator();

export const TabStack = () => {
  const dispatch = useAppDispatch();

  const matchedList = React.useRef([]);
  const count = React.useRef(0);

  const checkMatch = async () => {
    try {
      firestore()
        .collection('user-match')
        .doc(auth().currentUser.uid.trim())
        .onSnapshot(async documentSnapshot => {
          if (documentSnapshot.exists) {
            const data = documentSnapshot.data();

            if (count.current === 0) {
              matchedList.current = data.matched;
              count.current = count.current + 1;
            } else if (
              data.matched.length > 0 &&
              data.matched.length > matchedList.current.length &&
              count.current > 0
            ) {
              console.log(data.matched, matchedList);
              matchedList.current = data.matched;
              count.current = count.current + 1;

              showMatch({userId: data.matched[data.matched.length - 1]});
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

  const getLocation = () => {
    Geolocation.getCurrentPosition(position => {
      console.log('called');
      const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&result_type=administrative_area_level_1&key=AIzaSyCxvSvmXcbtnLSvs2T4a7knLnrNzoJ-1h0`;

      const updateCurrentLocationData = async () => {
        let userinfo = await firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .get();
        let user = userinfo.data();
        const location = user.location ? user.location : '';
        const coordinates = user.coordinates ? user.coordinates : null;

        dispatch(
          ProfileActions.updateLocation({
            location: location,
            coordinates: coordinates,
          }),
        );
      };

      fetch(API_URL)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson.results[0]);
          if (responseJson.results[0]) {
            const location = responseJson.results[0].formatted_address; // Filter address include country and city
            const coordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            console.log(location, coordinates);
            dispatch(
              ProfileActions.updateLocation({
                location: location,
                coordinates: coordinates,
              }),
            );
          } else {
            updateCurrentLocationData();
          }
        });
    });
  };

  // load user data
  React.useEffect(() => {
    getUsers();
    checkMatch();
    getLocation();
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
