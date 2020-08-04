import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ListingEditScreen } from "../screens";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import ListingButton from "./ListingButton";

const Tab = createBottomTabNavigator();

export default AppNavigator = () => (
    <Tab.Navigator initialRouteName="Feed">
        <Tab.Screen
            name="Feed"
            component={FeedNavigator}
            options={{
                tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" size={size} color={color} />,
            }}
        />
        <Tab.Screen
            name="ListingEdit"
            component={ListingEditScreen}
            options={({ navigation }) => ({
                tabBarButton: () => <ListingButton onPress={() => navigation.navigate("ListingEdit")} />,
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="plus-circle" size={size} color={color} />
                ),
            })}
        />
        <Tab.Screen
            name="Account"
            component={AccountNavigator}
            options={{
                tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" size={size} color={color} />,
            }}
        />
    </Tab.Navigator>
);
