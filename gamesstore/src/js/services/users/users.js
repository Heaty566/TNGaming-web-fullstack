import { http, configHeader } from "../http";
import config from "../../../config/http.json";

const endPoint = config.endPointURL.usersURL;

export async function loginUser(user) {
    const data = await http
        .post(`${endPoint}/login`, user)
        .then((res) => res.data)
        .catch((ex) => ex.response);
    return data;
}

export async function registerUser(user) {
    const data = await http
        .post(`${endPoint}/register`, user)
        .then((res) => res.data)
        .catch((ex) => ex.response);
    return data;
}

export async function getUser(token) {
    const data = await http
        .get(`${endPoint}/me`, configHeader(token))
        .then((res) => res.data)
        .catch((ex) => ex.response);
    return data;
}

export async function updateProfile(token, user) {
    const data = await http
        .post(`${endPoint}/changeProfile`, user, configHeader(token))
        .then((res) => res.data)
        .catch((ex) => ex.response);
    return data;
}

export async function logoutUser(token) {
    const data = await http.post(`${endPoint}/logout`, null, configHeader(token)).catch((ex) => ex.response);
    return data;
}

export async function changeUserPassword(token, objPassword) {
    const data = await http
        .post(`${endPoint}/changePassword`, objPassword, configHeader(token))
        .then((res) => res.data)
        .catch((ex) => ex.response);
    return data;
}

export async function addBalance(token, balance) {
    const data = await http
        .post(`${endPoint}/addBalance`, balance, configHeader(token))
        .then((res) => res.data)
        .catch((ex) => ex.response);
    return data;
}

export async function uploadAvatar() {}
