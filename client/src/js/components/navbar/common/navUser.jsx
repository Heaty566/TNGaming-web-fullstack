import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";

import { authService } from "../../../services/";
import { navbar } from "../../../config/linkURL.json";
import { icons } from "../../../constant/";
import { updateUser } from "../../../stores/auth";
import { store } from "../../../stores/configStore";

function NavUser() {
  const cookies = new Cookies();
  const [active, setActive] = useState(null);
  const auth = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await authService.logoutUser(cookies.get("x-auth-token"));
    cookies.remove("x-auth-token");
    store.dispatch({
      type: updateUser.type,
      payload: { user: "", token: "" },
    });
    window.location.reload();
  };

  const drawerClass = active
    ? "drawer__active"
    : active !== null
    ? "drawer__inactive"
    : "drawer__initial";
  return (
    <React.Fragment>
      <div className="navbar__user" onClick={() => setActive(true)}>
        {auth.user.avatar && (
          <img
            className="avatar"
            src={process.env.PUBLIC_URL + auth.user.avatar}
            alt="avatar"
          />
        )}
        <h4 className="name">{auth.user.name}</h4>
        <img
          className="menu-btn"
          src={process.env.PUBLIC_URL + icons.navMenu}
          alt="menu"
        />
      </div>
      {active && (
        <div
          className="drawer__background"
          onClick={() => setActive(false)}
        ></div>
      )}
      <div className={`navbar__drawer ${drawerClass}`}>
        <div className="drawer__column">
          <h2 className="drawer__title">Menu</h2>
          <img
            onClick={() => setActive(false)}
            className="menu-btn"
            src={process.env.PUBLIC_URL + icons.navMenu}
            alt="menu"
          />
        </div>
        <span className="drawer__divider"></span>

        <div className="drawer__column">
          <Link
            className="drawer__link"
            to={navbar.userBtn.profileURL}
            onClick={() => setActive(false)}
          >
            Profile
          </Link>
        </div>

        <div className="drawer__column">
          <Link
            className="drawer__link"
            to={navbar.userBtn.libraryURL}
            onClick={() => setActive(false)}
          >
            Library
          </Link>
        </div>

        <div className="drawer__column">
          <Link
            className="drawer__link"
            to={navbar.userBtn.communityURL}
            onClick={() => setActive(false)}
          >
            Community
          </Link>
        </div>
        <div className="drawer__column">
          <button className="drawer__btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        {auth.user.isAdmin || auth.user.isDeveloper ? (
          <span className="drawer__divider"></span>
        ) : null}

        {auth.user.isAdmin || auth.user.isDeveloper ? (
          <div className="drawer__column">
            <Link
              className="drawer__link"
              to={navbar.userBtn.dashboardURL}
              onClick={() => setActive(false)}
            >
              Dashboard
            </Link>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default NavUser;
