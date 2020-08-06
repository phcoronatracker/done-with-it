/* eslint-disable no-undef */
import { useContext, useState } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import userAPI from "../api/auth";
import uploadAPI from "../api/account";

export default useAuth = () => {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (values, { resetForm }) => {
        setLoading(true);
        const response = await userAPI.login(values);
        setLoading(false);
        resetForm();

        if (!response.ok) {
            setErrorMessage(response.data.error);
            return setError(true);
        }

        setError(false);
        setUser(jwtDecode(response.data));
        authStorage.storeToken(response.data);
    };

    const handleLogout = () => {
        setUser(null);
        authStorage.removeToken();
    };

    const handleUploadImage = async (firebaseImage) => {
        setLoading(true);
        const response = await uploadAPI.uploadImage(firebaseImage);
        setLoading(false);

        if (!response.ok) {
            setErrorMessage(response.data.error);
            return setError(true);
        }

        setError(false);
        setUser(jwtDecode(response.data));
        authStorage.storeToken(response.data);
    };

    return { user, handleLogout, handleLogin, handleUploadImage, loading, error, errorMessage };
};
