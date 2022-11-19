import {ModalProps} from 'react-native'

export interface DateTimePickerProps extends ModalProps
{
    onCloseModal: () => void,
    date: string,
    setDate: (date) => void,
}