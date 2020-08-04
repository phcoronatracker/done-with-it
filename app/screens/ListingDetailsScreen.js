/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-expo-image-cache";

import { Screen, AppText, ListItem } from "../components";

import colors from "../config/colors";

export default function ListingDetailsScreen({ route }) {
    const data = route.params;

    return (
        <Screen style={styles.screen} safeAreaStyle={styles.safeArea}>
            <View>
                <Image
                    style={styles.image}
                    preview={{ uri: data.images[0].thumbnail }}
                    tint="light"
                    uri={data.images[0].url}
                />
                <View style={styles.detailsContainer}>
                    <AppText style={styles.title}>{data.title}</AppText>
                    <AppText style={styles.price}>${data.price}</AppText>
                    <View style={styles.userContainer}>
                        <ListItem image={require("../assets/joshua2.jpg")} title="Joshua Figueroa" sub="5 Listings" />
                    </View>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
    },
    detailsContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
    },
    price: {
        fontSize: 20,
        fontWeight: "600",
        color: colors.secondary,
    },
    userContainer: {
        marginVertical: 30,
    },
    screen: {
        padding: 0,
    },
    safeArea: {
        paddingTop: 0,
    },
});
