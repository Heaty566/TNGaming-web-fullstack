import { createAction, createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
    name: "auth",
    initialState: {
        token: "",
        user: "",
        loading: false,
        error: "",
    },
    reducers: {
        updateUser: (auth, action) => {
            auth.loading = false;
            auth.user = action.payload.user;
            auth.token = action.payload.token;
        },
        updateLoading: (auth, action) => {
            auth.loading = true;
        },
        updateError: (auth, action) => {
            auth.loading = false;
            auth.error = action.payload.msg;
        },
    },
});

export const loginUser = createAction("loginUser");

export const { logoutUser, updateUser, updateLoading, updateError } = auth.actions;
export default auth.reducer;
