import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { store } from "../stores/configStore";
import { loginUser, updateError } from "../stores/auth";
import { users as validate } from "../utils/validateForm/";
import config from "../../config/linkURL.json";

import FromInput from "../components/form/formInput";
import FormTittle from "../components/form/formTittle";
import FormBtn from "../components/form/formBtn";
import FormLink from "../components/form/formLink";
import FormError from "../components/form/formError";
import FormPassword from "../components/form/formPassword";

import { styles } from "../constant/";
const { flexCenter, gridFullMain, flexBetween } = styles;

const Container = styled.div`
    ${flexCenter}
    ${gridFullMain}
    position: relative;
    background-image: url("/pages/images/background-pc.jpg");
    background-size: cover;
`;

const ContainerLogin = styled.form`
    ${flexBetween}
    position: absolute;
    flex-direction: column;
    z-index: 10;
    min-width: 350px;
`;

const FormColums = styled.div`
    margin: 10px 0;
    width: 100%;

    &:last-child {
        ${flexBetween}
    }
`;

function Login() {
    document.title = "Login | TNGaming";
    const history = useHistory();
    const auth = useSelector((state) => state.auth);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        if (auth.token) {
            return history.push(config.login.nextURL);
        }
    }, [auth, history]);

    async function handleOnSumbit(data) {
        const { error } = validate.validateLoginUser(data);
        if (error) {
            store.dispatch({ type: updateError.type, payload: { msg: "" } });
            return store.dispatch({
                type: updateError.type,
                payload: { msg: error.details[0].message },
            });
        } else store.dispatch({ type: updateError.type, payload: { msg: "" } });
        store.dispatch({ type: loginUser.type, payload: data });
    }

    return (
        <Container>
            <ContainerLogin onSubmit={handleSubmit(handleOnSumbit)}>
                <FormColums>
                    <FormTittle tittle="Sign In" />
                </FormColums>

                {auth.error && (
                    <FormColums>
                        <FormError value={auth.error} />
                    </FormColums>
                )}

                <FormColums>
                    <FromInput
                        track={register()}
                        name="username"
                        placeholder="Username"
                    />
                </FormColums>

                <FormColums>
                    <FormPassword
                        track={register()}
                        name="password"
                        placeholder="Password"
                    />
                </FormColums>

                <FormColums>
                    <FormLink
                        label="Sign Up instead"
                        URL={config.login.signUpInstead}
                    />

                    <FormBtn label="Next" isLoading={auth.loading} />
                </FormColums>
            </ContainerLogin>
        </Container>
    );
}

export default Login;
