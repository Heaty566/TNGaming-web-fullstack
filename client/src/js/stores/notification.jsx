import { createSlice } from "@reduxjs/toolkit";

const convertError = (errId, msg) => {
  switch (true) {
    case errId > 500 && errId < 600:
      return "Service is unavailable this time, please try agian later.";

    case errId === 999:
      return "We are still building this feature.";
    default:
      return msg;
  }
};

const notification = createSlice({
  name: "notification",
  initialState: {
    errId: null,
    msg: "",
  },
  reducers: {
    updateMessage: (notification, action) => {
      notification.msg = convertError(action.payload.errId, action.payload.msg);
      notification.errorId = action.payload.errId;
    },
  },
});

export const { updateMessage } = notification.actions;
export default notification.reducer;
