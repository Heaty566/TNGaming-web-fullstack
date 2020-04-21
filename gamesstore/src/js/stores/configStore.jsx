import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import searchBox from "./searchBox";
import { getSearchResult } from "./middlewares/getSearchResult";
import notification from "./notification";
import auth from "./auth";
import { loginUserAPI } from "./middlewares/loginUserAPI";
import { registerUserAPI } from "./middlewares/registerUser";
import loading from "./loading";

const entities = combineReducers({
    searchBox,
    notification,
    loading,
});

const reducer = combineReducers({
    entities,
    auth,
});

const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), getSearchResult, registerUserAPI, loginUserAPI],
});

export { store };
