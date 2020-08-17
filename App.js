/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import io from "socket.io-client";

import { navigationTheme, AppNavigator, AuthNavigator } from "./app/navigation";
import { OfflineNotice } from "./app/components";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";

export default function App() {
    const [user, setUser] = useState();
    const [ready, setReady] = useState(false);
    const [socket, setSocket] = useState();

    const restoreUser = async () => {
        const socket = io.connect("https://done-with-it.herokuapp.com", { transports: ["websocket"], upgrade: false });
        const user = await authStorage.getUser();
        if (user) setUser(user);
        if (socket) {
            socket.on("connect", () => console.log("Connected to socket!"));
            socket.emit("send-id", user.userId);
            setSocket(socket);
        }
    };

    if (!ready) return <AppLoading startAsync={restoreUser} onFinish={() => setReady(true)} />;

    return (
        <AuthContext.Provider value={{ user, setUser, socket, setSocket }}>
            <OfflineNotice />
            <NavigationContainer ref={navigationRef} theme={navigationTheme}>
                {user ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
