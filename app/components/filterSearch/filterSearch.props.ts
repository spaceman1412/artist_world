import {  ModalProps } from "react-native";

export interface filterSearchProps extends ModalProps {
    onCloseModal : (value) => void,
    genderValue: string,
    setGender: (value) => void,
    locationValue: string,
    setLocation: (value) => void,
    LocationData: Array<{id:string, label: string}>,
    distance: Array<number>,
    setDistance: (value) => void,
    age: Array<number>,
    setAge: (value) => void,
}