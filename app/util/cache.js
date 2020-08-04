/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";

const prefix = "cache@";
const expiryUnit = 5;

const storeData = async (key, value) => {
    try {
        const item = {
            value,
            timestamp: Date.now(),
        };

        await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
    } catch (error) {
        throw error;
    }
};

const expired = (timestamp) => {
    const now = moment(Date.now());
    const storedTime = moment(timestamp);
    return now.diff(storedTime, "minutes") > expiryUnit;
};

const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(prefix + key);
        const item = JSON.parse(value);

        if (!item) return null;

        if (expired(item.timestamp)) {
            // cache reach its time limit
            await AsyncStorage.removeItem(prefix + key);
            return null;
        }

        return item;
    } catch (error) {
        throw error;
    }
};

export default { storeData, getData };
