import api from "./client";

const endpoint = "/messages";

const getMessages = () => api.get(endpoint);

const sendMessage = (receiverId, listingId, message, trackProgress) => {
    return api.post(
        endpoint,
        { to: receiverId, listing: listingId, content: message },
        {
            headers: {
                "Content-Type": "application/json",
            },
            onUploadProgress: (progress) => trackProgress(progress.loaded / progress.total),
        }
    );
};

export default { getMessages, sendMessage };
