import api from "./client";

const endpoint = "/auth";
const axiosConfig = { headers: { "Content-Type": "application/json" } };

const register = (userInfo) => {
    const info = {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
    };

    return api.post(`${endpoint}/register`, info, axiosConfig);
};

const login = (userInfo) => {
    const info = {
        email: userInfo.email,
        password: userInfo.password,
    };

    return api.post(endpoint, info, axiosConfig);
};

export default { register, login };
