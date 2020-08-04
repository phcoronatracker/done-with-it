import React from "react";
import { StyleSheet, Text, TouchableOpacity, Keyboard } from "react-native";

import colors from "../../config/colors";

export default function AppButton({ title, onPress, style, color = "primary" }) {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: colors[color] }, style]}
            onPress={onPress}
            onPressOut={() => Keyboard.dismiss()}
            activeOpacity={0.8}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: "100%",
        marginTop: 10,
    },
    text: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "600",
    },
});
