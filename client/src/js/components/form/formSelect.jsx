import React, { useState } from "react";

import { icons } from "../../constant/";

function FormSelect({ label, options, fieldName, fieldValue, track, name }) {
    const [value, setValue] = useState(label);
    const [active, setActive] = useState(false);

    const handleOnSelect = (data) => {
        setValue(data[fieldName]);
        track(name, data[fieldValue]);
    };

    return (
        <div className="form__select">
            <div className="select__box" onClick={() => setActive(!active)}>
                <input value={value} disabled />
                <img src={process.env.PUBLIC_URL + icons.dropdownTriangles} alt="icon" />
            </div>
            {active && (
                <ul className="select__dropdown" onBlur={() => setActive(false)} tabIndex="0">
                    {options.map((option) => (
                        <li onClick={() => handleOnSelect(option)} key={option._id}>
                            <p>{option[fieldName]}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FormSelect;
