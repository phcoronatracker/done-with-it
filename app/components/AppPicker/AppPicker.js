import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Modal, Button, FlatList, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../Screen/Screen";
import AppText from "../AppText/AppText";
import PickerItem from "../PickerItem/PickerItem";
import colors from "../../config/colors";

export default function AppPicker({
    icon,
    items,
    onSelectItem,
    placeholder,
    selectedItem,
    style,
    width,
    PickerItemComponent = PickerItem,
}) {
    const [modalVisibility, setModalVisibility] = useState(false);

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisibility(true)}>
                <View style={[styles.container, style, { width }]}>
                    {icon && <MaterialCommunityIcons name={icon} size={25} color={colors.medium} />}
                    {selectedItem ? (
                        <AppText style={[styles.text, { marginLeft: icon ? 10 : 5 }]}>{selectedItem.label}</AppText>
                    ) : (
                        <AppText style={[styles.text, { color: colors.placeholder, marginLeft: icon ? 10 : 5 }]}>
                            {placeholder}
                        </AppText>
                    )}
                    <MaterialCommunityIcons name="chevron-down" size={25} color={colors.medium} />
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisibility} animationType="slide">
                <Screen>
                    <Button title="Close" onPress={() => setModalVisibility(false)} />
                    <FlatList
                        data={items}
                        keyExtractor={(data) => data.value.toString()}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <PickerItemComponent
                                item={item}
                                label={item.label}
                                onPress={() => {
                                    onSelectItem(item);
                                    setModalVisibility(false);
                                }}
                            />
                        )}
                        columnWrapperStyle={{
                            justifyContent: "space-between",
                            marginVertical: 15,
                        }}
                        style={{ marginTop: 10 }}
                    />
                </Screen>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: colors.light,
        borderRadius: 25,
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    text: {
        color: colors.dark,
        fontSize: 18,
        fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
        flexGrow: 1,
    },
});
