/* eslint-disable react/prop-types */
/* eslint-disable no-useless-catch */
import React, { useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../../config/colors";

export default function ImageInput({ style, imageURI = null, onChangeImage }) {
    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (!granted) alert("You need to enable permission to access the library!");
    };

    useEffect(() => {
        requestPermission();
    }, []);

    const selectImage = async () => {
        try {
            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5,
                allowsMultipleSelection: true,
            });

            if (!res.cancelled) onChangeImage(res.uri);
        } catch (error) {
            throw error;
        }
    };

    const handlePress = () => {
        if (!imageURI) selectImage();
        else {
            Alert.alert("Delete", "Are you sure you want to delete the image?", [
                { text: "Yes", onPress: () => onChangeImage(null) },
                { text: "No" },
            ]);
        }
    };

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={handlePress}>
            {!imageURI && <MaterialCommunityIcons name="camera" color={colors.placeholder} size={45} />}
            {imageURI && <Image source={{ uri: imageURI }} style={styles.image} />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 100,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
