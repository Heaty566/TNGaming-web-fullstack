import { http, configHeader } from "../http";
import config from "../../config/http.json";

const endPoint = config.endPointURL.usersURL;

export async function loginUser(user) {
    return await http.post(`${endPoint}/login`, user);
}

export async function registerUser(user) {
    return await http.post(`${endPoint}/register`, user);
}

export async function getUser(token) {
    return await http.get(`${endPoint}/me`, configHeader(token));
}

export async function updateProfile(token, user) {
    return await http.post(`${endPoint}/changeProfile`, user, configHeader(token));
}

export async function logoutUser(token) {
    return await http.post(`${endPoint}/logout`, null, configHeader(token)).catch((ex) => ex.response);
}

export async function changeUserPassword(token, objPassword) {
    return await http.post(`${endPoint}/changePassword`, objPassword, configHeader(token));
}

export async function loginUserWithCookie(token) {
    return await http.get(`${endPoint}/loginWithCookie`, configHeader(token));
}

export async function addBalance(token, balance) {
    return await http.post(`${endPoint}/addBalance`, balance, configHeader(token));
}

export async function uploadAvatar() {}
