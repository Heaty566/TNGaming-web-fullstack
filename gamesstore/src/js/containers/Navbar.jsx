import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import { updateUser } from "../../js/stores/auth";
import { store } from "../../js/stores/configStore";
import { usersService } from "../services/";
import config from "../../config/linkURL.json";

import NavBrand from "../components/navbar/navBrand";
import NavSearch from "../components/navbar/navSearch";
import NavGroupBtn from "../components/navbar/navGroupBtn";

import { icons, styles } from "../constant/";
const { flexBetween } = styles;

const Container = styled.div`
  height: inherit;
  padding: 0 18vw;

  ${flexBetween}
`;

function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (cookies["x-auth-token"] && !auth.token)
      usersService.users
        .loginUserWithCookie(cookies["x-auth-token"])
        .then(({ data }) => {
          const user = data.data;
          store.dispatch({
            type: updateUser.type,
            payload: { user, token: cookies["x-auth-token"] },
          });
        })
        .catch(() => removeCookie("x-auth-token"));
  }, [cookies, removeCookie, auth.token]);

  return (
    <Container>
      <NavBrand iconURL={icons.logo} URL={config.navbar.navBrand} />
      <NavSearch />
      <NavGroupBtn />
    </Container>
  );
}

export default Navbar;
