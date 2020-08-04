import React from "react";
import { StyleSheet } from "react-native";

import AppText from "../AppText/AppText";

export default function ErrorMessage({ error, visibility, style }) {
    if (!visibility || !error) return null;

    return <AppText style={[styles.text, style]}>{error}</AppText>;
}

const styles = StyleSheet.create({
    text: {
        color: "red",
    },
});
