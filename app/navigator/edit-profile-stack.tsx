import { createStackNavigator } from '@react-navigation/stack';
import * as SCREENS from '@screens';
import { EditProfileNavigatorParamList } from './navigator-param-list';

const Stack = createStackNavigator<EditProfileNavigatorParamList>();

export const EditProfileStack = () => {
    return(
        <Stack.Navigator initialRouteName='editProfile'>
            <Stack.Screen name='editProfile' component={SCREENS.EditProfile}/>
            <Stack.Screen name = 'editInterest' component={SCREENS.EditInterest}/>
        </Stack.Navigator>
    )
}