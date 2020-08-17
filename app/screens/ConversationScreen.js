/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";
import ObjectID from "bson-objectid";

import { Screen } from "../components";
import colors from "../config/colors";
import useAuth from "../hooks/useAuth";

export default function ConversationScreen({ route }) {
    const [messages, setMessages] = useState([]);
    const [system, setSystem] = useState(true);
    const { user, socket } = useAuth();

    useEffect(() => {
        setMessages(route.params.messages);

        return () => {
            setMessages([]);
        };
    }, [route.params.messages]);

    useEffect(() => {
        socket.on("new-message", (data) => {
            setMessages(GiftedChat.append(messages, data));
        });

        return () => {
            socket.off("new-message");
        };
    }, [socket, messages]);

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: colors.primary,
                    },
                }}
                textStyle={{
                    right: {
                        color: colors.white,
                    },
                }}
            />
        );
    };

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={{ justifyContent: "center", alignItems: "center", marginRight: 10, marginBottom: 4 }}>
                    <MaterialCommunityIcons name="send" size={33} color={colors.primary} />
                </View>
            </Send>
        );
    };

    const scroller = () => {
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons name="chevron-double-down" size={25} color={colors.medium} />
            </View>
        );
    };

    const renderLoading = () => (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

    const renderChatEmpty = () => (
        <View style={{ alignItems: "center" }}>
            <Text style={{ color: colors.medium, fontSize: 20 }}>No Messages</Text>
        </View>
    );

    const renderAvatar = (props) => (
        <Image
            uri={props.currentMessage.user.avatar}
            style={{ width: 36, height: 36, borderRadius: 18 }}
            tint="light"
        />
    );

    const handleSubmit = (newMessage = []) => {
        var systemMessage = [];

        newMessage[0]._id = ObjectID();
        if (route.params.listingID) {
            if (system) {
                systemMessage[0] = new Object({
                    _id: ObjectID(),
                    text: `New topic created: ${route.params.listingName} listing`,
                    createdAt: new Date(),
                    system: true,
                    user: {
                        _id: user.userId,
                        name: user.name,
                        avatar: user.userImage,
                    },
                    receiver: {
                        _id: route.params.listerID,
                        name: route.params.listerName,
                        avatar: route.params.listerImage,
                    },
                });
            }
            setSystem(false);
            newMessage[0].listing = new Object({
                _id: route.params.listingID,
                name: route.params.listingName,
            });
        }
        newMessage[0].receiver = new Object({
            _id: route.params.listerID,
            name: route.params.listerName,
            image: route.params.listerImage,
        });
        // if (system) setMessages(GiftedChat.append(messages, systemMessage));
        socket.emit("new-message", newMessage[0]);
    };

    return (
        <Screen safeAreaStyle={{ paddingTop: 0 }} style={{ paddingHorizontal: 0 }}>
            <GiftedChat
                messages={messages}
                onSend={handleSubmit}
                user={{ _id: user.userId, name: user.name, avatar: user.userImage }}
                renderBubble={renderBubble}
                renderSend={renderSend}
                scrollToBottom
                scrollToBottomComponent={scroller}
                renderLoading={renderLoading}
                bottomOffset={77}
                textInputProps={{ enablesReturnKeyAutomatically: true, selectionColor: colors.primary }}
                textInputStyle={{ fontSize: 17 }}
                renderChatEmpty={renderChatEmpty}
                messagesContainerStyle={messages.length === 0 && { transform: [{ scaleY: -1 }] }}
                minInputToolbarHeight={60}
                renderAvatar={renderAvatar}
            />
        </Screen>
    );
}
