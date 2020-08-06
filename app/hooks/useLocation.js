/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import * as Permissions from "expo-permissions";

export default useLocation = () => {
    const [location, setLocation] = useState();

    useEffect(() => {
        (async () => {
            try {
                const { granted } = await Permissions.askAsync(Permissions.LOCATION);
                if (!granted) {
                    Alert.alert("Location Permission", "Permission to access location was denied", [{ text: "Okay" }]);
                }

                const {
                    coords: { latitude, longitude },
                } = await Location.getCurrentPositionAsync({
                    accuracy: 6,
                    enableHighAccuracy: true,
                });
                setLocation({ latitude, longitude });
            } catch (error) {
                throw error;
            }
        })();
    }, []);

    return location;
};
