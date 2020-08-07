import React from "react";

const FormAlert = ({ error, type = "error" }) => {
    let className = "form__alert ";
    className += type === "error" ? "form__alert-error" : "form__alert-success";

    return (
        <div className={className}>
            <p>{error}</p>
        </div>
    );
};

export default FormAlert;
