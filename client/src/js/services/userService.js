import { http, configHeader } from "./http";
import config from "../config/http.json";

const endPoint = config.endPointURL.usersURL;

export default {
    registerUser: async (user) => {
        return await http.post(`${endPoint}/register`, user);
    },

    getUser: async (token) => {
        return await http.get(`${endPoint}/me`, configHeader(token, "application/json"));
    },

    updatePassword: async (token, objPassword) => {
        return await http.post(
            `${endPoint}/changePassword`,
            objPassword,
            configHeader(token, "application/json")
        );
    },

    updateProfile: async (token, user) => {
        return await http.post(`${endPoint}/changeProfile`, user, configHeader(token, "application/json"));
    },

    addBalance: async (token, balance) => {
        return await http.post(`${endPoint}/addBalance`, balance, configHeader(token, "application/json"));
    },

    uploadAvatar: async () => {},
};
