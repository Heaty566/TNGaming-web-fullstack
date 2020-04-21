import React from "react";
import { Link } from "react-router-dom";

let tt = 0;

const NavBrand = ({ brandURL, linkURL }) => {
    tt++;
    console.log(tt);

    return (
        <div className="navbar__brand">
            <Link to={linkURL}>
                <img src={process.env.PUBLIC_URL + brandURL} alt="logo" />
            </Link>
        </div>
    );
};

export default NavBrand;
