import React from "react";
import { StyleSheet, View, TouchableNativeFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

export default function ListingButton({ onPress }) {
    return (
        <TouchableNativeFeedback activeOpacity={0.8} onPress={onPress}>
            <View style={styles.container}>
                <MaterialCommunityIcons name="plus-circle" color={colors.white} size={35} />
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        bottom: 22,
        borderRadius: 32,
        borderColor: colors.white,
        borderWidth: 3,
        width: 64,
        height: 64,
    },
});
