/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, View, Modal } from "react-native";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";

import { AppText } from "../components";
import colors from "../config/colors";

export default function UploadScreen({ done, progress = 0, visibility = false, indeterminate, show }) {
    return (
        <Modal visible={visibility}>
            <View style={styles.container}>
                {!show && [
                    <AppText key={1} style={styles.text}>
                        {indeterminate ? "Uploading the image..." : "Sending the data to the server..."}
                    </AppText>,
                    <Progress.Bar
                        progress={progress}
                        width={200}
                        color={colors.primary}
                        indeterminate={indeterminate}
                        key={2}
                    />,
                ]}
                {show && (
                    <LottieView
                        source={require("../assets/animations/done.json")}
                        autoPlay
                        loop={false}
                        onAnimationFinish={done}
                        style={styles.done}
                    />
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    done: {
        width: 150,
    },
    text: {
        marginBottom: 15,
    },
});
