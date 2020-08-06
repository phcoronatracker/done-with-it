/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Screen } from "../components";
import colors from "../config/colors";

export default function ViewImageScreen({ route, navigation }) {
    return (
        <Screen style={styles.view}>
            <View style={styles.container}>
                <View style={styles.close}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="close" color={colors.white} size={30} />
                    </TouchableOpacity>
                </View>
                <Image uri={route.params} style={styles.image} tint="dark" />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    close: {
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 1,
    },
    container: {
        backgroundColor: colors.black,
        flex: 1,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    view: {
        padding: 0,
    },
});
