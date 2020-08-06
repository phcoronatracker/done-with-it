/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Image } from "react-native-expo-image-cache";

import { AppText, ListItem, ContactSellerForm, Loading } from "../components";
import colors from "../config/colors";
import listingsAPI from "../api/listings";
import useAPI from "../hooks/useAPI";

export default function ListingDetailsScreen({ route }) {
    const data = route.params;
    const { data: lister, request, loading } = useAPI(listingsAPI.getListerInfo);

    useEffect(() => {
        request(data.userId);
    }, []);

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
                        <Loading visible={loading} style={{ marginBottom: 40 }} />
                        <View style={styles.userContainer}>
                            {!loading && (
                                <ListItem
                                    image={lister.image}
                                    title={lister.name}
                                    sub={`${lister.count} listing${lister.count > 1 ? "s" : ""}`}
                                />
                            )}
                        </View>
                        <ContactSellerForm listingID={data._id} receiverID={data.userId} receiverName={lister.name} />
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
