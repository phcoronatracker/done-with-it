/* eslint-disable react/prop-types */
import React from "react";
import LottieView from "lottie-react-native";

export default function Loading({ visible = false, style }) {
    if (!visible) return null;
    return <LottieView source={require("../../assets/animations/loading.json")} autoPlay loop style={style} />;
}
