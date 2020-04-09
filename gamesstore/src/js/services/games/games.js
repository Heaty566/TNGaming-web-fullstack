import { http } from "../http";
import config from "../../../config/http.json";

const endPoint = config.endPointURL.gamesURL;

export async function getGames(page) {
    return await http.get(`${endPoint}/all/${page}`);
}

export async function getGame(gameId) {
    return await http.get(`${endPoint}/${gameId}`);
}

export async function getGameByGenre(genreId, page) {
    return await http.get(`${endPoint}/sortByGenre/${genreId}/${page}`);
}

export async function getGameBySearchKey(searchKey, page) {
    return await http.get(`${endPoint}/sortByKey/${searchKey}/${page}`);
}
