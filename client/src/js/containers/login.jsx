import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { colors } from "../constant/";
import { store } from "../stores/configStore";
import { loginUser, updateError } from "../stores/auth";
import { usersValidator } from "../utils/validateForm/";
import { login } from "../config/linkURL.json";
import { updateLoading } from "../stores/loading";

import FormInput from "../components/form/fromInput";
import FormPassword from "../components/form/formPassword";
import FormBtn from "../components/form/formBtn";
import FormLink from "../components/form/formLink";
import FormAlert from "../components/form/formAlert";

const Login = () => {
    document.title = "Login | TNGaming";
    const history = useHistory();
    const auth = useSelector((state) => state.auth);

    const { register, handleSubmit } = useForm();

    async function handOnSubmit(data) {
        store.dispatch({ type: updateError.type, payload: { msg: "" } });
        const { error } = usersValidator.validateLoginUser(data);

        if (error) {
            return store.dispatch({
                type: updateError.type,
                payload: { msg: error.details[0].message },
            });
        }
        store.dispatch({ type: loginUser.type, payload: data });
        store.dispatch({
            type: updateLoading.type,
            payload: { value: 100 },
        });
    }

    useEffect(() => {
        if (auth.token) {
            return history.push(login.nextURL);
        }
    }, [auth, history]);

    return (
        <div className="form form__container form__background-img-desktop">
            <form className="login" onSubmit={handleSubmit(handOnSubmit)}>
                <h3 className="form__title">Login</h3>
                {auth.error && <FormAlert error={auth.error} />}
                <FormInput placeholder="Username" name="username" track={register} />
                <FormPassword placeholder="Password" name="password" track={register} />
                <div className="form__column">
                    <FormLink label="Register instead" linkURL={login.registerInstead} />
                    <FormBtn label="Next" isLoading={auth.loading} color={colors.primaryColorMain} />
                </div>
            </form>
        </div>
    );
};

export default Login;
