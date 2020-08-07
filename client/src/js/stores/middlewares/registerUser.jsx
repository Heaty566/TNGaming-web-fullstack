import { registerUser } from "../users";
import { updateMessage } from "../notification";
import { loginUser, updateError, updateLoading } from "../auth";
import { userService } from "../../services/";

export const registerUserAPI = ({ dispatch }) => (next) => async (action) => {
    if (action.type !== registerUser.type) return next(action);

    dispatch({ type: updateLoading.type });
    userService
        .registerUser(action.payload)
        .then(() => {
            const login = {
                username: action.payload.username,
                password: action.payload.password,
            };

            return dispatch({ type: loginUser.type, payload: login });
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
