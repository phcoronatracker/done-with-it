/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";

import { navigationTheme, AppNavigator, AuthNavigator } from "./app/navigation";
import { OfflineNotice } from "./app/components";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

export default function App() {
    const [user, setUser] = useState();
    const [ready, setReady] = useState(false);

    const restoreUser = async () => {
        const user = await authStorage.getUser();
        if (user) setUser(user);
    };

    if (!ready) return <AppLoading startAsync={restoreUser} onFinish={() => setReady(true)} />;

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <OfflineNotice />
            <NavigationContainer theme={navigationTheme}>
                {user ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
