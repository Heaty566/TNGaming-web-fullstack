import Cookies from "universal-cookie";

import config from "../../config/config.json";
import { updateMessage } from "../notification";
import { loginUser, updateUser, updateLoading, updateError } from "../auth";
import { usersService } from "../../services";

export const loginUserAPI = ({ dispatch }) => (next) => async (action) => {
    if (action.type !== loginUser.type) return next(action);

    dispatch({ type: updateLoading.type });
    usersService.users
        .loginUser(action.payload)
        .then(({ data }) => {
            const { user, token } = data.data;
            const cookies = new Cookies();
            cookies.set("x-auth-token", token, {
                maxAge: config.cookies.maxAge,
                path: "/",
            });
            dispatch({ type: updateUser.type, payload: { user, token } });
        })
        .catch((err) => {
            if (!err.response)
                return dispatch({
                    type: updateMessage.type,
                    payload: { msg: err.message, errId: 503 },
                });

            const { msg } = err.response.data;
            dispatch({ type: updateError.type, payload: { msg } });
        });
};
