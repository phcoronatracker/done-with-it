/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import { Image } from "react-native-expo-image-cache";

import { AccountScreen, MessagesScreen, AccountDetailsScreen, ViewImageScreen, ConversationScreen } from "../screens";
import useAuth from "../hooks/useAuth";

const Stack = createStackNavigator();
const options = { headerTitleAlign: "center" };

const HeaderTitle = ({ uri, name, username }) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image uri={uri} style={{ width: 50, height: 50, borderRadius: 25 }} />
        <Text style={{ fontSize: 18, fontWeight: "500", marginLeft: 12 }}>
            {name}
            {username === name && " (You)"}
        </Text>
    </View>
);

export default AccountNavigator = () => {
    const { user } = useAuth();

    return (
        <Stack.Navigator initialRouteName="Account" mode="modal">
            <Stack.Screen name="Account" component={AccountScreen} options={options} />
            <Stack.Screen name="Messages" component={MessagesScreen} options={options} />
            <Stack.Screen
                name="AccountDetails"
                component={AccountDetailsScreen}
                options={{ headerTitleAlign: "center", headerTitle: "Account Details" }}
            />
            <Stack.Screen name="ViewImage" component={ViewImageScreen} options={{ headerShown: false }} />
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
}
