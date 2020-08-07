import React from "react";

import Wave from "../utils/loading/wave";

const FormBtn = ({ label, isLoading, type = "submit", color = "#121212" }) => {
    return isLoading ? (
        <Wave height="24px" width="12px" color={color} />
    ) : (
        <button className="form__btn" type={type}>
            {label}
        </button>
    );
};

export default FormBtn;
