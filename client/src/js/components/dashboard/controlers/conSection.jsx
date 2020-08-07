import React, { useState } from "react";
import { useSelector } from "react-redux";

import ConColumn from "./conColumn";
import { icons } from "../../../constant/";

function ConSection({ tag }) {
    const user = useSelector((state) => state.auth.user);
    const [active, setActive] = useState(false);
    const { isAdmin, isDeveloper, label } = tag.section;

    return isAdmin === user.isAdmin || isDeveloper === user.isDeveloper ? (
        <div className={active ? "controller__menu active" : "controller__menu"}>
            <div className="controller__section" onClick={() => setActive(!active)}>
                <h4>{label}</h4>
                <img src={process.env.PUBLIC_URL + icons.dropdownTriangles} alt="menu" />
            </div>
            <ul className="controller__dropdown">
                {tag.options.map((column, index) => (
                    <ConColumn column={column} key={index} />
                ))}
            </ul>
        </div>
    ) : null;
}

export default ConSection;
