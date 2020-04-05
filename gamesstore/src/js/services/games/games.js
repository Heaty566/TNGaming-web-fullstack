import { http } from "../http";
import config from "../../../config/http.json";

const endPoint = config.endPointURL.gamesURL;

export async function getGames(page) {
    const data = await http
        .get(`${endPoint}/all/${page}`)
        .then((res) => res.data)
        .catch((ex) => ex.response);
    return data;
}

export async function getGame(gameId) {
    const data = await http
        .get(`${endPoint}/${gameId}`)
        .then((res) => res.data)
        .catch((ex) => ex.response);
    return data;
}

export async function getGameByGenre(genreId, page) {
    const data = await http
        .get(`${endPoint}/sortByGenre/${genreId}/${page}`)
        .then((res) => res.data)
        .catch((ex) => ex.response);
    return data;
}

export async function getGameBySearchKey(searchKey, page) {
    const data = await http
        .get(`${endPoint}/sortByKey/${searchKey}/${page}`)
        .then((res) => res.data)
        .catch((ex) => ex.response);
    return data;
}
