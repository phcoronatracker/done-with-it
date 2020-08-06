/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Image } from "react-native-expo-image-cache";

import { AppText, ListItem, ContactSellerForm } from "../components";
import colors from "../config/colors";
import useAuth from "../hooks/useAuth";

export default function ListingDetailsScreen({ route }) {
    const { user } = useAuth();
    const data = route.params;

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100} enabled>
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
                            <ListItem image={user.userImage} title="Joshua Figueroa" sub="5 Listings" />
                        </View>
                        <ContactSellerForm listingID={data._id} receiverID={data.userId} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
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
        marginVertical: 20,
    },
    screen: {
        padding: 0,
    },
    safeArea: {
        paddingTop: 0,
    },
});
