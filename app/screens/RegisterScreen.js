/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { StyleSheet, ActivityIndicator, Platform } from "react-native";
import * as Yup from "yup";

import { Screen, AppForm, FormField, Submit, ErrorMessage } from "../components";
import userAPI from "../api/auth";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(8).label("Password"),
});

export default function RegisterScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        const response = await userAPI.register(values);
        setLoading(false);
        resetForm();

        if (!response.ok) {
            setErrorMessage(response.data.error);
            return setError(true);
        }

        setError(false);
        alert("You account has been created!");
    };

    return (
        <Screen>
            <AppForm
                initialValues={{ name: "", email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <ErrorMessage visibility={error} error={errorMessage} style={styles.firstField} />
                <FormField
                    autoCorrect={false}
                    icon="account"
                    name="name"
                    placeholder="Name"
                    style={styles.firstField}
                />
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="email"
                    placeholder="Email"
                    textContentType="emailAddress"
                    style={styles.field}
                />
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                    style={styles.field}
                />
                <Submit title="Register" style={styles.button} />
            </AppForm>
            {loading && <ActivityIndicator size={"large"} animating style={{ marginTop: 20 }} color={colors.primary} />}
        </Screen>
    );
}

const styles = StyleSheet.create({
    firstField: {
        marginBottom: Platform.OS === "ios" ? 12 : 10,
    },
    field: {
        marginVertical: Platform.OS === "ios" ? 12 : 10,
    },
    button: {
        marginTop: Platform.OS === "ios" ? 24 : 20,
    },
});
