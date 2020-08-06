import api from "./client";

const endpoint = "/messages";
const axiosConfig = { headers: { "Content-Type": "application/json" } };

const sendMessage = (receiverId, listingId, message) => {
    return api.post(endpoint, { to: receiverId, listing: listingId, content: message }, axiosConfig);
};

export default { sendMessage };
