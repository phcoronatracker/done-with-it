import { create } from "apisauce";
import cache from "../util/cache";
import authStorage from "../auth/storage";

const apiClient = create({
    baseURL: "https://done-with-it.herokuapp.com/",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

apiClient.addAsyncRequestTransform(async (request) => {
    const authToken = await authStorage.getToken();
    if (!authToken) return;

    request.headers["x-auth-token"] = authToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
    const response = await get(url, params, axiosConfig);

    if (response.ok) {
        cache.storeData(url, response.data);
        return response;
    }
    const data = await cache.getData(url);
    console.log(data);

    return data ? { ok: true, data } : response;
};

export default apiClient;
