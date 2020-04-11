import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { updateError } from "../stores/auth";
import { registerUser } from "../stores/users";
import { store } from "../stores/configStore";
import { users as validate } from "../utils/validateForm/";
import config from "../../config/linkURL.json";

import FromInput from "../components/form/formInput";
import FormPassword from "../components/form/formPassword";
import FormTittle from "../components/form/formTittle";
import FormBtn from "../components/form/formBtn";
import FormLink from "../components/form/formLink";
import FormError from "../components/form/formError";

import { styles } from "../constant/";
const { flexCenter, gridFullMain, flexBetween } = styles;

const Container = styled.div`
    ${flexCenter}
    ${gridFullMain}
    position: relative;
    background-image: url("/pages/images/background-pc.jpg");
    background-size: cover;
`;

const ContainerRegister = styled.form`
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

function Register() {
    document.title = "Register | TNGaming";
    const history = useHistory();
    const auth = useSelector((state) => state.auth);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        if (auth.token) {
            return history.push(config.register.nextURL);
        }
    }, [auth, history]);

    async function handleOnSumbit(data) {
        const { error } = validate.validateUser(data);
        if (error) {
            store.dispatch({ type: updateError.type, payload: { msg: "" } });
            return store.dispatch({
                type: updateError.type,
                payload: { msg: error.details[0].message },
            });
        } else store.dispatch({ type: updateError.type, payload: { msg: "" } });
        store.dispatch({ type: registerUser.type, payload: data });
    }

    return (
        <Container>
            <ContainerRegister onSubmit={handleSubmit(handleOnSumbit)}>
                <FormColums>
                    <FormTittle tittle="Sign Up" />
                </FormColums>

                {auth.error && (
                    <FormColums>
                        <FormError value={auth.error} />
                    </FormColums>
                )}

                <FormColums>
                    <FromInput
                        track={register()}
                        name="name"
                        placeholder="Fullname"
                    />
                </FormColums>

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
                        placeholder="password"
                    />
                </FormColums>

                <FormColums>
                    <FormPassword
                        track={register()}
                        name="confirm"
                        placeholder="Confirm Password"
                    />
                </FormColums>

                <FormColums>
                    <FromInput
                        track={register()}
                        name="email"
                        placeholder="Email"
                    />
                </FormColums>

                <FormColums>
                    <FromInput
                        track={register()}
                        name="phone"
                        placeholder="Phone"
                    />
                </FormColums>

                <FormColums>
                    <FromInput
                        track={register()}
                        name="address"
                        placeholder="Address"
                    />
                </FormColums>

                <FormColums>
                    <FormLink
                        label="Sign In instead"
                        URL={config.register.signInInstead}
                    />
                    <FormBtn label="Next" isLoading={auth.loading} />
                </FormColums>
            </ContainerRegister>
        </Container>
    );
}

export default Register;
