import React from "react";

const FormInput = ({ name, placeholder, track, type = "text", ...rest }) => {
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
            {...rest}
        />
    );
};

export default FormInput;
