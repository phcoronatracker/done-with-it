/* eslint-disable react/prop-types */
import React from "react";
import { Alert, Keyboard, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import * as Yup from "yup";

import AppForm from "../AppForm/AppForm";
import FormField from "../FormField/FormField";
import Submit from "../Submit/Submit";
import messagesAPI from "../../api/messages";

const validationSchema = Yup.object().shape({
    message: Yup.string().required().min(1).label("Message"),
});

export default function ContactSellerForm({ listingID, receiverID }) {
    const handleSubmit = async ({ message }, { resetForm }) => {
        Keyboard.dismiss();
        const response = await messagesAPI.sendMessage(receiverID, listingID, message);

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
                body: "Your message to the seller has been sent successfully",
                sound: "default",
            },
            trigger: null,
        });
    };

    return (
        <AppForm initialValues={{ message: "" }} onSubmit={handleSubmit} validationSchema={validationSchema}>
            <FormField
                maxLength={255}
                multiline
                name="message"
                numberOfLines={3}
                placeholder="Message..."
                returnKeyType="done"
            />
            <Submit title="Contact Seller" style={styles.button} />
        </AppForm>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        marginBottom: 10,
    },
});
