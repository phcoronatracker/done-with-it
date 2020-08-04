/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ListingsScreen, ListingDetailsScreen } from "../screens";

const Stack = createStackNavigator();

export default FeedNavigator = () => (
    <Stack.Navigator initialRouteName="Listings" mode="modal">
        <Stack.Screen name="Listings" component={ListingsScreen} options={{ headerShown: false }} />
        <Stack.Screen
            name="ListingDetails"
            component={ListingDetailsScreen}
            options={{ title: "Details", headerTitleAlign: "center" }}
        />
    </Stack.Navigator>
);
