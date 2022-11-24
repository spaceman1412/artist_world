import { ImageSourcePropType } from "react-native";
import { FastImageProps, Source } from "react-native-fast-image";

export interface MessageBoxProps {
    /**
     * Latest received message
     */
    message: string;

    /**
     * Check if user has their story
     */
    hasStory?: boolean;

    /**
     * Time has passed since latest message was read
     */
    time: number | string,

    image: number | Source,
    username: string,

    /**
     * Number of unread message
     */
    unreadCount?: number,
    onPress: () => void,
    roomId: string,
}
