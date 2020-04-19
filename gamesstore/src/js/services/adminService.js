import { http, configHeader } from "./http";
import config from "../config/http.json";

const endPoint = config.endPointURL.adminURL;

export default {
    cleanToken: async (token) => {
        return await http.post(`${endPoint}/cleantoken`, null, configHeader(token, "application/json"));
    },

    allUsers: async (token) => {
        return await http.get(`${endPoint}/allusers`, configHeader(token, "application/json"));
    },

    toggleUserDeveloper: async (token, userId) => {
        return await http.post(
            `${endPoint}/toggleDeveloper/${userId}`,
            null,
            configHeader(token, "application/json")
        );
    },

    toggleUserAdmin: async (token, userId) => {
        return await http.post(
            `${endPoint}/toggleAdmin/${userId}`,
            null,
            configHeader(token, "application/json")
        );
    },
};
