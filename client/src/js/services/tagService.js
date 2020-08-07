import { http, configHeader } from "./http";
import config from "../config/http.json";

const endPoint = config.endPointURL.tagsURL;

export default {
    getAllTags: async (token) => {
        return await http.get(`${endPoint}/all`, configHeader(token, "application/json"));
    },

    addNewTag: async (token, tag) => {
        return await http.post(`${endPoint}/new`, tag, configHeader(token, "application/json"));
    },

    updateTag: async (token, tagId, tag) => {
        return await http.put(`${endPoint}/${tagId}`, tag, configHeader(token, "application/json"));
    },
};
