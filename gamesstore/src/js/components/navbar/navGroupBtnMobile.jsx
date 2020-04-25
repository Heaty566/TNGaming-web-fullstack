import React, { useState } from "react";
import { useSelector } from "react-redux";

import { navbar } from "../../config/linkURL.json";
import { authService } from "../../services/";
import { store } from "../../stores/configStore";
import { updateUser } from "../../stores/auth";
import Cookies from "universal-cookie";
import NavLink from "../navbar/common/navLink";

function NavGroupBtnMobile() {
  const cookies = new Cookies();
  const auth = useSelector((state) => state.auth);
  const [btnActive, setBtnActive] = useState(false);
  const handleLogout = async () => {
    await authService.logoutUser(cookies.get("x-auth-token"));
    cookies.remove("x-auth-token");
    store.dispatch({ type: updateUser.type, payload: { user: "", token: "" } });
    window.location.reload();
  };
  return (
    <div className="navbar__groupbtn-mobile">
      <div
        className={
          btnActive
            ? "navbar__btn-mobile navbar__btn-mobile-active"
            : "navbar__btn-mobile"
        }
        onClick={() => setBtnActive(!btnActive)}
      >
        <span></span> <span></span> <span></span>
      </div>
      <div
        className={
          btnActive
            ? "navbar__dropdown-mobile navbar__dropdown-mobile-active"
            : "navbar__dropdown-mobile "
        }
      >
        {auth.token && (
          <div className="navbar__user">
            {auth.user.avatar && (
              <img
                className="avatar"
                src={process.env.PUBLIC_URL + auth.user.avatar}
                alt="avatar"
              />
            )}
            <h4 className="name">{auth.user.name}</h4>
          </div>
        )}
        <NavLink label="store" linkURL={navbar.storeURL} />
        <NavLink label="About Us" linkURL={navbar.aboutUsURL} />
        {!auth.token && (
          <React.Fragment>
            <NavLink label="Login" linkURL={navbar.loginURL} />
            <NavLink label="Register" linkURL={navbar.registerURL} />
          </React.Fragment>
        )}
        {auth.token && (
          <React.Fragment>
            <span className="navbar__divider"></span>
            <NavLink label="Profile" linkURL={navbar.userBtn.profileURL} />
            <NavLink label="Library" linkURL={navbar.userBtn.libraryURL} />
            <NavLink label="Community" linkURL={navbar.userBtn.communityURL} />
            <button className="btn-mobile" onClick={handleLogout}>
              Logout
            </button>
          </React.Fragment>
        )}
        {auth.user.isAdmin || auth.user.isDeveloper ? (
          <React.Fragment>
            <span className="navbar__divider"></span>
            <NavLink label="Dashboard" linkURL={navbar.userBtn.dashboardURL} />
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
}

export default NavGroupBtnMobile;
