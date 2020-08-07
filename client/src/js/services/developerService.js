import { http, configHeader } from "./http";
import config from "../config/http.json";

const endPoint = config.endPointURL.developerURL;

export default {
    addNewGame: async (token, game) => {
        return await http.post(
            `${endPoint}/games/new`,
            game,
            configHeader(token, "application/x-www-form-urlencoded")
        );
    },
};
