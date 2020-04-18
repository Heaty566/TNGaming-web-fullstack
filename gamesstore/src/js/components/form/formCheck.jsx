import React from "react";

const FormCheck = ({ name, label, track, description = "" }) => {
    return (
        <div className="form__checkbox">
            <input type="checkbox" name={name} id={name} ref={track} />
            <label htmlFor={name}>{label}</label>
            {description && <p>{description}</p>}
        </div>
    );
};

export default FormCheck;
