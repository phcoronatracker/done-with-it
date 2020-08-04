/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { StyleSheet, Platform, Alert } from "react-native";
import * as Yup from "yup";

import { AppForm, FormFieldLine, FormField, Submit, Screen, CategoryPickerItem, FormImagePicker } from "../components";
import categories from "../config/categories";
import useLocation from "../hooks/useLocation";
import listingsAPI from "../api/listings";
import useFirebase from "../hooks/useFirebase";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    price: Yup.number().required().min(1).max(10000).label("Price"),
    description: Yup.string().required().label("Description"),
    category: Yup.object().required().nullable().label("Category"),
    images: Yup.array().min(1, "Please select at least one image"),
});

export default function ListingEditScreen() {
    const location = useLocation();
    const [uploadVisible, setUploadVisible] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadIndeterminate, setUploadIndeterminate] = useState(true);
    const [done, setDone] = useState(false);

    const handleSubmit = async (listing, { resetForm }) => {
        setUploadVisible(true);
        setUploadIndeterminate(true);
        setDone(false);

        const { uploadImage } = useFirebase(listing.images);
        const firebaseUris = await uploadImage();

        if (firebaseUris.length === listing.images.length) {
            listing.images = firebaseUris;
            listing.location = location;
            setUploadIndeterminate(false);
            const response = await listingsAPI.postListing(listing, (progress) => setUploadProgress(progress));
            resetForm();
            setDone(true);

            if (!response.ok) {
                setUploadVisible(false);
                return Alert.alert("Posting Failed");
            }
        }
    };

    return (
        <Screen>
            <UploadScreen
                done={() => setUploadVisible(false)}
                show={done}
                progress={uploadProgress}
                visibility={uploadVisible}
                indeterminate={uploadIndeterminate}
            />
            <AppForm
                initialValues={{ title: "", price: "", description: "", category: null, images: [] }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <FormImagePicker style={styles.firstField} name="images" />
                <FormField maxLength={255} name="title" placeholder="Title" style={styles.field} returnKeyType="next" />
                <FormFieldLine style={styles.field} items={categories} PickerItemComponent={CategoryPickerItem} />
                <FormField
                    maxLength={255}
                    name="description"
                    numberOfLines={3}
                    placeholder="Description"
                    style={styles.field}
                    returnKeyType="done"
                />
                <Submit title="Post" style={styles.button} />
            </AppForm>
        </Screen>
    );
}

const styles = StyleSheet.create({
    firstField: {
        marginBottom: Platform.OS === "ios" ? 12 : 10,
    },
    field: {
        marginVertical: Platform.OS === "ios" ? 12 : 10,
    },
    button: {
        marginTop: Platform.OS === "ios" ? 24 : 20,
    },
});
