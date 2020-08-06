/* eslint-disable no-undef */
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import expoPushTokenAPI from "../api/token";

export default useNotifications = (notificationListener) => {
    useEffect(() => {
        (async () => {
            try {
                const { granted } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                if (!granted) return;

                const token = await Notifications.getExpoPushTokenAsync();
                await expoPushTokenAPI.registerToken(token.data);
            } catch (error) {
                console.log("Error getting token for push notification service:", error);
            }
        })();

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });

        Notifications.addNotificationResponseReceivedListener(notificationListener);
    }, [notificationListener]);
};
