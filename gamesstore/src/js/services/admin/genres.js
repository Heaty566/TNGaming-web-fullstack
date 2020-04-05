import { http, configHeader } from "../http";
import config from "../../../config/http.json";

const endPoint = config.endPointURL.genresURL;

export async function addNewGenre(token, genre) {
    const data = await http
        .post(`${endPoint}/new`, genre, configHeader(token))
        .then((res) => res.data)
        .catch((ex) => ex.response);
    return data;
}

export async function updateGenre(token, genreId, genre) {
    const data = await http
        .put(`${endPoint}/${genreId}`, genre, configHeader(token))
        .then((res) => res.data)
        .catch((ex) => ex.response);
    return data;
}
