import React from "react";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker/AppPicker";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function AppFormPicker({ items, name, placeholder, style, width, PickerItemComponent }) {
    const { errors, setFieldValue, touched, values } = useFormikContext();

    return (
        <>
            <AppPicker
                items={items}
                onSelectItem={(item) => setFieldValue(name, item)}
                PickerItemComponent={PickerItemComponent}
                placeholder={placeholder}
                selectedItem={values[name]}
                style={style}
                width={width}
            />
            <ErrorMessage error={errors[name]} visibility={touched[name]} />
        </>
    );
}
