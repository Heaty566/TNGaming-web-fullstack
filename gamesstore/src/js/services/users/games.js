import { http, configHeader } from "../http";
import config from "../../../config/http.json";

const endPoint = config.endPointURL.userGamesURL;

export async function addGameToWishList(token, gameId) {
    return await http.post(`${endPoint}/addGameTo/wishlist/${gameId}`, null, configHeader(token));
}

export async function removeGameFromWishList(token, gameId) {
    return await http.post(`${endPoint}/removeGameFrom/wishlist/${gameId}`, null, configHeader(token));
}
export async function addGameToCart(token, gameId) {
    return await http.post(`${endPoint}/addGameTo/cart/${gameId}`, null, configHeader(token));
}
export async function removeGameFromCart(token, gameId) {
    return await http.post(`${endPoint}/removeGameFrom/cart/${gameId}`, null, configHeader(token));
}

export async function purchaseGames(token) {
    return await http.post(`${endPoint}/purchase`, null, configHeader(token));
}
