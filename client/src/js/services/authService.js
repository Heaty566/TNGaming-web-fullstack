import { http, configHeader } from "./http";
import config from "../config/http.json";

const endPoint = config.endPointURL.usersURL;

export default {
    loginUser: async (user) => {
        return await http.post(`${endPoint}/login`, user, configHeader("", "application/json"));
    },

    loginUserWithCookie: async (token) => {
        return await http.get(`${endPoint}/loginWithCookie`, configHeader(token, "application/json"));
    },
    logoutUser: async (token) => {
        return await http
            .post(`${endPoint}/logout`, null, configHeader(token, "application/json"))
            .catch((ex) => ex.response);
    },
};
