import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { routerURL } from "../../../config/http.json";

const ConColumn = ({ column }) => {
    const user = useSelector((state) => state.auth.user);
    const { label, linkURL, isAdmin, isDeveloper } = column;

    return isAdmin === user.isAdmin || isDeveloper === user.isDeveloper ? (
        <li className="dropdown__column" key={label}>
            <Link className="dropdown__link" to={routerURL.dashboard + linkURL}>
                {label}
            </Link>
        </li>
    ) : null;
};

export default ConColumn;
