/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Alert, Keyboard, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import * as Yup from "yup";

import AppForm from "../AppForm/AppForm";
import FormField from "../FormField/FormField";
import Submit from "../Submit/Submit";
import messagesAPI from "../../api/messages";
import Upload from "../ActivityIndicator/Upload";

const validationSchema = Yup.object().shape({
    message: Yup.string().required().min(1).label("Message"),
});

export default function ContactSellerForm({ listingID, receiverID, receiverName }) {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async ({ message }, { resetForm }) => {
        Keyboard.dismiss();
        setUploadProgress(0);
        setLoading(true);
        const response = await messagesAPI.sendMessage(receiverID, listingID, message, (progress) =>
            setUploadProgress(progress)
        );
        setLoading(false);

        if (!response.ok) return Alert.alert("Error", "Could not send the message to the seller.");

        resetForm();

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });

        Notifications.scheduleNotificationAsync({
            content: {
                title: "Message Sent",
                body: `Your message to ${receiverName} has been sent`,
                sound: "default",
            },
            trigger: null,
        });
    };

    return (
        <AppForm initialValues={{ message: "" }} onSubmit={handleSubmit} validationSchema={validationSchema}>
            <FormField
                maxLength={255}
                name="message"
                placeholder="Message..."
                returnKeyType="done"
                style={styles.field}
            />
            {loading && <Upload progress={uploadProgress} />}
            <Submit title="Contact Seller" style={styles.button} />
        </AppForm>
    );
}

const styles = StyleSheet.create({
    field: {
        marginBottom: 10,
    },
    button: {
        marginVertical: 10,
    },
});
