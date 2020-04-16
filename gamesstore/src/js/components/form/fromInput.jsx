import React from "react";

const FormInput = ({ name, placeholder, track, type = "text" }) => {
    return (
        <input
            className="form__input"
            name={name}
            type={type}
            autoComplete="off"
            spellCheck="false"
            autoCapitalize="off"
            placeholder={placeholder}
            ref={track}
        />
    );
};

export default FormInput;
