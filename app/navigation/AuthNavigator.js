/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { WelcomeScreen, LoginScreen, RegisterScreen } from "../screens";

const Stack = createStackNavigator();

export default AuthNavigator = () => (
    <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
);
