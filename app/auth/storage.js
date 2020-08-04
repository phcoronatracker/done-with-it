import * as SecureStorage from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "2I6Th6BcBeNeOIKf3qtnj6HxY-nE_fANqc4PxacxzFg";

const storeToken = async (authToken) => {
    try {
        await SecureStorage.setItemAsync(key, authToken);
    } catch (error) {
        console.log("Error storing token: ", error);
    }
};

const getToken = async () => {
    try {
        return await SecureStorage.getItemAsync(key);
    } catch (error) {
        console.log("Error getting token: ", error);
    }
};

const getUser = async () => {
    const token = await getToken();
    return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
    try {
        await SecureStorage.deleteItemAsync(key);
    } catch (error) {
        console.log("Error deleting token: ", error);
    }
};

export default { getToken, storeToken, removeToken, getUser };
