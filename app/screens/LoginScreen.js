/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { StyleSheet, Image, Platform, ActivityIndicator } from "react-native";
import * as Yup from "yup";

import { Screen, FormField, Submit, AppForm, ErrorMessage } from "../components";
import user from "../api/auth";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(8).label("Password"),
});

export default function LoginScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        const response = await user.login(values);
        setLoading(false);
        resetForm();

        if (!response.ok) {
            console.log(response.originalError);
            setErrorMessage(response.data.error);
            return setError(true);
        }

        setError(false);
        console.log(response.data);
        alert("Successful!");
    };

    return (
        <Screen>
            <Image source={require("../assets/logo-red.png")} style={styles.logo} />
            <ErrorMessage visibility={error} error={errorMessage} style={styles.upper} />
            <AppForm
                initialValues={{ email: "", password: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <FormField
                    autoCapitalize="none"
                    autoCompleteType="email"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="email"
                    placeholder="Email"
                    style={styles.upper}
                    textContentType="emailAddress"
                />
                <FormField
                    autoCapitalize="none"
                    autoCompleteType="password"
                    autoCorrect={false}
                    icon="lock"
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    style={styles.password}
                    textContentType="password"
                />
                <Submit title="Login" style={styles.button} />
            </AppForm>
            {loading && <ActivityIndicator size={"large"} animating style={{ marginTop: 20 }} color={colors.primary} />}
        </Screen>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 30,
    },
    upper: {
        marginBottom: Platform.OS === "ios" ? 12 : 10,
    },
    password: {
        marginVertical: Platform.OS === "ios" ? 12 : 10,
    },
    button: {
        marginTop: Platform.OS === "ios" ? 24 : 20,
    },
});
