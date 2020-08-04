/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ImageInput from "../ImageInput/ImageInput";

export default function ImageInputList({ imageURIs = [], onRemoveImage, onAddImage, style }) {
    const scrollView = useRef();

    return (
        <View style={style}>
            <ScrollView horizontal ref={scrollView} onContentSizeChange={() => scrollView.current.scrollToEnd()}>
                {imageURIs.map((uri, index) => (
                    <View style={styles.image} key={index}>
                        <ImageInput imageURI={uri} onChangeImage={() => onRemoveImage(uri)} key={uri} />
                    </View>
                ))}
                <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        marginRight: 10,
    },
});
