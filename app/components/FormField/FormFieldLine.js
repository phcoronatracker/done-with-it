/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput/AppTextInput";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import AppPicker from "../AppPicker/AppPicker";

export default function FormFieldLine({ items, style, PickerItemComponent }) {
    const { errors, setFieldTouched, touched, setFieldValue, values } = useFormikContext();
    return (
        <View style={style}>
            <View style={styles.container}>
                <AppTextInput
                    fontAwesome="dollar"
                    onBlur={() => setFieldTouched("price")}
                    onChangeText={(price) => setFieldValue("price", price)}
                    value={values["price"]}
                    width="43%"
                    keyboardType="numeric"
                    maxLength={8}
                    placeholder="Price"
                />

                <AppPicker
                    items={items}
                    onSelectItem={(item) => setFieldValue("category", item)}
                    PickerItemComponent={PickerItemComponent}
                    placeholder="Category"
                    selectedItem={values["category"]}
                    width={"55%"}
                />
            </View>
            <View style={styles.subContainer}>
                <ErrorMessage error={errors["price"]} visibility={touched["price"]} style={styles.margin} />
                <ErrorMessage error={errors["category"]} visibility={touched["category"]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    subContainer: {
        flexDirection: "column",
    },
    margin: {
        marginTop: Platform.OS === "ios" ? 12 : 10,
    },
});
