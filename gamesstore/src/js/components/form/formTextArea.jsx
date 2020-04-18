import React from "react";

const FormTextArea = ({ name, limits, label, track }) => {
    const charactersLeft = limits;

    return (
        <div className="form__textarea">
            <textarea name={name} id={name} maxLength={limits} placeholder={label} ref={track}></textarea>
            <p>
                {charactersLeft}/{limits}
            </p>
        </div>
    );
};

export default FormTextArea;
