import React, { useState, useEffect } from "react";

import { icons } from "../../constant/";

function FormSelectMultiple({ name, label, options, fieldName, fieldValue, onChange }) {
    const [value, setValue] = useState(label);
    const [selected, setSelected] = useState([]);
    const [active, setActive] = useState(false);

    useEffect(() => {
        setSelected(options.map(() => false));
    }, [options]);

    useEffect(() => {
        const newValueArr = options.filter((item, itemIndex) => selected[itemIndex]);

        const formatValueArr = newValueArr.map((item) => item[fieldValue]);
        onChange(name, formatValueArr);
    }, [selected, fieldValue, options, onChange, name]);

    const handleOnSelect = async (index) => {
        setValue(options[index][fieldName]);
        const newSelected = selected.map((item, itemIndex) => (index === itemIndex ? !item : item));
        setSelected(newSelected);
    };

    return (
        <div className="form__selectmultiple form__select">
            <div className="select__box" onClick={() => setActive(!active)}>
                <input value={value} disabled />
                <img src={process.env.PUBLIC_URL + icons.dropdownTriangles} alt="icon" />
            </div>
            {active && (
                <ul className="select__dropdown" onBlur={() => setActive(false)} tabIndex="0">
                    {options.map((option, index) => (
                        <li
                            onClick={() => handleOnSelect(index)}
                            key={option._id}
                            className={selected[index] ? "active" : ""}
                        >
                            <p>{option[fieldName]}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FormSelectMultiple;
