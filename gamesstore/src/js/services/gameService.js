import { http } from "./http";
import config from "../config/http.json";

const endPoint = config.endPointURL.gamesURL;

export default {
    getGames: async (page) => {
        return await http.get(`${endPoint}/all/${page}`);
    },

    getGame: async (gameId) => {
        return await http.get(`${endPoint}/${gameId}`);
    },

    getGameByGenre: async (genreId, page) => {
        return await http.get(`${endPoint}/sortByGenre/${genreId}/${page}`);
    },

    getGameBySearchKey: async (searchKey, page) => {
        return await http.get(`${endPoint}/sortByKey/${searchKey}/${page}`);
    },
};
