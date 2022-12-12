import { createStackNavigator } from '@react-navigation/stack';
import * as SCREENS from '@screens';
import { EditProfileNavigatorParamList } from './navigator-param-list';

const Stack = createStackNavigator<EditProfileNavigatorParamList>();

export const EditProfileStack = () => {
    return(
        <Stack.Navigator initialRouteName='editProfile'>
            <Stack.Screen name='editProfile' component={SCREENS.EditProfile}
            options={{title: 'Edit Profile'}}
            />
            <Stack.Screen name = 'editInterest' 
            component={SCREENS.EditInterest}
            options={{title: 'Interests'}}
            />
            <Stack.Screen name='editRole' 
            component={SCREENS.EditRole}
            options={{title: 'Roles'}}
            />
            <Stack.Screen name ='editGallery'
            component={SCREENS.EditGallery}
            options={{title: 'Gallery'}}
            />
        </Stack.Navigator>
    )
}