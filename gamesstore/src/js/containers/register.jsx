import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { updateError } from "../stores/auth";
import { registerUser } from "../stores/users";
import { store } from "../stores/configStore";
import { users as validate } from "../utils/validateForm/";
import { usePrevious } from "../utils/hooks/userPrevious";
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

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [form, setForm] = useState({});
  const preForm = usePrevious(form);

  useEffect(() => {
    if (auth.token) {
      return history.push(config.register.nextURL);
    }

    setForm({ name, username, password, confirm, email, phone, address });
  }, [name, username, password, confirm, email, phone, address, auth, history]);

  async function handleOnSumbit(event) {
    event.preventDefault();
    const { error } = validate.validateUser(form);
    if (error) {
      return store.dispatch({
        type: updateError.type,
        payload: { msg: error.details[0].message },
      });
    } else store.dispatch({ type: updateError.type, payload: { msg: "" } });

    store.dispatch({ type: registerUser.type, payload: form });
  }
  return (
    <Container>
      <ContainerRegister onSubmit={handleOnSumbit}>
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
            value={name}
            name="name"
            placeholder="Fullname"
            onChange={setName}
          />
        </FormColums>

        <FormColums>
          <FromInput
            value={username}
            name="username"
            placeholder="Username"
            onChange={setUsername}
          />
        </FormColums>

        <FormColums>
          <FormPassword
            value={password}
            name="password"
            placeholder="password"
            onChange={setPassword}
          />
        </FormColums>

        <FormColums>
          <FormPassword
            value={confirm}
            name="confirm"
            placeholder="Confirm Password"
            onChange={setConfirm}
          />
        </FormColums>

        <FormColums>
          <FromInput
            value={email}
            name="email"
            placeholder="Email"
            onChange={setEmail}
          />
        </FormColums>

        <FormColums>
          <FromInput
            value={phone}
            name="phone"
            placeholder="Phone"
            onChange={setPhone}
          />
        </FormColums>

        <FormColums>
          <FromInput
            value={address}
            name="address"
            placeholder="Address"
            onChange={setAddress}
          />
        </FormColums>

        <FormColums>
          <FormLink
            label="Sign In instead"
            URL={config.register.signInInstead}
          />
          <FormBtn
            label="Next"
            isLoading={auth.loading}
            isDisable={
              JSON.stringify(form) === JSON.stringify(preForm) && auth.error
                ? true
                : false
            }
          />
        </FormColums>
      </ContainerRegister>
    </Container>
  );
}

export default Register;
