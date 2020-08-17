/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import io from "socket.io-client";

import { Screen, ListSeparator, ListItemDelete, AppText, ListMessage } from "../components";
import messageAPI from "../api/messages";
import colors from "../config/colors";
import useAuth from "../hooks/useAuth";

export default function MessagesScreen({ navigation }) {
    const [connections, setConnections] = useState([]);
    const { socket, user } = useAuth();

    useEffect(() => {
        socket.emit("get-connections", user.userId);
        socket.on("get-connections", (data) => setConnections(data));

        return () => {
            setConnections([]);
            socket.off("get-connections");
        };
    }, [socket, user.userId]);

    const handleDelete = (message) => {
        setConnections(connections.filter((m) => m._id !== message._id));
    };

    return (
        <Screen safeAreaStyle={{ paddingTop: 0 }} style={{ paddingTop: 0, paddingHorizontal: 0 }}>
            {connections.length === 0 ? (
                <AppText style={styles.text}>No messages</AppText>
            ) : (
                <FlatList
                    data={connections}
                    extraData={connections}
                    keyExtractor={(data) => data._id}
                    renderItem={({ item }) => (
                        <ListMessage
                            image={item.senderImage}
                            title={item.senderName}
                            key={item._id}
                            renderRightActions={() => <ListItemDelete onPress={() => handleDelete(item)} />}
                            onPress={() =>
                                navigation.navigate("Conversation", {
                                    listerID: item.senderID,
                                    listerName: item.senderName,
                                    listerImage: item.senderImage,
                                    messages: item.messages,
                                })
                            }
                            style={{ paddingHorizontal: 15 }}
                        />
                    )}
                    ItemSeparatorComponent={() => <ListSeparator />}
                />
            )}
        </Screen>
    );
}

const styles = StyleSheet.create({
    text: {
        color: colors.medium,
        alignSelf: "center",
        marginTop: 10,
    },
});
