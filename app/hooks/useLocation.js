import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

export default useLocation = () => {
    const [location, setLocation] = useState();

    useEffect(() => {
        (async () => {
            try {
                const { granted } = await Location.requestPermissionsAsync();
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
