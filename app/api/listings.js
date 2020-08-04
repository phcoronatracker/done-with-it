import api from "./client";

const endpoint = "/listings";

const getListings = () => api.get(endpoint);

const postListing = (listing, trackProgress) => {
    const data = {
        title: listing.title,
        images: listing.images,
        price: parseInt(listing.price),
        categoryId: listing.category.value,
        userId: 3,
        description: listing.description,
    };

    if (listing.location) data.location = listing.location;

    return api.post(endpoint, data, {
        headers: {
            "Content-Type": "application/json",
        },
        onUploadProgress: (progress) => trackProgress(progress.loaded / progress.total),
    });
};

export default { getListings, postListing };
