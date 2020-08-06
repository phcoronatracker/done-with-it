/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { Screen, ListItem, Icon, ListSeparator } from "../components";
import colors from "../config/colors";
import useAuth from "../hooks/useAuth";

const menuItems = [
    {
        title: "My Listings",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary,
        },
    },
    {
        title: "My Messages",
        icon: {
            name: "email",
            backgroundColor: colors.secondary,
        },
        targetScreen: "Messages",
    },
];

export default function AccountScreen({ navigation }) {
    const { user, handleLogout } = useAuth();

    return (
        <Screen style={styles.screen} safeAreaStyle={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <ListItem
                        title={user.name}
                        sub={user.email}
                        image={user.userImage}
                        style={styles.padding}
                        onPress={() => navigation.navigate("AccountDetails", user)}
                    />
                </View>
                <View style={styles.subContainer}>
                    <FlatList
                        data={menuItems}
                        keyExtractor={(menuItem) => menuItem.title}
                        renderItem={({ item }) => (
                            <ListItem
                                title={item.title}
                                icon={<Icon name={item.icon.name} backgroundColor={item.icon.backgroundColor} />}
                                onPress={() => navigation.navigate(item.targetScreen)}
                                style={styles.padding}
                            />
                        )}
                        ItemSeparatorComponent={ListSeparator}
                        scrollEnabled={false}
                    />
                </View>
                <View style={styles.subContainer}>
                    <ListItem
                        title="Log Out"
                        icon={<Icon name="logout" backgroundColor={colors.warning} />}
                        style={styles.padding}
                        onPress={() => handleLogout()}
                    />
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        paddingTop: 0,
    },
    screen: {
        backgroundColor: colors.light,
        padding: 0,
    },
    container: {
        paddingTop: 25,
    },
    subContainer: {
        marginBottom: 35,
    },
    padding: {
        paddingHorizontal: 15,
    },
});
