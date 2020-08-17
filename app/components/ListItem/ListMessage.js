/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../AppText/AppText";
import colors from "../../config/colors";

export default function ListMessage({ title, sub, image, icon, style, onPress, renderRightActions }) {
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[styles.container, style]}>
                    {icon}
                    {image && <Image uri={image} style={styles.image} tint="light" />}
                    <View style={styles.details}>
                        <AppText style={styles.title} numberOfLines={1}>
                            {title}
                        </AppText>
                        {sub && (
                            <AppText style={styles.sub} numberOfLines={2}>
                                {sub}
                            </AppText>
                        )}
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={30} color={colors.medium} />
                </View>
            </TouchableWithoutFeedback>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.white,
        flexDirection: "row",
        paddingVertical: 15,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    details: {
        flexGrow: 1,
        justifyContent: "center",
        marginLeft: 15,
        width: "65%",
    },
    title: {
        fontWeight: "500",
    },
    sub: {
        color: colors.medium,
        fontSize: 16,
    },
});
