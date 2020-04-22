import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

import { updateUser } from "../../js/stores/auth";
import { store } from "../../js/stores/configStore";
import { authService } from "../services/";

import NavBrand from "../components/navbar/navBrand";
import NavGroupBtn from "../components/navbar/navGrourpBtn";
import NavLoading from "../components/navbar/navLoading";

import { navbar } from "../config/linkURL.json";
import { icons } from "../constant/";

const Navbar = () => {
  const cookie = new Cookies();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (cookie.get("x-auth-token") && !auth.token)
      authService
        .loginUserWithCookie(cookie.get("x-auth-token"))
        .then(({ data }) => {
          const user = data.data;
          store.dispatch({
            type: updateUser.type,
            payload: { user, token: cookie.get("x-auth-token") },
          });
        })
        .catch(() => {
          const removeInterval = setInterval(() => {
            cookie.remove("x-auth-token");
            if (!cookie.get("x-auth-token")) clearInterval(removeInterval);
          }, 200);
        });
  }, [auth, cookie]);

  return (
    <div className="navbar">
      <NavBrand brandURL={icons.logo} linkURL={navbar.navBrandURL} />
      <NavGroupBtn />
      <NavLoading />
    </div>
  );
};

export default Navbar;
