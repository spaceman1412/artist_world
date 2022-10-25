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
}
