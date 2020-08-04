import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Icon from "../Icon/Icon";
import AppText from "../AppText/AppText";

export default function CategoryPickerItem({ item, onPress }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.5}>
            <Icon backgroundColor={item.backgroundColor} name={item.icon} size={80} />
            <AppText style={styles.text}>{item.label}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "33%",
    },
    text: {
        textAlign: "center",
        marginTop: 8,
    },
});
