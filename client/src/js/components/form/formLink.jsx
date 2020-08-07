import React from "react";
import { Link } from "react-router-dom";

const FormLink = ({ label, linkURL }) => {
    return (
        <Link className="form__link" to={linkURL}>
            {label}
        </Link>
    );
};

export default FormLink;
