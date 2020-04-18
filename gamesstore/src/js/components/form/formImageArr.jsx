import React from "react";

const FormImage = ({ track, name }) => {
    return (
        <div className="form__image">
            <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                id={name}
                name={name}
                ref={track}
                multiple
            />
            <label htmlFor={name}></label>
        </div>
    );
};

export default FormImage;
