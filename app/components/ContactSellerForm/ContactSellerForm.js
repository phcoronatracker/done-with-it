/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Alert, Keyboard, StyleSheet } from "react-native";

import AppButton from "../AppButton/AppButton";

export default function ContactSellerForm({ onPress }) {
    return <AppButton onPress={onPress} title="Contact Seller" />;
}
