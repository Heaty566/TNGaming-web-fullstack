import { http, configHeader } from "../http";
import config from "../../config/http.json";

const endPoint = config.endPointURL.adminURL;

export async function cleanToken(token) {
    const { data } = await http.post(`${endPoint}/cleantoken`, null, configHeader(token)).catch(ex => ex.response);
    return data;
}

export async function allUsers(token) {
    const { data } = await http.get(`${endPoint}/allusers`, configHeader(token)).catch(ex => ex.response);
    return data;
}

export async function toggleUserDeveloper(token, userId) {
    const { data } = await http.post(`${endPoint}/toggleDeveloper/${userId}`, null, configHeader(token)).catch(ex => ex.response);
    return data;
}

export async function toggleUserAdmin(token, userId) {
    const { data } = await http.post(`${endPoint}/toggleAdmin/${userId}`, null, configHeader(token)).catch(ex => ex.response);
    return data;
}
