import React from "react";
import { useSelector } from "react-redux";

import NavSearchbox from "./common/navSearchbox";
import NavLink from "./common/navLink";
import NavUser from "./common/navUser";

import { navbar } from "../../config/linkURL.json";

const NavGroupBtn = () => {
    const auth = useSelector((state) => state.auth);

    return (
        <div className="navbar__groupbtn">
            <NavSearchbox />
            <NavLink label="Store" linkURL={navbar.storeURL} />
            <NavLink label="About Us" linkURL={navbar.aboutUsURL} />
            {auth.token ? (
                <NavUser />
            ) : (
                <React.Fragment>
                    <NavLink label="Login" linkURL={navbar.loginURL} />
                    <NavLink label="Register" linkURL={navbar.registerURL} outline={true} />)
                </React.Fragment>
            )}
        </div>
    );
};

export default NavGroupBtn;
