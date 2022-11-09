import { NavigationProp } from '@react-navigation/native';
export interface PhonePickerProps{
    flagCode: string,
    codeNumber: string,
    onChange: Function,
    value : string,
    navigation: NavigationProp<any, any>,
}