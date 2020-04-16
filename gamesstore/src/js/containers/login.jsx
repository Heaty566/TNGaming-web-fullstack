import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { store } from "../stores/configStore";
import { loginUser, updateError } from "../stores/auth";
import { users as validate } from "../utils/validateForm/";
import { login } from "../config/linkURL.json";

import FormInput from "../components/form/fromInput";
import FormPassword from "../components/form/formPassword";
import FormBtn from "../components/form/formBtn";
import FormLink from "../components/form/formLink";
import FormError from "../components/form/formError";

const Login = () => {
    document.title = "Login | TNGaming";
    const history = useHistory();
    const auth = useSelector((state) => state.auth);

    const { register, handleSubmit } = useForm();

    async function handOnSubmit(data) {
        store.dispatch({ type: updateError.type, payload: { msg: "" } });
        const { error } = validate.validateLoginUser(data);

        if (error) {
            return store.dispatch({
                type: updateError.type,
                payload: { msg: error.details[0].message },
            });
        }
        store.dispatch({ type: loginUser.type, payload: data });
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
                {auth.error && <FormError error={auth.error} />}
                <FormInput placeholder="Username" name="username" track={register} />
                <FormPassword placeholder="Password" name="password" track={register} />
                <div className="form__column">
                    <FormLink label="Register instead" linkURL={login.registerInstead} />
                    <FormBtn label="Next" isLoading={auth.loading} />
                </div>
            </form>
        </div>
    );
};

export default Login;
