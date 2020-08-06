/* eslint-disable react/prop-types */
import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput/AppTextInput";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function FormField({ name, width = "100%", ...others }) {
    const { errors, setFieldTouched, setFieldValue, touched, values } = useFormikContext();
    return (
        <>
            <AppTextInput
                onBlur={() => setFieldTouched(name)}
                onChangeText={(text) => setFieldValue(name, text)}
                value={values[name]}
                width={width}
                {...others}
            />
            <ErrorMessage error={errors[name]} visibility={touched[name]} />
        </>
    );
}
