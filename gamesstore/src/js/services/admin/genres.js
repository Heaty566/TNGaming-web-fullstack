import { http, configHeader } from "../http";
import config from "../../config/http.json";

const endPoint = config.endPointURL.genresURL;

export async function getAllGenres(token) {
    return await http.get(`${endPoint}/all`, configHeader(token));
}

export async function addNewGenre(token, genre) {
    return await http.post(`${endPoint}/new`, genre, configHeader(token));
}

export async function updateGenre(token, genreId, genre) {
    return await http.put(`${endPoint}/${genreId}`, genre, configHeader(token));
}
