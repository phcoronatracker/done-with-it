/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import { Screen, ListSeparator, ListItemDelete, AppText, ListMessage, ActivityIndicator } from "../components";
import colors from "../config/colors";
import useAuth from "../hooks/useAuth";

export default function MessagesScreen({ navigation }) {
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);
    const { socket, user } = useAuth();

    useEffect(() => {
        setLoading(true);
        socket.emit("get-connections", user.userId);
        socket.on("get-connections", (data) => setConnections(data));
        setLoading(false);

        return () => {
            setConnections([]);
            socket.off("get-connections");
        };
    }, [socket, user.userId]);

    const handleDelete = (message) => {
        setConnections(connections.filter((m) => m._id !== message._id));
    };

    return (
        <>
            <ActivityIndicator visible={loading} />
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
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        color: colors.medium,
        alignSelf: "center",
        marginTop: 10,
    },
});
