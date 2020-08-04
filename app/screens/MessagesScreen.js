/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FlatList } from "react-native";

import { Screen, ListItem, ListSeparator, ListItemDelete } from "../components";

const initialMessages = [
    {
        id: 1,
        title: "Joshua Figueroa",
        description: "MERN-Stack, Intermediate PHP, MySQL, Django and Flask, Spring",
        image: require("../assets/joshua.jpg"),
    },
    {
        id: 2,
        title: "Mosh Hamedani",
        description: "Programming Coach",
        image: require("../assets/mosh.jpg"),
    },
    {
        id: 3,
        title: "Joshua Figueroa 2",
        description: "Grade 11 Developer",
        image: require("../assets/joshua2.jpg"),
    },
];

export default function MessagesScreen() {
    const [messages, setMessages] = useState(initialMessages);
    const [refreshing, setRefreshing] = useState(false);

    const handleDelete = (message) => {
        setMessages(messages.filter((m) => m.id !== message.id));
    };

    return (
        <Screen safeAreaStyle={{ paddingTop: 0 }}>
            <FlatList
                data={messages}
                keyExtractor={(data) => data.id.toString()}
                renderItem={({ item }) => (
                    <ListItem
                        image={item.image}
                        title={item.title}
                        sub={item.description}
                        key={item.id}
                        renderRightActions={() => <ListItemDelete onPress={() => handleDelete(item)} />}
                    />
                )}
                ItemSeparatorComponent={() => <ListSeparator />}
                refreshing={refreshing}
                onRefresh={() => {
                    setMessages(initialMessages);
                }}
            />
        </Screen>
    );
}
