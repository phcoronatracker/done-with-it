/* eslint-disable react/prop-types */
import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function ActivityIndicator({ visible = false }) {
    if (!visible) return null;
    return (
        <View style={styles.view}>
            <LottieView source={require("../../assets/animations/loader.json")} autoPlay loop />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        opacity: 0.8,
        zIndex: 1,
    },
});
