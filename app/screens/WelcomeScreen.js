/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, ImageBackground, View, Image, Text } from "react-native";

import { Screen, AppButton } from "../components";

export default function WelcomeScreen({ navigation }) {
    return (
        <Screen style={{ padding: 0 }}>
            <ImageBackground source={require("../assets/background.jpg")} style={styles.background} blurRadius={5}>
                <View style={styles.logoContainer}>
                    <Image source={require("../assets/logo-red.png")} style={styles.logo} />
                    <Text style={styles.text}>Sell what you don't need</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <AppButton title="Login" onPress={() => navigation.navigate("Login")} />
                    <AppButton title="Register" color="secondary" onPress={() => navigation.navigate("Register")} />
                </View>
            </ImageBackground>
        </Screen>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end", // primary-axis (vertical - column)
        alignItems: "center",
        paddingHorizontal: 10,
        paddingBottom: 15,
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        flex: 1,
        alignItems: "center",
    },
    buttonContainer: {
        width: "100%",
    },
    text: {
        fontSize: 25,
        fontWeight: "600",
        paddingVertical: 20,
    },
});
