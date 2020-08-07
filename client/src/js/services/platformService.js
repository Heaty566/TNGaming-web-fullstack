import { http, configHeader } from "./http";
import config from "../config/http.json";

const endPoint = config.endPointURL.platformsURL;

export default {
    getAllPlatform: async (token) => {
        return await http.get(`${endPoint}/all`, configHeader(token, "application/json"));
    },

    addNewPlatform: async (token, platform) => {
        return await http.post(`${endPoint}/new`, platform, configHeader(token, "application/json"));
    },

    updatePlatform: async (token, platformId, platform) => {
        return await http.put(`${endPoint}/${platformId}`, platform, configHeader(token, "application/json"));
    },
};
