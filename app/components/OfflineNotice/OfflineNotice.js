/* eslint-disable no-unused-vars */
import React from "react";
import { StyleSheet, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import Constants from "expo-constants";

import AppText from "../AppText/AppText";
import colors from "../../config/colors";

export default function OfflineNotice() {
    const netInfo = useNetInfo();

    if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
        return (
            <View style={styles.container}>
                <AppText style={styles.text}>No Internet Connection</AppText>
            </View>
        );

    return null;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.danger,
        height: 40,
        width: "100%",
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: Constants.statusBarHeight,
    },
    text: {
        color: colors.white,
    },
});
