/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AccountScreen, MessagesScreen, AccountDetailsScreen, ViewImageScreen } from "../screens";

const Stack = createStackNavigator();
const options = { headerTitleAlign: "center" };

export default AccountNavigator = () => (
    <Stack.Navigator initialRouteName="Account" mode="modal">
        <Stack.Screen name="Account" component={AccountScreen} options={options} />
        <Stack.Screen name="Messages" component={MessagesScreen} options={options} />
        <Stack.Screen
            name="AccountDetails"
            component={AccountDetailsScreen}
            options={{ headerTitleAlign: "center", headerTitle: "Account Details" }}
        />
        <Stack.Screen name="ViewImage" component={ViewImageScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);
