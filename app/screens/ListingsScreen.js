/* eslint-disable no-useless-catch */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { StyleSheet, FlatList, TouchableOpacity, Text, RefreshControl } from "react-native";

import { Screen, Card, AppText, ActivityIndicator } from "../components";
import colors from "../config/colors";
import listingsAPI from "../api/listings";
import useAPI from "../hooks/useAPI";

export default function ListingsScreen({ navigation }) {
    const { data: listings, error, loading, request } = useAPI(listingsAPI.getListings);

    useEffect(() => {
        request();
    }, []);

    return (
        <Screen safeAreaStyle={styles.container}>
            {error && (
                <>
                    <AppText style={{ fontSize: 18 }}>Server is currently down. Please try again.</AppText>
                    <TouchableOpacity style={styles.button} onPress={() => request()}>
                        <Text style={{ color: colors.white, fontSize: 20 }}>Try Again</Text>
                    </TouchableOpacity>
                </>
            )}
            <ActivityIndicator visible={loading} />
            <FlatList
                data={listings}
                extraData={listings}
                keyExtractor={(listing) => listing._id}
                renderItem={({ item }) => (
                    <Card
                        imageURL={item.images[0].url}
                        thumbnailURL={item.images[0].thumbnail}
                        title={item.title}
                        price={`$${item.price}`}
                        key={item._id}
                        onPress={() => navigation.navigate("ListingDetails", item)}
                    />
                )}
                refreshControl={<RefreshControl onRefresh={request} refreshing={loading} tintColor={colors.primary} />}
                showsVerticalScrollIndicator={false}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        width: "45%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        borderRadius: 12,
    },
});
