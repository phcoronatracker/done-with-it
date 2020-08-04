/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { navigationTheme, AppNavigator, AuthNavigator } from "./app/navigation";
import { OfflineNotice } from "./app/components";

export default function App() {
    return (
        <>
            <OfflineNotice />
            <NavigationContainer theme={navigationTheme}>
                <AuthNavigator />
            </NavigationContainer>
        </>
    );
}
