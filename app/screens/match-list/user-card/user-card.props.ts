import { ImageBackgroundProps, ImageProps, TouchableOpacityProps } from "react-native";

export interface userCartProps extends TouchableOpacityProps{
    onHeartPress: () => void,
    onStokePress: () => void,
    userID: string;
}