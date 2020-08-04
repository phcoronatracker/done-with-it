import React from "react";
import { useFormikContext } from "formik";

import ImageInputList from "../ImageInputList/ImageInputList";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function FormImagePicker({ name, style }) {
    const { errors, setFieldValue, touched, values } = useFormikContext();
    const imageURis = values[name];

    const addImage = (uri) => {
        setFieldValue(name, [...imageURis, uri]);
    };

    const removeImage = (uri) => {
        setFieldValue(
            name,
            imageURis.filter((imageURI) => imageURI !== uri)
        );
    };

    return (
        <>
            <ImageInputList imageURIs={values[name]} onAddImage={addImage} onRemoveImage={removeImage} style={style} />
            <ErrorMessage error={errors[name]} visibility={touched[name]} />
        </>
    );
}
