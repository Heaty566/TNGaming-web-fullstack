import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ label, linkURL, outline = false }) => {
    return (
        <Link className={`btn__link ${outline ? "outline" : ""}`} to={linkURL}>
            {label}
        </Link>
    );
};

export default NavLink;
