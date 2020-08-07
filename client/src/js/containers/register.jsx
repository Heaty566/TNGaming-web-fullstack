import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { colors } from "../constant/";
import { store } from "../stores/configStore";
import { updateError } from "../stores/auth";
import { registerUser } from "../stores/users";
import { usersValidator } from "../utils/validateForm/";
import { register as registerLink } from "../config/linkURL.json";
import { updateLoading } from "../stores/loading";

import FormInput from "../components/form/fromInput";
import FormPassword from "../components/form/formPassword";
import FormBtn from "../components/form/formBtn";
import FormLink from "../components/form/formLink";
import FormAlert from "../components/form/formAlert";

const Register = () => {
    document.title = "Register | TNGaming";
    const history = useHistory();
    const auth = useSelector((state) => state.auth);

    const { register, handleSubmit } = useForm();

    async function handOnSubmit(data) {
        const { error } = usersValidator.validateUser(data);
        if (error) {
            store.dispatch({ type: updateError.type, payload: { msg: "" } });
            return store.dispatch({
                type: updateError.type,
                payload: { msg: error.details[0].message },
            });
        } else store.dispatch({ type: updateError.type, payload: { msg: "" } });
        store.dispatch({ type: registerUser.type, payload: data });

        store.dispatch({
            type: updateLoading.type,
            payload: { value: 100 },
        });
    }

    useEffect(() => {
        if (auth.token) {
            return history.push(registerLink.nextURL);
        }
    }, [auth, history]);

    return (
        <div className="form form__container form__background-img-desktop">
            <form className="register" onSubmit={handleSubmit(handOnSubmit)}>
                <h3 className="form__title">Register</h3>
                {auth.error && <FormAlert error={auth.error} />}
                <FormInput placeholder="Name" name="name" track={register} />
                <FormInput placeholder="Username" name="username" track={register} />
                <FormPassword placeholder="Password" name="password" track={register} />
                <FormPassword placeholder="Confrim password" name="confirm" track={register} />
                <FormInput placeholder="Email" name="email" track={register} />
                <FormInput placeholder="Address" name="address" track={register} />
                <FormInput placeholder="Phone" name="phone" track={register} />
                <div className="form__column">
                    <FormLink label="Register instead" linkURL={registerLink.loginInstead} />
                    <FormBtn label="Next" isLoading={auth.loading} color={colors.primaryColorMain} />
                </div>
            </form>
        </div>
    );
};

export default Register;
