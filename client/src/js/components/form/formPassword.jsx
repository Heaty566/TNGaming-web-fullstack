import React, { useState } from "react";

import { icons } from "../../constant/";

function FormPassword({ name, placeholder, track, type = "password" }) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="form__password">
            <input
                name={name}
                autoComplete="off"
                spellCheck="false"
                type={visible ? "text" : type}
                autoCapitalize="off"
                placeholder={placeholder}
                ref={track}
            />
            <img
                src={visible ? icons.visibilityOn : icons.visibilityOff}
                onClick={() => setVisible(!visible)}
                alt="seen"
            />
        </div>
    );
}

export default FormPassword;
