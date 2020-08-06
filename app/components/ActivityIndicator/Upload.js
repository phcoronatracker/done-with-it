/* eslint-disable react/prop-types */
import React from "react";
import { Dimensions } from "react-native";
import * as Progress from "react-native-progress";

import colors from "../../config/colors";

export default function Upload({ progress = 0 }) {
    const { width } = Dimensions.get("screen");

    return (
        <Progress.Bar
            progress={progress}
            width={width - 60}
            color={colors.primary}
            key={2}
            style={{ alignSelf: "center" }}
        />
    );
}
