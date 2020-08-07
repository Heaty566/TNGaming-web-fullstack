import { createSlice, createAction } from "@reduxjs/toolkit";
import _ from "lodash";

const searchBox = createSlice({
    name: "searchBox",
    initialState: {
        results: [],
        loading: false,
    },
    reducers: {
        updateSearchValue: (searchBox, action) => {
            searchBox.results = [];
            searchBox.loading = true;
        },
        updateSearchResults: (searchBox, action) => {
            searchBox.results = _(action.payload.results.data).take(5).value();
            searchBox.loading = false;
        },
    },
});

export const onChangeSearchBox = createAction("onChangeSearchBox");

export const { updateSearchValue, updateSearchResults } = searchBox.actions;
export default searchBox.reducer;
