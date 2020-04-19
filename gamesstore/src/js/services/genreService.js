import { http, configHeader } from "./http";
import config from "../config/http.json";

const endPoint = config.endPointURL.genresURL;

export default {
    getAllGenres: async (token) => {
        return await http.get(`${endPoint}/all`, configHeader(token, "application/json"));
    },

    addNewGenre: async (token, genre) => {
        return await http.post(`${endPoint}/new`, genre, configHeader(token, "application/json"));
    },

    updateGenre: async (token, genreId, genre) => {
        return await http.put(`${endPoint}/${genreId}`, genre, configHeader(token, "application/json"));
    },
};
