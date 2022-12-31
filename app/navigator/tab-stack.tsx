import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as SCREENS from '@screens';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {color} from '@theme';

const Tab = createBottomTabNavigator();

export const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
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
