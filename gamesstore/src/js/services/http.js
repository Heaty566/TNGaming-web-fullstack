import axios from "axios";
import config from "../config/http.json";

axios.defaults.baseURL =
    process.env.NODE_ENV === "development" ? config.serverURL.development : config.serverURL.production;

export const configHeader = (token, contentType) => {
    return {
        headers: {
            "Content-Type": contentType,
            "x-auth-token": token,
        },
    };
};

export const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};
