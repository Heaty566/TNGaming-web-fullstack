import React from "react";
import { icons } from "../../constant/";

const FormImage = ({ track, name, file = [], ...rest }) => {
    const filename = file.length === 1 ? file[0].name : file.length + " files";

    return (
        <div className="form__image">
            <input
                type="file"
                id={name}
                name={name}
                accept="image/png, image/jpeg, image/jpg"
                ref={track}
                {...rest}
            />
            <label htmlFor={name}>
                {filename}
                <img src={process.env.PUBLIC_URL + icons.addImage} alt="icon" />
            </label>
        </div>
    );
};

export default FormImage;
