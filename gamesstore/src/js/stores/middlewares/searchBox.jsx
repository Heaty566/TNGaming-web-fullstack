import { updateSearchResults, updateSearchValue, onChangeSearchBox } from "../searchBox";
import { gamesService } from "../../services/";

export const getSearchResult = ({ dispatch }) => (next) => async (action) => {
    if (action.type !== onChangeSearchBox.type) return next(action);

    dispatch({ type: updateSearchValue.type });
    next(action);

    try {
        const games = await gamesService.games.getGameBySearchKey(action.payload, 1);
        dispatch({ type: updateSearchResults.type, payload: { results: games } });
    } catch (ex) {
        console.log("rx");
    }
};
