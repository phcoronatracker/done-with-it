/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AccountScreen, MessagesScreen } from "../screens";

const Stack = createStackNavigator();
const options = { headerTitleAlign: "center" };

export default AccountNavigator = () => (
    <Stack.Navigator initialRouteName="Account" mode="card">
        <Stack.Screen name="Account" component={AccountScreen} options={options} />
        <Stack.Screen name="Messages" component={MessagesScreen} options={options} />
    </Stack.Navigator>
);
