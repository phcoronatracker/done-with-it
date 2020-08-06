import client from "../api/client";

const registerToken = (pushToken) => {
    return client.post("/expo-push-token", { token: pushToken });
};

export default { registerToken };
