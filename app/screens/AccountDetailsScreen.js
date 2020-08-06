/* eslint-disable no-useless-catch */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { Screen, ActivityIndicator, Icon, AppText } from "../components";
import * as ImagePicker from "expo-image-picker";

import useFirebase from "../hooks/useFirebase";
import useUpload from "../hooks/useUpload";
import useAuth from "../hooks/useAuth";
import colors from "../config/colors";
import { Image } from "react-native-expo-image-cache";

const { width } = Dimensions.get("screen");

export default function AccountDetailsScreen({ navigation }) {
    useUpload();
    const [loading, setLoading] = useState(false);
    const { user, handleUploadImage } = useAuth();
    const { uploadProfileImage } = useFirebase();

    const handleSubmit = async () => {
        try {
            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5,
                allowsMultipleSelection: true,
                allowsEditing: true,
            });

            if (!res.cancelled) {
                setLoading(true);
                const firebaseUri = await uploadProfileImage(res.uri, user.userId);
                await handleUploadImage(firebaseUri);
                setTimeout(() => {
                    setLoading(false);
                }, 1800);
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <>
            <ActivityIndicator visible={loading} />
            <Screen safeAreaStyle={styles.safe}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("ViewImage", user.userImage)}
                    >
                        <Image uri={user.userImage} style={styles.image} tint="light" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} activeOpacity={0.85} onPress={handleSubmit}>
                        <Icon name="camera" backgroundColor={colors.white} iconColor={colors.medium} size={40} />
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                    <AppText style={styles.name}>{user.name}</AppText>
                    <AppText style={styles.email}>{user.email}</AppText>
                </View>
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    safe: {
        paddingTop: 0,
    },
    imageContainer: {
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderColor: colors.medium,
        borderWidth: 1,
    },
    icon: {
        borderRadius: 40,
        shadowColor: "rgba(0, 0, 0 ,0.6)", // IOS
        shadowOffset: { height: 0, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: -5,
        right: width / 3 - 10,
    },
    detailsContainer: {
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    name: {
        fontSize: 28,
    },
    email: {
        fontSize: 19,
        color: colors.medium,
        marginTop: 5,
    },
});
