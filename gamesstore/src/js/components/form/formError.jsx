import React from "react";

const FormError = ({ error }) => {
    return (
        <div className="form__error">
            <p>{error}</p>
        </div>
    );
};

export default FormError;
