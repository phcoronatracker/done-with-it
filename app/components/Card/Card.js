/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Image } from "react-native-expo-image-cache";

import AppText from "../AppText/AppText";

import colors from "../../config/colors";

export default function Card({ title, price, imageURL, onPress, thumbnailURL }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            <Image style={styles.image} preview={{ uri: thumbnailURL }} tint="light" uri={imageURL} />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{title}</AppText>
                <AppText style={styles.subtitle}>{price}</AppText>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 200,
    },
    detailsContainer: {
        padding: 20,
    },
    title: {
        marginBottom: 7,
    },
    subtitle: {
        fontWeight: "600",
        color: colors.secondary,
    },
});
