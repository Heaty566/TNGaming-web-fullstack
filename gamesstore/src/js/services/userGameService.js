import { http, configHeader } from "./http";
import config from "../config/http.json";

const endPoint = config.endPointURL.userGamesURL;

export default {
    addGameToWishList: async (token, gameId) => {
        return await http.post(
            `${endPoint}/addGameTo/wishlist/${gameId}`,
            null,
            configHeader(token, "application/json")
        );
    },

    removeGameFromWishList: async (token, gameId) => {
        return await http.post(
            `${endPoint}/removeGameFrom/wishlist/${gameId}`,
            null,
            configHeader(token, "application/json")
        );
    },

    addGameToCart: async (token, gameId) => {
        return await http.post(
            `${endPoint}/addGameTo/cart/${gameId}`,
            null,
            configHeader(token, "application/json")
        );
    },

    removeGameFromCart: async (token, gameId) => {
        return await http.post(
            `${endPoint}/removeGameFrom/cart/${gameId}`,
            null,
            configHeader(token, "application/json")
        );
    },

    purchaseGames: async (token) => {
        return await http.post(`${endPoint}/purchase`, null, configHeader(token, "application/json"));
    },
};
