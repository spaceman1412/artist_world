import { ModalProps } from "react-native";

export interface MessageModalProps extends ModalProps{
    room?: any,
    onclose: () => void,
        
}