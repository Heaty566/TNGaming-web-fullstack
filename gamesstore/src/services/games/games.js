import { http } from "../http";
import config from "../../config/http.json";

const endPoint = config.endPointURL.gamesURL;

export async function getGames(page) {
    const { data } = await http.get(`${endPoint}/all/${page}`).catch(ex => ex.response);
    return data;
}

export async function getGame(gameId) {
    const { data } = await http.get(`${endPoint}/${gameId}`).catch(ex => ex.response);
    return data;
}

export async function getGameByGenre(genreId, page) {
    const { data } = await http.get(`${endPoint}/sortByGenre/${genreId}/${page}`).catch(ex => ex.response);
    return data;
}

export async function getGameBySort(searchKey, page) {
    const { data } = await http.get(`${endPoint}/sortByKey/${searchKey}/${page}`).catch(ex => ex.response);
    return data;
}
