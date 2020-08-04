/* eslint-disable no-undef */
import { useState } from "react";

export default useAPI = (reqFunction) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const request = async () => {
        setLoading(true);
        const response = await reqFunction();
        setLoading(false);

        if (!response.ok) return setError(true);

        setError(false);
        setData(response.data);
    };

    return { data, error, loading, request };
};
