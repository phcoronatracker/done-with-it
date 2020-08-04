/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import colors from "../../config/colors";

export default function Screen({ children, style, safeAreaStyle }) {
    return (
        <SafeAreaView style={[styles.container, safeAreaStyle]}>
            <StatusBar style="auto" />
            <View style={[styles.view, style]}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Constants.statusBarHeight,
    },
    view: {
        padding: 15,
        flex: 1,
    },
});
