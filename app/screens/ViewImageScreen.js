import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Screen } from "../components";

import colors from "../config/colors";

export default function ViewImageScreen() {
    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.close}>
                    <MaterialCommunityIcons name="close" color={colors.white} size={30} />
                </View>
                <View style={styles.delete}>
                    <MaterialCommunityIcons name="trash-can-outline" color={colors.white} size={30} />
                </View>
                <Image source={require("../assets/chair.jpg")} style={styles.image} />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    close: {
        position: "absolute",
        top: 11,
        left: 20,
    },
    container: {
        backgroundColor: colors.black,
        flex: 1,
    },
    delete: {
        position: "absolute",
        top: 11,
        right: 20,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
});
