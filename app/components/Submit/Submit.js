import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton/AppButton";

export default function Submit({ title, style }) {
    const { handleSubmit } = useFormikContext();

    return <AppButton title={title} style={style} onPress={handleSubmit} />;
}
