import { http, configHeader } from "../http";
import config from "../../config/http.json";

const endPoint = config.endPointURL.adminURL;

export async function cleanToken(token) {
    return await http.post(`${endPoint}/cleantoken`, null, configHeader(token));
}

export async function allUsers(token) {
    return await http.get(`${endPoint}/allusers`, configHeader(token));
}

export async function toggleUserDeveloper(token, userId) {
    return await http.post(`${endPoint}/toggleDeveloper/${userId}`, null, configHeader(token));
}

export async function toggleUserAdmin(token, userId) {
    return await http.post(`${endPoint}/toggleAdmin/${userId}`, null, configHeader(token));
}
