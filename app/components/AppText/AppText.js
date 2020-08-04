import React from "react";
import { StyleSheet, Text } from "react-native";

export default function AppText({ children, style, ...others }) {
    return (
        <Text style={[styles.text, style]} {...others}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    },
});
