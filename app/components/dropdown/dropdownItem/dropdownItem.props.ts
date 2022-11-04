import { TouchableOpacityProps } from 'react-native';

export interface DropdownItemProps extends TouchableOpacityProps{
    item: {id: string,label: string},
}