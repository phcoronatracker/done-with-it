/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, TextInput, View, Platform } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

import colors from "../../config/colors";

export default function AppTextInput({ icon, style, width = "100%", fontAwesome, ...others }) {
    return (
        <View style={[styles.container, style, { width }]}>
            {fontAwesome && <FontAwesome name={fontAwesome} size={25} color={colors.medium} />}
            {icon && <MaterialCommunityIcons name={icon} size={25} color={colors.medium} />}
            <TextInput
                style={[styles.input, { marginLeft: icon || fontAwesome ? 10 : 5 }]}
                placeholderTextColor={colors.placeholder}
                {...others}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: colors.light,
        borderRadius: 25,
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    input: {
        fontSize: 18,
        fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
        flexGrow: 1,
        color: colors.dark,
    },
});
