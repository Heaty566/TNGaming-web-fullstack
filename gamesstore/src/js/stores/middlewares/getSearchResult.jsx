import { updateSearchResults, updateSearchValue, onChangeSearchBox } from "../searchBox";
import { updateMessage } from "../notification";
import { gamesService } from "../../services";

export const getSearchResult = ({ dispatch }) => (next) => (action) => {
    if (action.type !== onChangeSearchBox.type) return next(action);

    dispatch({ type: updateSearchValue.type });
    next(action);

    gamesService.games
        .getGameBySearchKey(action.payload, 1)
        .then(({ data }) => {
            dispatch({ type: updateSearchResults.type, payload: { results: data } });
        })
        .catch((err) => dispatch({ type: updateMessage.type, payload: { msg: err.message, errId: 503 } }));
};
