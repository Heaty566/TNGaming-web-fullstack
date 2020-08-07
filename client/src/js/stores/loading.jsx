import { createSlice } from "@reduxjs/toolkit";

const loading = createSlice({
    name: "loading",
    initialState: {
        percentage: 0,
    },
    reducers: {
        updateLoading: (state, action) => {
            state.percentage = action.payload.value;
        },
    },
});

export const { updateLoading } = loading.actions;
export default loading.reducer;
