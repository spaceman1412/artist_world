import {
  ProfileDetailsNavigatorParamList,
  EditProfileNavigatorParamList,
} from './../navigator/navigator-param-list';
import {AppNavigatorParamList} from '@navigator/navigator-param-list';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';

export declare namespace CommonType {
  export type AppScreenProps<
    RouteName extends keyof AppNavigatorParamList,
    ComponentProps extends object,
  > = React.FC<
    StackScreenProps<AppNavigatorParamList & ComponentProps, RouteName>
  >;

  export type ProfileDetailsScreenProps<
    RouteName extends keyof ProfileDetailsNavigatorParamList,
    ComponentProps extends object,
  > = React.FC<
    StackScreenProps<
      ProfileDetailsNavigatorParamList & ComponentProps,
      RouteName
    >
  >;

  export type EditProfileScreenProps<
    RouteName extends keyof EditProfileNavigatorParamList,
    ComponentProps extends object,
  > = React.FC<
    StackScreenProps<EditProfileNavigatorParamList & ComponentProps, RouteName>
  >;
}

export declare namespace ModalTypes {
  interface Match {
    isVisible: boolean;
    userId: string;
  }
}
