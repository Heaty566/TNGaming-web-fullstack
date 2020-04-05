import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import searchBox from "./searchBox";
import { getSearchResult } from "./middlewares/searchBox";

const entities = combineReducers({
    searchBox,
});

const reducer = combineReducers({
    entities,
});

const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), getSearchResult],
});

export { store };
