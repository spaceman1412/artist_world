import { ImageBackgroundProps, ImageProps, TouchableOpacityProps } from "react-native";

export interface userCartProps extends TouchableOpacityProps{
    name: string,
    age: string,
    image: any,
    onHeartPress: () => void,
    onStokePress: () => void,
}