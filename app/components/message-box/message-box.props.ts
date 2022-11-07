import { ImageSourcePropType } from "react-native";

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

    image: ImageSourcePropType,
    username: string,

    /**
     * Number of unread message
     */
    unreadCount?: number,
}
