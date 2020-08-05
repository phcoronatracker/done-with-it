/* eslint-disable no-undef */
import { useState } from "react";

export default useAPI = (reqFunction) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const request = async (...args) => {
        setLoading(true);
        const response = await reqFunction(...args);
        setLoading(false);

        if (!response.ok) {
            setMessage(response.data.error);
            return setError(true);
        }

        setError(false);
        setData(response.data);
    };

    return { data, error, loading, request, message };
};
