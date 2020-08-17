/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from "react-native";
import { Image } from "react-native-expo-image-cache";
import * as Progress from "react-native-progress";

import { AppText, ListItem, ContactSellerForm, Loading } from "../components";
import colors from "../config/colors";
import listingsAPI from "../api/listings";
import useAPI from "../hooks/useAPI";
import useAuth from "../hooks/useAuth";

const { width } = Dimensions.get("screen");

export default function ListingDetailsScreen({ route, navigation }) {
    const data = route.params;
    const { data: lister, request, loading } = useAPI(listingsAPI.getListerInfo);
    const { user, socket } = useAuth();

    useEffect(() => {
        request(data.userId);
    }, [socket]);

    const handleSubmit = () => {
        socket.emit("new-connection", { id: user.userId, receiverID: data.userId });
        socket.on("new-connection", (conn) => {
            navigation.navigate("Conversation", {
                listingID: data._id,
                listingName: data.title,
                listerID: data.userId,
                listerName: lister.name,
                listerImage: lister.image,
                messages: conn,
            });
        });
    };

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
                            {loading ? (
                                <Progress.Bar
                                    width={width - 60}
                                    color={colors.primary}
                                    indeterminate
                                />
                            ) : (
                                <ListItem
                                    image={lister.image}
                                    title={lister.name}
                                    sub={`${lister.count} listing${lister.count > 1 ? "s" : ""}`}
                                />
                            )}
                        </View>
                        <ContactSellerForm onPress={handleSubmit} />
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
        justifyContent: "center",
        alignItems: "center"
    },
    screen: {
        padding: 0,
    },
    safeArea: {
        paddingTop: 0,
    },
});
