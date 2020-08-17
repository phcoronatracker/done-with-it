/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import { Image } from "react-native-expo-image-cache";

import { ListingsScreen, ListingDetailsScreen, ConversationScreen } from "../screens";
import useAuth from "../hooks/useAuth";

const Stack = createStackNavigator();

const HeaderTitle = ({ uri, name, username }) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image uri={uri} style={{ width: 50, height: 50, borderRadius: 25 }} />
        <Text style={{ fontSize: 18, fontWeight: "500", marginLeft: 12 }}>
            {name}
            {username === name && " (You)"}
        </Text>
    </View>
);

export default FeedNavigator = () => {
    const { user } = useAuth();
    return (
        <Stack.Navigator initialRouteName="Listings" mode="modal">
            <Stack.Screen name="Listings" component={ListingsScreen} options={{ headerShown: false }} />
            <Stack.Screen
                name="ListingDetails"
                component={ListingDetailsScreen}
                options={{ title: "Details", headerTitleAlign: "center" }}
            />
            <Stack.Screen
                name="Conversation"
                component={ConversationScreen}
                options={({ route }) => ({
                    headerLeft: (props) => (
                        <View style={{ flexDirection: "row" }}>
                            <HeaderBackButton {...props} />
                            <HeaderTitle
                                uri={route.params.listerImage}
                                name={route.params.listerName}
                                username={user.name}
                            />
                        </View>
                    ),
                    headerTitle: false,
                    headerBackTitleVisible: false,
                    headerLeftContainerStyle: { marginLeft: 5 },
                    headerStyle: { height: 74, shadowColor: "transparent" },
                })}
            />
        </Stack.Navigator>
    );
};
