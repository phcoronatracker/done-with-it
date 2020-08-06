import api from "./client";

const uploadImage = (firebaseImage) => {
    return api.post("/upload/profile-image", { image: firebaseImage });
};

export default { uploadImage };
