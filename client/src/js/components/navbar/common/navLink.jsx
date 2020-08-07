import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ label, linkURL, outline = false, ...rest }) => {
  return (
    <Link
      className={`btn__link ${outline ? "outline" : ""}`}
      to={linkURL}
      {...rest}
    >
      {label}
    </Link>
  );
};

export default NavLink;
