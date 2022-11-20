import { color } from "@theme";
import React from "react";
import { StyleSheet } from "react-native";
import { Bubble, Composer, MessageText } from "react-native-gifted-chat";

const style = StyleSheet.create({
    wrapperStyleBubble:{
        backgroundColor: color.transparent,
    },
    messageContainerLeft:{
        borderBottomEndRadius: 15,
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        padding: 16,
        fontSize: 14,
        backgroundColor: color.palette.PrimaryWithOpacity(0.07)
    },
    messageContainerRight:{
        backgroundColor: color.palette.GrayWithOpacity(0.1),
        borderBottomStartRadius: 15,
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        padding: 16,
        fontSize: 14,
    },
    composerStyle:{
        marginTop: 10,
        color: color.storybookTextColor,
        backgroundColor: color.transparent,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#E4E9F2',
        paddingHorizontal: 12,
    }
})

export const renderBubble = (props) => (
    <Bubble
      {...props}
    textStyle={color.storybookTextColor}
    wrapperStyle={{
        left: style.wrapperStyleBubble,
        right: style.wrapperStyleBubble,
      }}
    //   tickStyle={{}}
    //   usernameStyle={{ color: 'tomato', fontWeight: '100' }}
    //   containerToNextStyle={{
    //     left: { borderColor: 'navy', borderWidth: 4 },
    //     right: {},
    //   }}
      
    />
  );
  


  export const renderMessageText = (props) => (
    <MessageText
      {...props}
      containerStyle={{
        left: style.messageContainerLeft,
        right: style.messageContainerRight,
      }}
      textStyle={{
        left: { color: color.storybookTextColor },
        right: { color: color.storybookTextColor },
      }}
    />
  );

  export const renderComposer = (props) => (
    <Composer
      {...props}
      textInputStyle= {style.composerStyle}
    />
  )