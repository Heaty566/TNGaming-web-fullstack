import { http, configHeader } from "../http";
import config from "../../config/http.json";

const endPoint = config.endPointURL.userGamesURL;

export async function addGameToWishList(token, gameId) {
    const { data } = await http.post(`${endPoint}/addGameTo/wishlist/${gameId}`, null, configHeader(token)).catch(ex => ex.response);
    return data;
}

export async function removeGameFromWishList(token, gameId) {
    const { data } = await http.post(`${endPoint}/removeGameFrom/wishlist/${gameId}`, null, configHeader(token)).catch(ex => ex.response);
    return data;
}
export async function addGameToCart(token, gameId) {
    const { data } = await http.post(`${endPoint}/addGameTo/cart/${gameId}`, null, configHeader(token)).catch(ex => ex.response);
    return data;
}
export async function removeGameFromCart(token, gameId) {
    const { data } = await http.post(`${endPoint}/removeGameFrom/cart/${gameId}`, null, configHeader(token)).catch(ex => ex.response);
    return data;
}

export async function purchaseGames(token) {
    const { data } = await http.post(`${endPoint}/purchase`, null, configHeader(token)).catch(ex => ex.response);
    return data;
}
