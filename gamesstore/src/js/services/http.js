import axios from "axios";
import config from "../config/http.json";
import { store } from "../stores/configStore";
import { updateLoading } from "../stores/loading";

axios.defaults.baseURL =
    process.env.NODE_ENV === "development" ? config.serverURL.development : config.serverURL.production;

export const configHeader = (token, contentType) => {
    return {
        headers: {
            "Content-Type": contentType,
            "x-auth-token": token,
        },
        onUploadProgress: function (progressEvent) {
            const { loaded, total } = progressEvent;
            const percentage = Math.round((loaded * 100) / total);

            if (percentage < 95)
                store.dispatch({
                    type: updateLoading.type,
                    payload: { value: percentage },
                });
        },

        onDownloadProgress: function (progressEvent) {
            const { loaded, total } = progressEvent;
            const percentage = Math.round((loaded * 100) / total);

            store.dispatch({
                type: updateLoading.type,
                payload: { value: percentage },
            });
        },
    };
};

export const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};
