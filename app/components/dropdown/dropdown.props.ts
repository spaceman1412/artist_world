import { ModalProps } from 'react-native';


export interface DropDownProps 
{
    //  data: [{id: string, label: string}],
    data: any,
    value : string,
    onSelect: () => void,
}